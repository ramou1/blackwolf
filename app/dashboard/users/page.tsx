"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "@/context/LanguageContext";
import { getAllUsers } from "@/lib/firebaseUsers";
import type { UserWithId } from "@/lib/types";
import { Users as UsersIcon, X } from "lucide-react";
import { PLANOS_NEGOCIO, PLANOS_PATROCINADOR } from "@/lib/constants";

function getPlanLabel(planId: string | null | undefined): string {
  if (!planId) return "—";
  const fromNegocio = PLANOS_NEGOCIO.find((p) => p.id === planId);
  if (fromNegocio) return fromNegocio.nome;
  const fromPatrocinador = PLANOS_PATROCINADOR.find((p) => p.id === planId);
  if (fromPatrocinador) return fromPatrocinador.nome;
  return planId;
}

export default function UsersPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const tr = useTranslations();
  const [users, setUsers] = useState<UserWithId[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserWithId | null>(null);

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (user?.role === "admin") {
      getAllUsers()
        .then(setUsers)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [user?.role]);

  if (!user) return null;

  if (user.role !== "admin") {
    router.replace("/dashboard");
    return null;
  }

  const formatDate = (iso?: string) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const getUserTypeLabel = (userType?: string | null) => {
    if (!userType) return "—";
    const key = userType as keyof typeof tr.cadastroTipos;
    return tr.cadastroTipos[key] ?? userType;
  };

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <UsersIcon className="w-8 h-8 text-[#1179a6]" />
        <h1 className="text-2xl font-semibold text-white">Usuários</h1>
      </div>

      {loading ? (
        <div className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] p-12 text-center text-gray-400">
          Carregando usuários...
        </div>
      ) : (
        <div className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-[#2A2A2A]">
                  <th className="px-4 py-3 text-gray-400 font-medium text-sm">Nome</th>
                  <th className="px-4 py-3 text-gray-400 font-medium text-sm">E-mail</th>
                  <th className="px-4 py-3 text-gray-400 font-medium text-sm">Telefone</th>
                  <th className="px-4 py-3 text-gray-400 font-medium text-sm">País</th>
                  <th className="px-4 py-3 text-gray-400 font-medium text-sm">Cidade</th>
                  <th className="px-4 py-3 text-gray-400 font-medium text-sm">Documento</th>
                  <th className="px-4 py-3 text-gray-400 font-medium text-sm">Tipo</th>
                  <th className="px-4 py-3 text-gray-400 font-medium text-sm">Plano</th>
                  <th className="px-4 py-3 text-gray-400 font-medium text-sm">Cadastro</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                      Nenhum usuário cadastrado.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr
                      key={u.id}
                      onClick={() => setSelectedUser(u)}
                      className="border-b border-[#2A2A2A] hover:bg-[#222] cursor-pointer transition-colors"
                    >
                      <td className="px-4 py-3 text-white">{u.name || "—"}</td>
                      <td className="px-4 py-3 text-gray-300">{u.email || "—"}</td>
                      <td className="px-4 py-3 text-gray-300">{u.phone || "—"}</td>
                      <td className="px-4 py-3 text-gray-300">{u.country || "—"}</td>
                      <td className="px-4 py-3 text-gray-300">{u.city || "—"}</td>
                      <td className="px-4 py-3 text-gray-300">{u.document || "—"}</td>
                      <td className="px-4 py-3 text-gray-300">{getUserTypeLabel(u.userType)}</td>
                      <td className="px-4 py-3 text-gray-300">{getPlanLabel(u.plan)}</td>
                      <td className="px-4 py-3 text-gray-400 text-sm">{formatDate(u.createdAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal do usuário */}
      {selectedUser && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60"
          onClick={() => setSelectedUser(null)}
        >
          <div
            className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl max-w-md w-full shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#2A2A2A]">
              <h2 className="text-lg font-semibold text-white">{selectedUser.name || "Usuário"}</h2>
              <button
                type="button"
                onClick={() => setSelectedUser(null)}
                className="p-2 rounded-lg text-gray-400 hover:bg-[#2A2A2A] hover:text-white transition-colors"
                aria-label="Fechar"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <span className="text-gray-500 text-sm block">E-mail</span>
                <span className="text-white">{selectedUser.email || "—"}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm block">Telefone</span>
                <span className="text-white">{selectedUser.phone || "—"}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm block">País</span>
                <span className="text-white">{selectedUser.country || "—"}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm block">Cidade</span>
                <span className="text-white">{selectedUser.city || "—"}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm block">Documento</span>
                <span className="text-white">{selectedUser.document || "—"}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm block">Tipo de usuário</span>
                <span className="text-white">{getUserTypeLabel(selectedUser.userType)}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm block">Plano</span>
                <span className="text-white">{getPlanLabel(selectedUser.plan)}</span>
              </div>
              <div>
                <span className="text-gray-500 text-sm block">Data de cadastro</span>
                <span className="text-white">{formatDate(selectedUser.createdAt)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
