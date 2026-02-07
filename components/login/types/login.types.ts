export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginSubmitPayload {
  email: string;
  password: string;
  remember: boolean;
}

export interface LoginFormProps {
  onSubmit?: (payload: LoginSubmitPayload) => void;
  isLoading?: boolean;
  onSignUp?: () => void;
  initialEmail?: string;
  initialPassword?: string;
  initialRemember?: boolean;
}

export interface LoginHeaderProps {
  title?: string;
  subtitle?: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}

export interface ValidationErrors {
  email?: string | null;
  password?: string | null;
}
