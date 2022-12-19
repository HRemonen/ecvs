import { z } from 'zod';

export const LoginZod = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be 8 or more characters long" })
});

export const UserZod = z.object({
  firstName: z.string()
    .min(2, { message: "Firstname must be 2 or more characters long" })
    .max(18, { message: "Firstname must be 18 or less characters long" }),
  lastName: z.string()
    .min(2, { message: "Lastname must be 2 or more characters long" })
    .max(18, { message: "Lastname must be 18 or less characters long" }),
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be 8 or more characters long" }),
  phoneNumber: z.string().min(10).optional(),
  address: z.string().optional(),
});

export const EcvZod = z.object({
  skills: z.array(z.string()).optional(),
  education: z.array(z.object({
    school: z.string(),
    startDate: z.date(),
    graduationDate: z.date().optional(),
    additionalInfo: z.string().optional()
  })).optional(),
  experience: z.array(z.object({
    company: z.string(),
    startDate: z.date(),
    endDate: z.date().optional(),
    position: z.string(),
    additionalInfo: z.string().optional()
  })).optional(),
  hobbies: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  profile: z.string().optional()
});