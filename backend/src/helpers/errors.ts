import { isDev } from "../constants/env";

export const handleUncaughtErrors = () => {
  process.on("unhandledRejection", (error: Error) => {
    if (isDev) {
      console.log("unhandledRejection:", error.message);
    }
    throw error;
  });

  process.on("uncaughtException", (error: Error) => {
    if (isDev) {
      console.log("uncaughtException:", error.message);
    }
    throw error;
  });
};
