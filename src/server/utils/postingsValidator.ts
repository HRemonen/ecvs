import { z } from 'zod';

export const PostingZod = z.object({
  company: z.object({
    name: z.string(),
    location: z.string()
  }),
  title: z.string(),
  info: z.string().optional(),
  endDate: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
  }, z.date().optional())
});

export type ValidatedPosting = z.infer<typeof PostingZod>;
export default PostingZod;