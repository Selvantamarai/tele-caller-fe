import { ValidationFailure } from './validation-failure.model';

export interface Result {
  failed: boolean;
  message: string;
  failures: ValidationFailure[];
}

export interface Result1<T> extends Result {
  value: T;
}

export interface ExcelUploadResult extends Result {
  publicUrl: string;
}
