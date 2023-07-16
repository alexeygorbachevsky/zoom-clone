import { createClient } from "redis";
import * as process from "process";

import { isDev } from "../../constants/_env";

export const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

export const connectRedis = async (): Promise<typeof redisClient> => {
  await redisClient.connect();

  if (isDev) {
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
  }

  return redisClient;
};

export const disconnectRedis = async (): Promise<void> => {
  await redisClient.disconnect();
};
