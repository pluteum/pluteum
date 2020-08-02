import bcrypt from "bcrypt";
import { DatabasePoolType, sql } from "slonik";
import {
  generateToken,
  generateRefreshToken,
  generateResetToken,
} from "../token";
import { AuthenticationError } from "apollo-server-express";
import { verify, TokenExpiredError } from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { Channel } from "amqplib";

import { User as UserType } from "./type";
import { Library as LibraryType } from "../library/type";

const ERRORS = {
  INVALID_LOGIN: "Invalid username or password",
  NO_LIBRARY: "Unable to find default library for user",
  DUPLICATE_USER: "A user with this email address already exists",
};

const JWT_KEY: string = process.env.JWT_KEY || "";

export default class User {
  private pool: DatabasePoolType;
  private channel: Channel;

  constructor(pool: DatabasePoolType, channel: Channel) {
    this.pool = pool;
    this.channel = channel;
  }

  public getUserById(userId: number): Promise<null | UserType> {
    const query = sql`
    SELECT *
    FROM "users"
    WHERE "id" = ${userId}`;

    return this.pool.maybeOne(query) as Promise<null | UserType>;
  }

  public getUserByEmail(email: string): Promise<null | UserType> {
    const query = sql`
    SELECT *
    FROM "users"
    WHERE "email" = ${email}`;

    return this.pool.maybeOne(query) as Promise<null | UserType>;
  }

  public getUsersLibraries(userId: number): Promise<LibraryType[]> {
    const query = sql`
    SELECT * 
    FROM "libraries"
    JOIN "users_libraries_link" ON "libraries"."id" = "users_libraries_link"."library"
    WHERE "user" = ${userId}`;

    return this.pool.any(query) as Promise<LibraryType[]>;
  }

  public getDefaultLibrary(userId: number): Promise<null | LibraryType> {
    const query = sql`
      SELECT * 
      FROM "libraries"
      JOIN "users_libraries_link" ON "libraries"."id" = "users_libraries_link"."library"
      WHERE "user" = ${userId} AND "default" = true`;

    return this.pool.maybeOne(query) as Promise<null | LibraryType>;
  }

  public getRefreshToken(userId: number): Promise<null | string> {
    const query = sql`
      SELECT "refreshToken"
      FROM "users"
      WHERE "id" = ${userId}`;

    return this.pool.maybeOneFirst(query) as Promise<null | string>;
  }

  public setRefreshTokenId(userId: number, jwtId: string): Promise<void> {
    const query = sql`
    UPDATE "users"
    SET "refreshToken" = ${jwtId}
    WHERE "id" = ${userId}`;

    return this.pool.maybeOneFirst(query) as Promise<any>;
  }

  public getResetToken(userId: number): Promise<null | string> {
    const query = sql`
      SELECT "resetToken"
      FROM "users"
      WHERE "id" = ${userId}`;

    return this.pool.maybeOneFirst(query) as Promise<null | string>;
  }

  public setResetTokenId(userId: number, jwtId: string): Promise<void> {
    const query = sql`
    UPDATE "users"
    SET "resetToken" = ${jwtId}
    WHERE "id" = ${userId}`;

    return this.pool.maybeOneFirst(query) as Promise<any>;
  }

  private createNewRefreshToken(user: any, library: any): Promise<string> {
    const { jwtid, refreshToken } = generateRefreshToken(user, library);

    return this.setRefreshTokenId(user.id, jwtid).then(() => refreshToken);
  }

  public async login({ email, password }: any) {
    return this.getUserByEmail(email)
      .then((user: UserType) => {
        if (!user) {
          throw new AuthenticationError(ERRORS.INVALID_LOGIN);
        }

        return user;
      })
      .then((user: UserType) =>
        bcrypt.compare(password, user.password).then((passwordMatch) => {
          if (!passwordMatch) {
            throw new AuthenticationError(ERRORS.INVALID_LOGIN);
          }

          return this.getDefaultLibrary(user.id).then(
            (library: LibraryType) => {
              if (!library) {
                throw new AuthenticationError(ERRORS.NO_LIBRARY);
              }

              delete user.password;
              delete user.refreshToken;
              delete user.resetToken;

              return { user, library };
            }
          );
        })
      )
      .then(({ user, library }) => {
        const token = generateToken(user, library.id);

        return this.createNewRefreshToken(user, library.id).then(
          (refreshToken) => ({
            token,
            refreshToken,
            user,
            library,
          })
        );
      });
  }

  public async register({
    firstName,
    lastName,
    email,
    password,
  }: Partial<UserType>): Promise<UserType> {
    return bcrypt
      .hash(password, 10)
      .then(
        (hashedPassword) =>
          sql`
        INSERT INTO "users" ("uuid", "firstName", "lastName", "email", "password")
        VALUES (${uuid()}, ${firstName}, ${lastName}, ${email}, ${hashedPassword})
        RETURNING "id", "firstName", "lastName", "email"
      `
      )
      .then(this.pool.one) as Promise<UserType>;
  }

  public async refresh(jwt: string) {
    return new Promise((resolve, reject) =>
      verify(jwt, JWT_KEY, (err, decoded) => {
        if (err instanceof TokenExpiredError) {
          reject(new AuthenticationError("Refresh token expired"));
        }

        resolve(decoded);
      })
    )
      .then(async ({ id, library, jti }: any) => ({
        library,
        user: await this.pool.one(
          sql`SELECT "id", "uuid", "firstName", "lastName", "email", "createdAt" FROM "users" WHERE "id" = ${id} AND "refreshToken" = ${jti}`
        ),
      }))
      .then(({ library, user }) =>
        Promise.all([
          this.createNewRefreshToken(user, library),
          generateToken(user, library),
        ])
      )
      .then(([refresh, token]) => ({ refresh: refresh, token }))
      .catch((e) => {
        throw new AuthenticationError("Invalid Refresh Token");
      });
  }

  public forgot(email: string) {
    const mail = (token: string) => ({
      type: "FORGOT_PASSWORD",
      to: email,
      content: {
        link: `${process.env.URL}/reset-password?token=${token}`,
      },
    });

    return this.pool
      .one(sql`SELECT "id", "uuid" FROM "users" WHERE "email" = ${email}`)
      .then(async ({ id, uuid }) => ({
        id,
        reset: await generateResetToken(uuid),
      }))
      .then(({ id, reset: { jwtid, token } }) =>
        Promise.all([
          this.setResetTokenId(parseInt(id.toString()), jwtid),
          this.channel.sendToQueue(
            "mailroom_account",
            Buffer.from(JSON.stringify(mail(token)))
          ),
        ])
      )
      .then(() => true);
  }

  public reset(token: string, password: string) {
    return new Promise((resolve, reject) => {
      verify(token, JWT_KEY, (err, decoded) => {
        if (err instanceof TokenExpiredError) {
          reject(new AuthenticationError("Reset token expired"));
        } else if (err) {
          reject(err);
        }

        console.log(decoded);

        resolve(decoded);
      });
    })
      .then(({ jti, uuid }: any) =>
        Promise.all([
          bcrypt.hash(password, 10),
          this.pool.oneFirst(
            sql`SELECT "id" FROM "users" WHERE "uuid" = ${uuid} AND "resetToken" = ${jti}`
          ),
        ])
      )
      .then(([hashedPassword, userId]) =>
        this.pool.oneFirst(
          sql`UPDATE "users" SET "password" = ${hashedPassword} WHERE "id" = ${userId} RETURNING "email"`
        )
      )
      .then((email) => this.login({ email, password }));
  }
}
