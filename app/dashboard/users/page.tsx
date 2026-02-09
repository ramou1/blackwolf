"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getAllUsers } from "@/lib/firebaseUsers";
import type { UserWithId } from "@/lib/types";
import { Users as UsersIcon } from "lucide-react";

export default function UsersPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<UserWithId[]>([]);
  const [loading, setLoading] = useState(true);

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
                  <th className="px-4 py-3 text-gray-400 font-medium text-sm">País</th>
                  <th className="px-4 py-3 text-gray-400 font-medium text-sm">Cidade</th>
                  <th className="px-4 py-3 text-gray-400 font-medium text-sm">Documento</th>
                  <th className="px-4 py-3 text-gray-400 font-medium text-sm">Tipo</th>
                  <th className="px-4 py-3 text-gray-400 font-medium text-sm">Plano</th>
                  <th className="px-4 py-3 text-gray-400 font-medium text-sm">Pagamento</th>
                  <th className="px-4 py-3 text-gray-400 font-medium text-sm">Banco</th>
                  <th className="px-4 py-3 text-gray-400 font-medium text-sm">Agência</th>
                  <th className="px-4 py-3 text-gray-400 font-medium text-sm">Conta</th>
                  <th className="px-4 py-3 text-gray-400 font-medium text-sm">Cadastro</th>
                </tr>
              </thead>
              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan={12} className="px-4 py-8 text-center text-gray-500">
                      Nenhum usuário cadastrado.
                    </td>
                  </tr>
                ) : (
                  users.map((u) => (
                    <tr key={u.id} className="border-b border-[#2A2A2A] hover:bg-[#222]">
                      <td className="px-4 py-3 text-white">{u.name || "—"}</td>
                      <td className="px-4 py-3 text-gray-300">{u.email || "—"}</td>
                      <td className="px-4 py-3 text-gray-300">{u.country || "—"}</td>
                      <td className="px-4 py-3 text-gray-300">{u.city || "—"}</td>
                      <td className="px-4 py-3 text-gray-300">{u.document || "—"}</td>
                      <td className="px-4 py-3 text-gray-300">{u.userType || "—"}</td>
                      <td className="px-4 py-3 text-gray-300">{u.plan || "—"}</td>
                      <td className="px-4 py-3 text-gray-300">{u.payment?.method || "—"}</td>
                      <td className="px-4 py-3 text-gray-300">{u.payment?.bank || "—"}</td>
                      <td className="px-4 py-3 text-gray-300">{u.payment?.agency || "—"}</td>
                      <td className="px-4 py-3 text-gray-300">{u.payment?.account || "—"}</td>
                      <td className="px-4 py-3 text-gray-400 text-sm">{formatDate(u.createdAt)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
