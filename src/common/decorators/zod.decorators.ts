import { Body, Param, Query, BadRequestException, PipeTransform } from '@nestjs/common';
import type { ZodTypeAny } from 'zod';

class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodTypeAny) {}

  transform(value: any) {
    const result = this.schema.safeParse(value);
    if (!result.success) {
      // ZodError exposes issues (not errors) containing validation details
      throw new BadRequestException(result.error.issues);
    }
    return result.data;
  }
}

export const ZodBody = (s: ZodTypeAny) => Body(new ZodValidationPipe(s));
export const ZodQuery = (s: ZodTypeAny) => Query(new ZodValidationPipe(s));
export const ZodParam = (k: string, s: ZodTypeAny) => Param(k, new ZodValidationPipe(s));
