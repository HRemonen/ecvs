import { InputHTMLAttributes } from "react";
import { FieldError, UseFormRegister, FieldValues, Control, FieldErrorsImpl } from "react-hook-form";

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
  register: UseFormRegister<FieldValues> | UseFormRegister<any>;
  error: FieldError | undefined;
  label: string;
  id: string;
}

export interface WordFieldType extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  control: Control<FieldValues, any>;
  register: UseFormRegister<FieldValues> | UseFormRegister<any>;
}