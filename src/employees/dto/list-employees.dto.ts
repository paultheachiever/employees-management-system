import { z } from 'zod';

export const employeeSortFields = z.enum([
  'firstName',
  'lastName',
  'email',
  'department',
  'createdAt',
  'updatedAt',
]);

export const listEmployeesSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(20),
  sortBy: employeeSortFields.default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().trim().min(1).optional(),
  department: z.string().trim().min(1).optional(),
  position: z.string().trim().min(1).optional(),
  isActive: z.coerce.boolean().optional(),
});

export type ListEmployeesDto = z.infer<typeof listEmployeesSchema>;

export interface PaginatedResult<T> {
  data: T[];
  meta: { page: number; pageSize: number; total: number; totalPages: number };
}
