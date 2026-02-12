"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

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
        Bem-vindo à área interna. Use o menu lateral para navegar.
      </p>

      {user?.role === "admin" ? (
        <div className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] p-6">
          <h2 className="text-lg font-medium text-white mb-2">Painel Administrativo</h2>
          <p className="text-gray-400 text-sm mb-2">
            Use o menu lateral para acessar:
          </p>
          <ul className="text-gray-400 text-sm list-disc list-inside space-y-1">
            <li><strong>Boletos</strong> – gerenciar boletos do sistema</li>
            <li><strong>Usuários</strong> – visualizar tabela com todos os usuários cadastrados</li>
            <li><strong>Contatos</strong> – mensagens do formulário "Entre em contato"</li>
            <li><strong>Perfil</strong> – seus dados básicos</li>
          </ul>
        </div>
      ) : (
        <div className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] p-6">
          <h2 className="text-lg font-medium text-white mb-2">Área do usuário</h2>
          <p className="text-gray-400 text-sm">
            Logo entraremos em contato para sua jornada de evolução.
          </p>
        </div>
      )}
    </div>
  );
}
