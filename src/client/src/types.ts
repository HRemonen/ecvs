import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegister, FieldValues, Control } from "react-hook-form";

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
  register: UseFormRegister<FieldValues> | UseFormRegister<never>;
  error: FieldError | undefined;
  label: string;
  id: string;
}

export interface WordFieldType extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  control: Control<FieldValues, never>;
  register: UseFormRegister<FieldValues> | UseFormRegister<never>;
}