import { z } from 'zod';

export const createEmployeeSchema = z
  .object({
    firstName: z.string().min(1).max(100),
    lastName: z.string().min(1).max(100),
    email: z.string().email().max(255),
    position: z.string().min(1).max(100),
    department: z.string().max(100).optional(),
    notes: z.string().optional(),
    isActive: z.boolean().optional(),
  })
  .strict();

export type CreateEmployeeDto = z.infer<typeof createEmployeeSchema>;
