import { ENV } from "constants/env";

export const DOMAIN = {
  [ENV.development]: "https://localhost:5001",
  // TODO
  [ENV.production]: "https://localhost:5001",
};
