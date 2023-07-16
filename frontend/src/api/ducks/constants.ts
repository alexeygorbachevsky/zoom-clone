import { ENV } from "constants/env";

export const DOMAIN = {
  [ENV.development]: "https://localhost:5001",
  // [ENV.development]: "https://zoom-clone-backend-alexeygorbachevskiy.vercel.app",
  [ENV.production]: "https://zoom-clone-backend-alexeygorbachevskiy.vercel.app",
};
