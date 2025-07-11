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
  tenant: Tenant;
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

export type CreateRestorauntData = {
  name: string;
  address: string;
};

export type Category = {
  _id: string;
  name: string;
};

export type Product = {
  _id: string;
  name: string;
  url: string;
  description: string;
  isPublish: boolean;
  createdAt: string;
  category: Category;
};
