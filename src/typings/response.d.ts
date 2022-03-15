declare namespace API {
  type Response<T> = {
    code?: number;
    success: boolean;
    data?: T;
    error_message?: string;
  };
}
