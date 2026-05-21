import { Body, Param, Query } from '@nestjs/common';
import type { ZodTypeAny } from 'zod';
import { ZodValidationPipe } from '../pipes/zod-validation.pipe';

export const ZodBody = (s: ZodTypeAny) => Body(new ZodValidationPipe(s));
export const ZodQuery = (s: ZodTypeAny) => Query(new ZodValidationPipe(s));
export const ZodParam = (k: string, s: ZodTypeAny) =>
  Param(k, new ZodValidationPipe(s));
