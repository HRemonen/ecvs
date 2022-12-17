import { z } from 'zod';

export const LoginZod = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: "Password must be 8 or more characters long" })
});


export type ValidatedLogin = z.infer<typeof LoginZod>;