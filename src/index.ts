import express from "express";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";

async function startApolloServer() {
  const app = express();

  app.use(express.json());

  const PORT = process.env.PORT || 8000;

  const gqlServer = new ApolloServer({
    typeDefs: `
        type Query {
            hello: String    
        }
        `,
    resolvers: {
      Query: {
        hello: () => "Hello World",
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
