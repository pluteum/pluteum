import { Request, Response } from "express";

const mockResponse = () => {
  const res = {} as Response;
  // @ts-ignore
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

const mockQuery = jest.fn(() =>
  Promise.resolve({
    rows: [
      {
        firstName: "test",
        lastName: "test",
        email: "test@gmail.com",
        password: "test",
      },
    ],
  })
);

jest.mock("bcrypt", () => {
  return {
    hash: jest.fn((string) => string),
  };
});

jest.mock("../db", () => {
  const mPool = {
    query: mockQuery,
  };
  return { getDb: jest.fn(() => mPool) };
});

import registrationHandler from "./registration";

describe("#registrationHandler", () => {
  it("should call #registerUser with a valid input", async () => {
    const request = {
      body: {
        firstName: "test",
        lastName: "test",
        email: "test@gmail.com",
        password: "test",
      },
    } as Request;

    const response = mockResponse();

    await registrationHandler(request, response);

    expect(mockQuery).toHaveReturnedWith(expect.any(Promise));
  });

  it("should return a list of validation errors with an empty input", async () => {
    const request = { body: {} } as Request;
    const response = mockResponse();

    await registrationHandler(request, response);

    expect(response.status).toHaveBeenCalledWith(400);
    expect(response.send).toHaveBeenCalledWith(
      expect.arrayContaining([expect.any(Error)])
    );
  });
});
