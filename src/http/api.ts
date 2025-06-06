// Auth servie endpoint

import type { Credentials } from "../types";
import { api } from "./client";

export const login = (credentials: Credentials) => {
return api.post('/auth/login', credentials);
}

export const register = (credentials: Credentials) => {
return api.post('/auth/register', credentials);
}