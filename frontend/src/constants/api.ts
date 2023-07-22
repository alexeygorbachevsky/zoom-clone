import { ENV } from "constants/env";

const DOMAINS = {
  [ENV.development]: "https://localhost:5001",
  [ENV.production]: "https://zoom-clone-backend-alexeygorbachevskiy.vercel.app",
};

export const DOMAIN = DOMAINS[process.env.NODE_ENV];
