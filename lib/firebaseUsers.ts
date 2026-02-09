"use client";

import { collection, getDocs } from "firebase/firestore";
import { db, isFirebaseReady } from "./firebase";
import type { UserWithId } from "./types";

const USERS_COLLECTION = "users";

export async function getAllUsers(): Promise<UserWithId[]> {
  if (!isFirebaseReady || !db) return [];
  const snap = await getDocs(collection(db, USERS_COLLECTION));
  return snap.docs.map((d) => ({ id: d.id, ...d.data() } as UserWithId));
}
