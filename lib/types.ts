export type UserRole = "admin" | "user";

export interface LoggedInUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
}

export interface FirestoreUserDoc {
  email: string;
  name: string;
  role: "admin" | "user";
  document?: string | null;
  city?: string | null;
  country?: string | null;
  phone?: string | null;
  userType?: string | null;
  plan?: string | null;
  createdAt?: string;
  payment?: {
    method?: "boleto" | "transferencia" | null;
    boletoDocument?: string | null;
    bank?: string | null;
    agency?: string | null;
    account?: string | null;
    swift?: string | null;
    iban?: string | null;
  };
}

export interface UserWithId extends FirestoreUserDoc {
  id: string;
}
