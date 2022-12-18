import { z } from 'zod';

const EcvZod = z.object({
  skills: z.array(z.string()).optional(),
  education: z.array(z.object({
    school: z.string(),
    startDate: z.preprocess((arg) => {
      if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    }, z.date()),
    graduationDate: z.preprocess((arg) => {
      if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    }, z.date().optional()),
    additionalInfo: z.string().optional()
  })).optional(),
  experience: z.array(z.object({
    company: z.string(),
    startDate: z.preprocess((arg) => {
      if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    }, z.date()),
    endDate: z.preprocess((arg) => {
      if (typeof arg == "string" || arg instanceof Date) return new Date(arg);
    }, z.date().optional()),
    position: z.string(),
    additionalInfo: z.string().optional()
  })).optional(),
  hobbies: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  profile: z.string().optional()
});

export type ValidatedEcv = z.infer<typeof EcvZod>;

export default EcvZod;