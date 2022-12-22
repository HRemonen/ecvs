import { z } from 'zod';

export const LoginZod = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be 8 or more characters long" })
});

export const UserZod = z.object({
  firstName: z.string()
    .min(2, { message: "First name must be 2 or more characters long" })
    .max(18, { message: "First name must be 18 or less characters long" }),
  lastName: z.string()
    .min(2, { message: "Last name must be 2 or more characters long" })
    .max(18, { message: "Last name must be 18 or less characters long" }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be 8 or more characters long" }),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
});

export const EcvZod = z.object({
  experience: z.array(z.object({
    company: z.string()
      .min(2, { message: "Company name must be 2 or more characters long" }),
    startDate: z.date(),
    endDate: z.date().optional(),
    position: z.string()
      .min(2, { message: "Position must be 2 or more characters long" }),
    additionalInfo: z.string().optional()
  })).optional(),
  education: z.array(z.object({
    school: z.string()
      .min(2, { message: "School must be 3 or more characters long" }),
    startDate: z.date(),
    graduationDate: z.date().optional(),
    additionalInfo: z.string().optional()
  })).optional(),
  skills: z.array(z.string()).optional(),
  hobbies: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  profile: z.string().optional()
});