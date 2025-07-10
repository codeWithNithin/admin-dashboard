// Auth servie endpoint

import type {
  CreateRestorauntData,
  CreateUserData,
  Credentials,
} from "../types";
import { api } from "./client";

export const authService = "/api/auth";
// const catalogService = "/api/catalog";

// authentication
export const login = (credentials: Credentials) =>
  api.post(`${authService}/auth/login`, credentials);

export const self = () => api.get(`${authService}/auth/self`);

export const logout = () => api.post(`${authService}/auth/logout`);

// users
export const getAllUsers = (queryString: string) =>
  api.get(`${authService}/users?${queryString}`);

export const createUser = (params: CreateUserData) =>
  api.post(`${authService}/users`, params);

export const updateUser = (params: CreateUserData, id: string) =>
  api.patch(`${authService}/users/${id}`, params);

// tenants or restoraunts
export const getAllRestoraunts = (queryString: string) =>
  api.get(`${authService}/tenants/?${queryString}`);

export const createRestoraunt = (params: CreateRestorauntData) =>
  api.post(`${authService}/tenants`, params);

export const updateRestoraunt = (params: CreateRestorauntData, id: string) => {
  console.log(params, id);
  return api.patch(`${authService}/tenants/${id}`, params);
};
