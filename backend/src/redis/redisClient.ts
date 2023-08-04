import { createClient } from "redis";
import * as process from "process";

import { isDev } from "../constants/env";
// import { REDIS_LOCK_KEY } from "../constants/redis";

export const redisClient = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

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

export const connectRedis = async () => {
  await redisClient.connect();

  // const isUnlocked = await redisClient.set(REDIS_LOCK_KEY, REDIS_LOCK_KEY);
  //
  // console.log("isUnlocked", isUnlocked)
  //
  // if (!isUnlocked) {
  //   throw new Error("Already locked by another user");
  // }
};

export const disconnectRedis = async (): Promise<void> => {
  // await redisClient.del(REDIS_LOCK_KEY);
  await redisClient.disconnect();
};

export const clearRoomsInTime = async (time = 86400) => {
  try {
    const ttl = await redisClient.ttl("rooms");

    const isKeyAbsent = ttl === -1;
    const isTTLAbsentOnKey = ttl === -2;

    if (isKeyAbsent || isTTLAbsentOnKey) {
      // all rooms will be removed in {time}
      await redisClient.expire("rooms", time);
    }
  } catch (err) {
    console.log("Error", err);

    throw err;
  }
};
