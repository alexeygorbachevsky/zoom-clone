import { ENV } from "constants/env";

export const DOMAIN = {
  [ENV.development]: "https://localhost:5001",
  [ENV.production]: "https://zoom-clone-backend-alexeygorbachevskiy.vercel.app",
};
