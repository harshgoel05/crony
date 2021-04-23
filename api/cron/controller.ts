import { Request, Response, Router } from "express";
import { createCron, getCronDetails } from "./service";

export async function handleCreateCron(req: Request, res: Response) {
  try {
    const id = await createCron(req.body);
    res.status(200).send({ message: "Created a job ", id });
  } catch (err) {
    if (err.code) {
      return res.status(err.code).json(err.message);
    }
    return res.status(500).json("Server Error");
  }
}

export async function handleGetCronDetails(req: Request, res: Response) {
  try {
    const data = await getCronDetails(req.params.id);
    res.status(200).send({ message: "Fetched a job ", data });
  } catch (err) {
    if (err.code) {
      return res.status(err.code).json(err.message);
    }
    return res.status(500).json("Server Error");
  }
}

export default function cronController(): Router {
  const router = Router();
  router.post("/", handleCreateCron);
  router.get("/:id", handleGetCronDetails);
  return router;
}
