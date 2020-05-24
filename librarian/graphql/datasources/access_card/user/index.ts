import { PoolClient } from "pg";
import loginUser from "./login";
import registerUser from "./registration";
import refresh from "./refresh";
import forgot from "./forgot";
import { Channel } from "amqplib";
import reset from "./reset";
import bcrypt from "bcrypt";
import { DatabasePoolType, sql, QueryResultRowType } from "slonik";
import { generateToken, generateRefreshToken } from "../token";

const ERRORS = {
  INVALID_LOGIN: "Invalid username or password",
  NO_LIBRARY: "Unable to find default library for user",
};

export default class User {
  private pool: DatabasePoolType;

  constructor(pool: DatabasePoolType) {
    this.pool = pool;
  }

  public getUserById(userId: number) {
    const query = sql`
    SELECT *
    FROM "users"
    WHERE "id" = ${userId}`;

    return this.pool.maybeOne(query);
  }

  public getUserByEmail(email: string) {
    const query = sql`
    SELECT *
    FROM "users"
    WHERE "email" = ${email}`;

    return this.pool.maybeOne(query);
  }

  public getUsersLibraries(userId: number) {
    const query = sql`
    SELECT * 
    FROM "libraries"
    JOIN "users_libraries_link" ON "libraries"."id" = "users_libraries_link"."library"
    WHERE "user" = ${userId}`;

    return this.pool.any(query);
  }

  public getDefaultLibrary(userId: number) {
    const query = sql`
      SELECT * 
      FROM "libraries"
      JOIN "users_libraries_link" ON "libraries"."id" = "users_libraries_link"."library"
      WHERE "user" = ${userId} AND "default" = true`;

    return this.pool.maybeOne(query);
  }

  public getRefreshToken(userId: number) {
    const query = sql`
      SELECT "refreshToken"
      FROM "users"
      WHERE "id" = ${userId}`;

    return this.pool.maybeOneFirst(query);
  }

  public setRefreshTokenId(userId: number, jwtId: string) {
    const query = sql`
    UPDATE "users"
    SET "refreshToken" = ${jwtId}
    WHERE "id" = ${userId}`;

    return this.pool.maybeOneFirst(query);
  }

  public getResetToken(userId: number) {
    const query = sql`
      SELECT "resetToken"
      FROM "users"
      WHERE "id" = ${userId}`;

    return this.pool.maybeOneFirst(query);
  }

  public setResetTokenId(userId: number, jwtId: string) {
    const query = sql`
    UPDATE "users"
    SET "resetToken" = ${jwtId}
    WHERE "id" = ${userId}`;

    return this.pool.maybeOneFirst(query);
  }

  public async login({ email, password }: any) {
    return this.getUserByEmail(email)
      .then((user: any) => {
        if (!user) {
          throw new Error(ERRORS.INVALID_LOGIN);
        }

        return user;
      })
      .then((user) =>
        bcrypt.compare(password, user.password).then((passwordMatch) => {
          if (!passwordMatch) {
            throw new Error(ERRORS.INVALID_LOGIN);
          }

          return this.getDefaultLibrary(user.id).then((library: any) => {
            if (!library) {
              throw new Error(ERRORS.NO_LIBRARY);
            }

            return { user, library };
          });
        })
      )
      .then(({ user, library }) => {
        const token = generateToken(user, library);
        const { jwtid, refreshToken } = generateRefreshToken(user, library);

        return this.setRefreshTokenId(user.id, jwtid).then(() => ({
          token,
          refreshToken,
          user,
          library,
        }));
      });
  }

  // public register = (input: any) => registerUser(input, this.pool);
  // public refresh = (token: string) => refresh(token, this.pool);
  // public forgot = (email: string) => forgot(email, this.pool, this.channel);
  // public reset = (token: string, password: string) =>
  // reset(token, password, this.pool);
}
