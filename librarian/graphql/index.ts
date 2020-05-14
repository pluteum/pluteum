import { ApolloServer } from "apollo-server-express";
import schema from "./schema/schema";
import Bookshelf from "./datasources/bookshelf";
import AccessCard from "./datasources/access_card";
import { verify } from "jsonwebtoken";

function getToken(header: string = "") {
    return header.replace("Bearer: ", "") || "";
}

function getUser(token: string) {
    if (token) {
        const decodedToken = verify(token, process.env.JWT_KEY || "default");
        if (decodedToken) {
            return decodedToken;
        }
    }

    return {};
}

export default function getApolloServer(pool, channel) {
    return new ApolloServer({
        schema,
        context: ({ req, res }) => ({
            setCookie: res.cookie.bind(res),
            token: getToken(req.headers.authorization),
            client: pool,
            ...getUser(getToken(req.headers.authorization)),
        }),
        dataSources: () => ({
            bookshelf: new Bookshelf(client, channel),
            accesscard: new AccessCard(),
        }),
        tracing: true,
    });
}