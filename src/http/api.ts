// Auth servie endpoint

import type { Credentials } from "../types";
import { api } from "./client";

// authentication
export const login = (credentials: Credentials) =>
  api.post("/auth/login", credentials);

export const self = () => api.get("/auth/self");

export const logout = () => api.post("/auth/logout");

// users
export const getAllUsers = () => api.get("/users");

// tenants or restoraunts
export const getAllRestoraunts = () => api.get("/tenants");
