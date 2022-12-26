import { z } from 'zod';

export const PostingZod = z.object({
  hiringManager: z.object({
    name: z.string(),
    email: z.string(),
    phoneNumber: z.string()
  }),
  company: z.object({
    name: z.string(),
    location: z.string()
  }),
  title: z.string(),
  type: z.string(),
  info: z.string().optional(),
  endDate: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date().optional())
});

export type ValidatedPosting = z.infer<typeof PostingZod>;