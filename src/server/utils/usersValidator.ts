import { z } from 'zod';

const ValidateNormalUser = z.object({
  firstName: z.string().min(2).max(18),
  lastName: z.string().min(2).max(18),
  email: z.string().email(),
  password: z.string(),
  phoneNumber: z.string().optional(),
  address: z.string().optional(),
});

export default ValidateNormalUser;