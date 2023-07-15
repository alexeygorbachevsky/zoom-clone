import { isDev } from "../constants/_env";

export const handleUncaughtErrors = () => {
  process.on("unhandledRejection", (error: Error) => {
    if (isDev) {
      console.log("unhandledRejection:", error.message);
    }
    process.exit(1);
  });

  process.on("uncaughtException", (error: Error) => {
    if (isDev) {
      console.log("uncaughtException:", error.message);
    }
    process.exit(1);
  });
};
