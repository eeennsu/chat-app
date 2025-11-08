import { z } from 'zod';

export const SearchFormDtoSchema = z.object({
  search: z.string(),
});

export const SortOrderSchema = z
  .union([z.string(), z.number()])
  .refine(val => val !== '', { message: '순서를 입력해주세요.' })
  .refine(
    val => {
      const num = Number(val);
      return !isNaN(num) && Number.isInteger(num) && num > 0;
    },
    { message: '순서는 1 이상의 정수여야 합니다.' },
  );
