import registerUser from "./registration";
import { PoolClient } from "pg";
import { UserInputError } from "apollo-server-express";

jest.mock("bcrypt", () => ({
  hash: (password: string) => password,
}));

const INVALID_INPUT = {
  firstName: "Test",
  lastName: "User",
  email: "invalid@email",
  password: "password",
};

const VALID_INPUT = {
  firstName: "Test",
  lastName: "User",
  email: "test@plutuem.io",
  password: "password",
};

describe("AccessCard#registerUser", () => {
  it("should reject invalid input", async () => {
    const MockPool = ({
      query: jest.fn(),
    } as unknown) as PoolClient;

    return registerUser(INVALID_INPUT, MockPool).catch((e) => {
      expect(e).toBeInstanceOf(UserInputError);
    });
  });

  it("should create a new user with valid input", async () => {
    const MockPool = ({
      query: jest.fn().mockResolvedValue({ rows: [VALID_INPUT] }),
    } as unknown) as PoolClient;

    const expectedQueryArgs = expect.objectContaining({
      text:
        'INSERT INTO users ("firstName", "lastName", email, uuid, password) VALUES ($1, $2, $3, $4, $5) RETURNING "id", "firstName", "lastName", "email"',
      values: expect.arrayContaining([
        VALID_INPUT.firstName,
        VALID_INPUT.lastName,
        VALID_INPUT.email,
        expect.any(String),
        expect.any(String),
      ]),
    });

    return registerUser(VALID_INPUT, MockPool).then((user) => {
      expect(MockPool.query).toHaveBeenNthCalledWith(1, expectedQueryArgs);
      expect(user).toMatchObject(VALID_INPUT);
    });
  });

  it("should create a new library for a new user", async () => {
    const MockPool = ({
      query: jest.fn().mockResolvedValue({ rows: [VALID_INPUT] }),
    } as unknown) as PoolClient;

    const expectedQueryArgs = expect.objectContaining({
      text:
        'INSERT INTO libraries (title, uuid) VALUES ($1, $2) RETURNING "id", "uuid", "title"',
      values: expect.arrayContaining([
        `${VALID_INPUT.firstName}'s Library`,
        expect.any(String),
      ]),
    });

    return registerUser(VALID_INPUT, MockPool).then(() => {
      expect(MockPool.query).toHaveBeenNthCalledWith(2, expectedQueryArgs);
    });
  });
});
