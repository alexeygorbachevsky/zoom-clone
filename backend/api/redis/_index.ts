import { createClient } from "redis";
import * as process from "process";

export { _createRoom } from "./_createRoom";

export const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

export const connectRedis = (): void => {
  redisClient.connect();

  redisClient.on("connect", () => {
    console.log("Redis connected");
  });

  redisClient.on("ready", () => {
    console.log("Redis ready to use");
  });

  redisClient.on("end", () => {
    console.error("Redis closed connection");
  });

  redisClient.on("error", error => {
    console.error("Redis error", error);
  });
};
