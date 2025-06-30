export class ResponseDto<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: any;
}
