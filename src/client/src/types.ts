export interface UserLogin {
  email: string;
  password: string;
};

export interface AuthenticatedUser {
  token: string;
  user: {
    name: string;
    email: string;
    id: string;
  }
};