import express from "express";
import { initDbClient } from "./api/util/database";
import { config } from "dotenv";
import cronController from "./api/cron/controller";
(async () => {
  const app = express();
  await config();
  await initDbClient();
  app.use(express.json());

  app.use("/api/v1/cron", cronController());

  app.listen(process.env.PORT || 3000, () => {
    console.log("Server running on port", process.env.PORT || 3000);
  });
})();
