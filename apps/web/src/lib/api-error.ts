export type ApiErrorCode = "NOT_FOUND" | "FETCH_BLOCKED" | "NO_CONTENT";

export class ApiError extends Error {
  code: ApiErrorCode;

  constructor(code: ApiErrorCode) {
    super(code);
    this.name = "ApiError";
    this.code = code;
  }
}
