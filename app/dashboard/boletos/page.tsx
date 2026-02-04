"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function BoletosPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== "admin") {
      router.replace("/dashboard");
    }
  }, [user, router]);

  if (!user || user.role !== "admin") return null;
  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-2">Boletos</h1>
      <p className="text-gray-400 mb-8">
        Em breve você poderá gerenciar os boletos aqui.
      </p>
      <div className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] p-8 text-center">
        <p className="text-gray-500">Conteúdo em construção...</p>
      </div>
    </div>
  );
}
