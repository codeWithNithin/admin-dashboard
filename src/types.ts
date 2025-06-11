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

export type Tenant  = {
  id: number;
  name: string;
  address: string
}