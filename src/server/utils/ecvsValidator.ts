import { z } from 'zod';

const EcvZod = z.object({
  expertise: z.array(z.string()).optional(),
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
  qualifications: z.array(z.string()).optional(),
  hobbies: z.array(z.string()).optional(),
  languages: z.array(z.string()).optional(),
  references: z.array(z.string()).optional(),
  socials: z.array(z.string()).optional(),
  profile: z.string().optional()
});

export type ValidatedEcv = z.infer<typeof EcvZod>;

export default EcvZod;