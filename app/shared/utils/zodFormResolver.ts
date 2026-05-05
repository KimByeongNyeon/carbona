import type {
  FieldError,
  FieldErrors,
  FieldValues,
  Resolver,
} from "react-hook-form";
import type { z } from "zod";

/**
 * 프로젝트의 Zod schema를 React Hook Form resolver로 연결한다.
 * 현재 폼은 각 input 아래에 메시지 하나만 표시하므로 필드별 첫 번째 오류만 유지한다.
 */
export const createZodFormResolver = <TFieldValues extends FieldValues>(
  schema: z.ZodType<TFieldValues>,
): Resolver<TFieldValues> => {
  return async (values) => {
    const parsed = await schema.safeParseAsync(values);

    if (parsed.success) {
      return {
        errors: {},
        values: parsed.data,
      };
    }

    const fieldErrors: Record<string, FieldError> = {};

    // Zod는 평평한 issue 배열을 반환하므로 React Hook Form이 요구하는 필드별 error 객체로 바꾼다.
    parsed.error.issues.forEach((issue) => {
      const fieldName = issue.path[0];

      if (typeof fieldName !== "string" || fieldErrors[fieldName]) {
        return;
      }

      fieldErrors[fieldName] = {
        message: issue.message,
        type: issue.code,
      };
    });

    return {
      errors: fieldErrors as FieldErrors<TFieldValues>,
      values: {},
    };
  };
};
