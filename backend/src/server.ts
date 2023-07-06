import { server } from "./devServer";

export const app = (): typeof server => {
  return server;
};
