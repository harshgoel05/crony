import { getDbClient } from "../util/database";

export async function createCron(data: any): Promise<string> {
  const dbClient = await getDbClient();
  const dbResponse = await dbClient.db().collection("crons").insertOne(data);
  console.log(dbResponse);
  return dbResponse.insertedId;
}

export async function getCronDetails(cronId: string): Promise<any> {
  const dbClient = await getDbClient();
  const dbResponse = await dbClient
    .db()
    .collection("logs")
    .find({ cronId })
    .toArray();
  console.log(dbResponse);
  return dbResponse;
}

export async function addCronLog(cronId: string, data: any): Promise<void> {
  const dbClient = await getDbClient();
  await dbClient.db().collection("logs").insertOne({ cronId, data });
}
