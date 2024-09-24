import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { prisma } from "./lib/script";

async function startApolloServer() {
  const app = express();
  app.use(express.json());

  const PORT = process.env.PORT || 8000;

  const gqlServer = new ApolloServer({
    typeDefs: `
      type User {
        id: String!
        name: String!
        email: String!
        password: String!
        salt: String!
        userImage: String
        createdAt: String!
        updatedAt: String!
      }

      type Query {
        hello: String    
      }

      type Mutation {
        createUser(name: String!, email: String!, password: String!): User!
      }
    `,

    resolvers: {
      Query: {
        hello: () => "Hello World",
      },

      Mutation: {
        createUser: async (_, { name, email, password }: { name: string; email: string; password: string }) => {
          const newUser = await prisma.user.create({
            data: {
              name,
              email,
              password,
              salt: "heythere",
            },
          });
          return newUser;
        },
      },
    },
  });

  await gqlServer.start();

  app.get("/", (req, res) => {
    res.json({ message: "Hello Hero" });
  });

  app.use(expressMiddleware(gqlServer));

  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
}

startApolloServer();
