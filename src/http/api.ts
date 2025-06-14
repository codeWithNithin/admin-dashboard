// Auth servie endpoint

import type { CreateUserData, Credentials } from "../types";
import { api } from "./client";

// authentication
export const login = (credentials: Credentials) =>
  api.post("/auth/login", credentials);

export const self = () => api.get("/auth/self");

export const logout = () => api.post("/auth/logout");

// users
export const getAllUsers = (queryString: string) =>
  api.get(`/users?${queryString}`);

export const createUser = (params: CreateUserData) =>
  api.post("/users", params);

// tenants or restoraunts
export const getAllRestoraunts = () => api.get("/tenants");
