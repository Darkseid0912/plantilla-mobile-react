export interface ProfileFormData {
  name: string;
  relation: string;
  birthDate: string;
  allergies: string;
  doctor: string;
}

export interface ProfileResponse {
  id: string;
  createdAt: string;
}
