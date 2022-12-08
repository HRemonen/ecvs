import { z } from 'zod';

export const LoginZod = z.object({
  email: z.string().email(),
  password: z.string()
});

export const UserZod = z.object({
  firstName: z.string().min(2).max(18),
  lastName: z.string().min(2).max(18),
  email: z.string().email(),
  password: z.string().min(8),
  phoneNumber: z.string().min(10).optional(),
  address: z.string().optional(),
});

export type ValidatedUser = z.infer<typeof UserZod>;