import { isAxiosError } from "axios";
import type { ApiErrorResponse } from "@/app/lib/axios";

/**
 * mutation error를 폼에서 바로 렌더링할 수 있는 메시지로 정규화한다.
 * API route는 `{ message }` 형태를 사용하고, 예상치 못한 클라이언트 오류는
 * Error 기본 메시지나 도메인별 fallback 메시지로 처리한다.
 */
export const getApiErrorMessage = (
  error: unknown,
  fallbackMessage: string,
) => {
  if (!error) {
    return null;
  }

  if (isAxiosError<ApiErrorResponse>(error)) {
    return error.response?.data.message ?? fallbackMessage;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallbackMessage;
};
