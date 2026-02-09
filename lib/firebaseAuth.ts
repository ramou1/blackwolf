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
import type { LoggedInUser, FirestoreUserDoc } from "./types";

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
  if (!isFirebaseReady || !auth || !db) {
    return { success: false, error: "Firebase não está configurado. Configure as credenciais em lib/firebase/config.ts" };
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
      document: data.documento || null,
      city: data.cidade || null,
      country: data.pais || null,
      phone: data.telefone || null,
      userType: data.tipoUsuario || null,
      plan: data.plano || null,
      createdAt: new Date().toISOString(),
      payment: {
        method: data.formaPagamento || null,
        boletoDocument: data.formaPagamento === "boleto" ? data.documentoBoleto || null : null,
        bank: data.banco || null,
        agency: data.agencia || null,
        account: data.conta || null,
        swift: data.swift || null,
        iban: data.iban || null,
      },
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
  if (!isFirebaseReady || !auth || !db) {
    return { success: false, error: "Firebase não está configurado. Configure as credenciais em lib/firebase/config.ts" };
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

  const firestore = db;
  const authInstance = auth;

  return onAuthStateChanged(authInstance, async (firebaseUser) => {
    if (!firebaseUser) {
      callback(null);
      return;
    }

    try {
      const userDocRef = doc(firestore, USERS_COLLECTION, firebaseUser.uid);
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

export async function getUserProfile(userId: string): Promise<FirestoreUserDoc | null> {
  if (!isFirebaseReady || !db) return null;
  const snap = await getDoc(doc(db, USERS_COLLECTION, userId));
  return snap.exists() ? (snap.data() as FirestoreUserDoc) : null;
}
