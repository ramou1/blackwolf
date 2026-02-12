"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import LinksInternos from "@/components/LinksInternos";

export default function DashboardPage() {
  const { user } = useAuth();
  const router = useRouter();

  const firstName = user?.name?.split(" ")[0] || user?.name || "Usuário";

  return (
    <div>
      <h1 className="text-2xl font-semibold text-white mb-2">
        Olá, {firstName}!
      </h1>
      <p className="text-gray-400 mb-8">
        Bem-vindo à área interna. Use os cards abaixo para navegar.
      </p>

      <LinksInternos />
    </div>
  );
}
