import {ENV} from "constants/env";

const DOMAINS = {
    [ENV.development]: "https://localhost:5001",
    // deprecated
    // [ENV.production]: "https://zoom-clone-backend-alexeygorbachevskiy.vercel.app",
    [ENV.production]: "https://zoom-clone-backend.vercel.app",
};

export const DOMAIN = DOMAINS[process.env.NODE_ENV];
