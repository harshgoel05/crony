import express from "express";
import { initDbClient } from "./api/util/database";

(async () => {
  const app = express();
  await initDbClient();
  app.use(express.json());
})();
