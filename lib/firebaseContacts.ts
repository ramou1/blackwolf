"use client";

import { collection, addDoc } from "firebase/firestore";
import { db, isFirebaseReady } from "./firebase";

const CONTACTS_COLLECTION = "contacts";

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function saveContact(data: ContactFormData): Promise<{ success: true } | { success: false; error: string }> {
  if (!isFirebaseReady || !db) {
    return { success: false, error: "Firebase não está configurado." };
  }

  try {
    await addDoc(collection(db, CONTACTS_COLLECTION), {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      createdAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (err: unknown) {
    const error = err as { message?: string };
    return {
      success: false,
      error: error.message || "Erro ao enviar mensagem.",
    };
  }
}
