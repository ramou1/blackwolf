export type UserRole = "admin" | "user";

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
}

export type LoggedInUser = Omit<User, "password">;

export const MOCK_USERS: User[] = [
  {
    id: "admin-1",
    email: "admin@blackwolf.com",
    password: "admin123",
    name: "Administrador",
    role: "admin",
  },
  {
    id: "user-1",
    email: "usuario@blackwolf.com",
    password: "user123",
    name: "João Silva",
    role: "user",
  },
];

const registeredUsers: User[] = [];

export function validateLogin(email: string, password: string): User | null {
  const all = [...MOCK_USERS, ...registeredUsers];
  const user = all.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );
  if (!user) return null;
  return { ...user, password: "" };
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  telefone?: string;
  pais?: string;
  documento?: string;
  tipoUsuario?: string;
  plano?: string;
  role?: UserRole;
}

export function registerUser(data: RegisterData): { success: boolean; error?: string } {
  const { email, password, name, role = "user" } = data;
  const all = [...MOCK_USERS, ...registeredUsers];
  if (all.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, error: "Este e-mail já está em uso." };
  }
  const newUser: User & Partial<RegisterData> = {
    id: `user-${Date.now()}`,
    email,
    password,
    name,
    role,
    ...data,
  };
  registeredUsers.push(newUser as User);
  return { success: true };
}
