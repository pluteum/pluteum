import User from "./index";
// @ts-ignore: out of date typings
import { createMockPool, createMockQueryResult } from "slonik";

const pool = createMockPool({
  query: async () => {
    return createMockQueryResult([{ id: 1, email: "test@pluteum.io" }]);
  },
});

describe("User", () => {
  let user = new User(pool);

  it("#getUserById should find a user by their ID", async () => {
    const result = await user.getUserById(1);
    expect(result).toBeTruthy();
    expect(result && result.id).toBe(1);
  });

  it("#getUserByEmail should find a user by their email", async () => {
    const result = await user.getUserByEmail("test@pluteum.io");
    expect(result).toBeTruthy();
    expect(result && result.email).toBe("test@pluteum.io");
  });
});
