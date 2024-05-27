export interface LoginResponse {
  success: boolean;
  accessToken: string;
  expirationDate: Date | string;
  errors: string[];
}
