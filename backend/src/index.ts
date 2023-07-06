import { onRequest } from "firebase-functions/v2/https";

import { app as server } from "./app";


export const api = onRequest(server);
