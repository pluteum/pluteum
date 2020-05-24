import { ApolloServer } from "apollo-server-express";
import schema from "./schema";
import Bookshelf from "./datasources/bookshelf";
import AccessCard from "./datasources/access_card";
import { verify } from "jsonwebtoken";
import { Channel } from "amqplib";
import { DatabasePoolType } from "slonik";

function getToken(header: string = "") {
  return header.replace("Bearer: ", "") || "";
}

function decodeToken(token: string) {
  if (token) {
    const decodedToken = verify(token, process.env.JWT_KEY || "default");
    if (decodedToken && typeof decodedToken === "object") {
      return decodedToken;
    }
  }

  return {};
}

export default function getApolloServer(
  pool: DatabasePoolType,
  channel: Channel
) {
  return new ApolloServer({
    schema,
    context: ({ req, res }) => ({
      setCookie: res.cookie.bind(res),
      token: getToken(req.headers.authorization),
      refreshToken: req.cookies["accesscard-refresh"],
      client: pool,
      ...decodeToken(getToken(req.headers.authorization)),
    }),
    dataSources: () => ({
      // bookshelf: new Bookshelf(pool, channel),
      accesscard: new AccessCard(pool, channel),
    }),
    tracing: true,
  });
}
