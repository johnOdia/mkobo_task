import { createClient, RedisClientType } from "redis";

export let client!: RedisClientType;

export function createRedisClient(): void {
  try {
    let newClient = createClient();
    newClient.connect();
    newClient.on("connect", () => console.log("Redis Client connected"));
    client = newClient as RedisClientType;
  } catch (error) {
    let message = "Unknown Error";
    if (error instanceof Error) message = error.message;
    console.log(message);
  }
}
