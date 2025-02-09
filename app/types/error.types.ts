// login Error
type CodeitErrorMessage = string;
type CodeitErrorCode = string;
export type CodeitErrorStatus = 401 | 404 | 500;
type CodeitErrorParameter = string;

export class CodeitError extends Error {
  constructor(
    public message: CodeitErrorMessage,
    public status: CodeitErrorStatus,
    public code?: CodeitErrorCode,
    public parameter?: CodeitErrorParameter,
  ) {
    super();
  }
}
