import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import initApolloServer from "./graphql";

async function startApolloServer() {
  const app = express();
  app.use(express.json());

  const PORT = process.env.PORT || 8000;

  app.get("/", (req, res) => {
    res.json({ message: "Hello Hero" });
  });

  app.use(expressMiddleware(await initApolloServer()));

  app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
  });
}

startApolloServer();
