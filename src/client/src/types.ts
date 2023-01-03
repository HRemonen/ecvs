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

interface ExperienceFormValues {
  experience: {
    company: string;
    startDate: Date;
    endDate?: Date;
    position: string;
    additionalInfo?: string;
  }[]
}

export interface ExperienceFieldType extends InputHTMLAttributes<HTMLInputElement> {
  error: FieldError | any;
  control: Control<ExperienceFormValues | any>;
  register: UseFormRegister<FieldValues> | UseFormRegister<any>;
}

interface EducationFormValues {
  education: {
    school: string;
    startDate: Date;
    graduationDate?: Date;
    additionalInfo?: string;
  }
}

export interface EducationFieldType extends InputHTMLAttributes<HTMLInputElement> {
  error: FieldError | any;
  control: Control<EducationFormValues | any>;
  register: UseFormRegister<FieldValues> | UseFormRegister<any>;
}