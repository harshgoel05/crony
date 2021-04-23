import { ObjectID } from "bson";
import * as yup from "yup";

export const cronSchema = yup.object({
  name: yup.string(),
  script: yup.string().required(),
  interval: yup.number().required(),
  measure: yup
    .string()
    .oneOf(["hrs", "sec", "days", "month", "year", "day"])
    .required(),
});

export const logSchema = yup.object({
  status: yup.string().required(),
  timestamp: yup.number().required(),
});

export interface Cron extends yup.InferType<typeof cronSchema> {
  _id: ObjectID;
}

export interface Log extends yup.InferType<typeof logSchema> {
  cronId: ObjectID;
}
