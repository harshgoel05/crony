import { getDbClient } from "../util/database";
import * as nodecron from "node-cron";
import { ObjectID } from "mongodb";
export async function createCron(data: any): Promise<string> {
  const dbClient = await getDbClient();
  const dbResponse = await dbClient.db().collection("crons").insertOne(data);
  console.log(dbResponse);
  scheduleCronJob(data, dbResponse.insertedId);
  return dbResponse.insertedId;
}

export async function getCronDetails(cronId: string): Promise<any> {
  const dbClient = await getDbClient();
  console.log(new ObjectID(cronId));
  const dbResponse = await dbClient
    .db()
    .collection("logs")
    .find({ cronId: new ObjectID(cronId) })
    .toArray();
  console.log(dbResponse);
  return dbResponse;
}

export async function addCronLog(cronId: string, data: any): Promise<void> {
  const dbClient = await getDbClient();
  await dbClient
    .db()
    .collection("logs")
    .insertOne({ cronId, ...data });
}

export async function scheduleCronJob(data: any, cronId: any) {
  try {
    nodecron.schedule("10 * * * * *", () => {
      try {
        console.log(data.script);
        eval(data.script);
        addCronLog(cronId, { status: "success", timestamp: +new Date() });
      } catch (err) {
        addCronLog(cronId, {
          status: "failure",
          timestamp: +new Date(),
          error: err,
        });
      }
    });
  } catch (err) {
    console.log("Error scheduling");
  }
}
