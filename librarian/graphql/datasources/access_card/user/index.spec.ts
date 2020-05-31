import User from "./index";
// @ts-ignore: out of date typings
import { createMockPool, createMockQueryResult, DatabasePoolType } from "slonik";
import { Channel } from "amqplib";

let channel: Channel;

function configureMockPool(result: any) {
  return createMockPool({
    query: async () => {
      return createMockQueryResult(result);
    },
  });
}

describe("User", () => {
  beforeEach(() => {
    channel = { sendToQueue: jest.fn().mockResolvedValue(true) } as unknown as Channel;
  })

  it("#getUserById should find a user by their ID", async () => {
    const pool = configureMockPool([{ id: 1 }]);
    const user = new User(pool, channel)
    const result = await user.getUserById(1);

    expect(result).toBeTruthy();
    expect(result && result.id).toBe(1);
  });

  it("#getUserByEmail should find a user by their email", async () => {
    const pool = configureMockPool([{ email: "test@pluteum.io" }]);
    const user = new User(pool, channel)
    const result = await user.getUserByEmail("test@pluteum.io");

    expect(result).toBeTruthy();
    expect(result && result.email).toBe("test@pluteum.io");
  });

  it.todo("#login will throw an AuthenticationError if the user does not exist")
  it.todo("#login will throw an AuthenticationError with invalid credentials")
  it.todo("#login will throw an AuthenticationError if no default library can be found")
  it.todo("#login will return the user, library, an access token and a refreshToken")
  it.todo("#login will not include the users hashed password, password reset token or refresh token")

  it.todo("#register will return a user after sucessfully creating the user")

  it.todo("#refresh will thrown an AuthencationError if the JWT has expired")
  it.todo("#refresh will return a new access token and refresh token")

  it.todo("#forgot will insert the reset token to the user's row")
  it.todo("#forgot will send a reset email to mailroom")

  it.todo("#reset will throw an AuthencationError if the reset token (JWT) has expired")
  it.todo("#reset will throw an ResourceNotFoundError if a user cannot be found")
  it.todo("#reset will login the user after a successful password reset")
});
