"use client";

import { collection, addDoc, getDocs, doc, updateDoc, orderBy, query } from "firebase/firestore";
import { db, isFirebaseReady } from "./firebase";

const CONTACTS_COLLECTION = "contacts";

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ContactDoc {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
  responded: boolean;
}

export async function saveContact(data: ContactFormData): Promise<{ success: true } | { success: false; error: string }> {
  if (!isFirebaseReady || !db) {
    return { success: false, error: "Firebase não está configurado." };
  }

  try {
    await addDoc(collection(db, CONTACTS_COLLECTION), {
      name: data.name,
      email: data.email,
      phone: data.phone || "",
      message: data.message,
      responded: false,
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

export async function getAllContacts(): Promise<ContactDoc[]> {
  if (!isFirebaseReady || !db) return [];
  const q = query(
    collection(db, CONTACTS_COLLECTION),
    orderBy("createdAt", "desc")
  );
  const snap = await getDocs(q);
  return snap.docs.map((d) => {
    const data = d.data();
    return {
      id: d.id,
      name: data.name ?? "",
      email: data.email ?? "",
      phone: data.phone ?? "",
      message: data.message ?? "",
      createdAt: data.createdAt ?? "",
      responded: data.responded ?? false,
    } as ContactDoc;
  });
}

export async function markContactAsResponded(
  contactId: string
): Promise<{ success: true } | { success: false; error: string }> {
  if (!isFirebaseReady || !db) {
    return { success: false, error: "Firebase não está configurado." };
  }

  try {
    await updateDoc(doc(db, CONTACTS_COLLECTION, contactId), {
      responded: true,
      respondedAt: new Date().toISOString(),
    });
    return { success: true };
  } catch (err: unknown) {
    const error = err as { message?: string };
    return {
      success: false,
      error: error.message || "Erro ao atualizar.",
    };
  }
}
