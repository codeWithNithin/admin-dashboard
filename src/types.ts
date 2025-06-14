export type Credentials = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  email: string;
  createdAt: string;
  firstName: string;
  lastName: string;
};

export type Tenant = {
  id: number;
  name: string;
  address: string;
};

export type CreateUserData = {
  firstName: string;
  lastName: string;
  role: string;
  password: string;
  tenantId: number;
};

export type FieldData = {
  name: string[];
  value?: string;
};
