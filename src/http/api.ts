// Auth servie endpoint

import type {
  CreateRestorauntData,
  CreateUserData,
  Credentials,
} from "../types";
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

export const updateUser = (params: CreateUserData, id: string) =>
  api.patch(`/users/${id}`, params);

// tenants or restoraunts
export const getAllRestoraunts = (queryString: string) =>
  api.get(`/tenants/?${queryString}`);

export const createRestoraunt = (params: CreateRestorauntData) =>
  api.post("/tenants", params);

export const updateRestoraunt = (params: CreateRestorauntData, id: string) => {
  console.log(params, id)
   return api.patch(`/tenants/${id}`, params);
}