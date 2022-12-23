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
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
});

export type ValidatedUser = z.infer<typeof UserZod>;
export type ValidatedLogin = z.infer<typeof LoginZod>;