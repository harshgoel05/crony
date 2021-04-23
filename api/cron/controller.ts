import { Request, Response, Router } from "express";

export async function handleCreateCron(req: Request, res: Response) {}

export async function handleGetCronDetails(req: Request, res: Response) {}

export default function cronController(): Router {
  const router = Router();
  router.post("/", handleCreateCron);
  router.get("/", handleGetCronDetails);
  return router;
}
