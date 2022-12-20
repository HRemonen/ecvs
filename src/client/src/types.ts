import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegister, FieldValues } from "react-hook-form";

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

export interface InputType extends InputHTMLAttributes<HTMLInputElement> {
  register: UseFormRegister<FieldValues> | any;
  error: FieldError | undefined;
  label: string;
  id: string;
}