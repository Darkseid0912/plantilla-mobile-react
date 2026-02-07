export interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  birthDate: string;
  phone: string;
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
}

export interface RegisterErrors {
  fullName?: string | null;
  email?: string | null;
  password?: string | null;
  confirmPassword?: string | null;
  birthDate?: string | null;
  acceptedTerms?: string | null;
  acceptedPrivacy?: string | null;
}

export interface RegisterFormProps {
  onBackToLogin?: () => void;
}

export interface RegisterResponse {
  id: string;
  email: string;
  createdAt: string;
}
