"use client";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db, isFirebaseReady } from "./firebase";
import { validateLogin, registerUser } from "./mockUsers";
import type { LoggedInUser } from "./mockUsers";

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  telefone?: string;
  pais?: string;
  cidade?: string;
  documento?: string;
  tipoUsuario?: string;
  plano?: string;
  formaPagamento?: "boleto" | "transferencia";
  documentoBoleto?: string;
  banco?: string;
  agencia?: string;
  conta?: string;
  swift?: string;
  iban?: string;
}

const USERS_COLLECTION = "users";

function firebaseUserToLoggedIn(firebaseUser: FirebaseUser, userData: Record<string, unknown>): LoggedInUser {
  return {
    id: firebaseUser.uid,
    email: firebaseUser.email || "",
    name: (userData.name as string) || firebaseUser.displayName || "Usuário",
    role: (userData.role as "admin" | "user") || "user",
    avatarUrl: userData.avatarUrl as string | undefined,
  };
}

export async function registerWithFirebase(
  data: RegisterData
): Promise<{ success: true; user: LoggedInUser } | { success: false; error: string }> {
  // Fallback para mock quando Firebase não está configurado
  if (!isFirebaseReady || !auth || !db) {
    const result = registerUser(data);
    if (result.success) {
      const mockUser = validateLogin(data.email, data.password);
      if (mockUser) {
        const { password: _, ...safeUser } = mockUser;
        return { success: true, user: safeUser as LoggedInUser };
      }
    }
    return { success: false, error: result.error || "Erro ao criar conta." };
  }

  try {
    const { user } = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password
    );

    const userDoc = {
      email: data.email,
      name: data.name,
      role: "user",
      telefone: data.telefone || null,
      pais: data.pais || null,
      cidade: data.cidade || null,
      documento: data.documento || null,
      tipoUsuario: data.tipoUsuario || null,
      plano: data.plano || null,
      formaPagamento: data.formaPagamento || null,
      documentoBoleto: data.documentoBoleto || null,
      banco: data.banco || null,
      agencia: data.agencia || null,
      conta: data.conta || null,
      swift: data.swift || null,
      iban: data.iban || null,
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, USERS_COLLECTION, user.uid), userDoc);

    return {
      success: true,
      user: firebaseUserToLoggedIn(user, userDoc),
    };
  } catch (err: unknown) {
    const error = err as { code?: string; message?: string };
    if (error.code === "auth/email-already-in-use") {
      return { success: false, error: "EMAIL_IN_USE" };
    }
    if (error.code === "auth/weak-password") {
      return { success: false, error: "Senha muito fraca. Use pelo menos 6 caracteres." };
    }
    return {
      success: false,
      error: error.message || "Erro ao criar conta.",
    };
  }
}

export async function loginWithFirebase(
  email: string,
  password: string
): Promise<{ success: true; user: LoggedInUser } | { success: false; error: string }> {
  // Fallback para mock quando Firebase não está configurado
  if (!isFirebaseReady || !auth || !db) {
    const found = validateLogin(email, password);
    if (found) {
      const { password: _, ...safeUser } = found;
      return { success: true, user: safeUser as LoggedInUser };
    }
    return { success: false, error: "Credenciais inválidas." };
  }

  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);

    const userDocRef = doc(db, USERS_COLLECTION, user.uid);
    const userDocSnap = await getDoc(userDocRef);
    const userData = userDocSnap.exists() ? userDocSnap.data() : {};

    return {
      success: true,
      user: firebaseUserToLoggedIn(user, userData),
    };
  } catch (err: unknown) {
    const error = err as { code?: string; message?: string };
    if (error.code === "auth/invalid-credential" || error.code === "auth/wrong-password" || error.code === "auth/user-not-found") {
      return { success: false, error: "Credenciais inválidas." };
    }
    return {
      success: false,
      error: error.message || "Erro ao fazer login.",
    };
  }
}

export async function logoutFirebase(): Promise<void> {
  if (auth && isFirebaseReady) {
    await signOut(auth);
  }
}

export function onAuthChange(callback: (user: LoggedInUser | null) => void): (() => void) {
  if (!isFirebaseReady || !auth || !db) {
    callback(null);
    return () => {};
  }

  return onAuthStateChanged(auth, async (firebaseUser) => {
    if (!firebaseUser) {
      callback(null);
      return;
    }

    try {
      const userDocRef = doc(db, USERS_COLLECTION, firebaseUser.uid);
      const userDocSnap = await getDoc(userDocRef);
      const userData = userDocSnap.exists() ? userDocSnap.data() : {};

      callback(firebaseUserToLoggedIn(firebaseUser, userData));
    } catch {
      callback({
        id: firebaseUser.uid,
        email: firebaseUser.email || "",
        name: firebaseUser.displayName || "Usuário",
        role: "user",
      });
    }
  });
}
