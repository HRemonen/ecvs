import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegister } from "react-hook-form";

export interface UserLogin {
  email: string;
  password: string;
}

export interface AuthenticatedUser {
  token: string;
  user: {
    name: string;
    email: string;
    id: string;
  }
}

export interface LoginInput extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<{
    email: string;
    password: string;
  }>;
  error: FieldError | undefined;
  label: string;
  id: "email" | "password";
}

export interface RegisterInput extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<{
    address?: string | undefined;
    phoneNumber?: string | undefined;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }>;
  error: FieldError | undefined;
  label: string;
  id: "address" | "firstName" | "lastName" | "email" | "password" | "phoneNumber";
}