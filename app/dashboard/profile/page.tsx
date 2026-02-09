"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserProfile } from "@/lib/firebaseAuth";
import type { FirestoreUserDoc } from "@/lib/types";
import { User } from "lucide-react";

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<FirestoreUserDoc | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    getUserProfile(user.id)
      .then(setProfile)
      .finally(() => setLoading(false));
  }, [user?.id, isAuthenticated]);

  if (!user) return null;

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
        <User className="w-8 h-8 text-[#1179a6]" />
        <h1 className="text-2xl font-semibold text-white">Meu Perfil</h1>
      </div>

      {loading ? (
        <div className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] p-12 text-center text-gray-400">
          Carregando perfil...
        </div>
      ) : (
        <div className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] p-6 max-w-2xl">
          <div className="space-y-6">
            <div>
              <span className="text-gray-500 text-sm block mb-1">Nome</span>
              <span className="text-white">{profile?.name || user.name || "—"}</span>
            </div>
            <div>
              <span className="text-gray-500 text-sm block mb-1">E-mail</span>
              <span className="text-white">{profile?.email || user.email || "—"}</span>
            </div>
            <div>
              <span className="text-gray-500 text-sm block mb-1">País</span>
              <span className="text-white">{profile?.country || "—"}</span>
            </div>
            <div>
              <span className="text-gray-500 text-sm block mb-1">Cidade</span>
              <span className="text-white">{profile?.city || "—"}</span>
            </div>
            <div>
              <span className="text-gray-500 text-sm block mb-1">Telefone</span>
              <span className="text-white">{profile?.phone || "—"}</span>
            </div>
            <div>
              <span className="text-gray-500 text-sm block mb-1">Documento</span>
              <span className="text-white">{profile?.document || "—"}</span>
            </div>
            <div>
              <span className="text-gray-500 text-sm block mb-1">Tipo de usuário</span>
              <span className="text-white">{profile?.userType || "—"}</span>
            </div>
            <div>
              <span className="text-gray-500 text-sm block mb-1">Plano</span>
              <span className="text-white">{profile?.plan || "—"}</span>
            </div>
            <div>
              <span className="text-gray-500 text-sm block mb-1">Forma de pagamento</span>
              <span className="text-white capitalize">{profile?.payment?.method || "—"}</span>
            </div>
            {profile?.payment?.method === "transferencia" && (
              <>
                <div>
                  <span className="text-gray-500 text-sm block mb-1">Banco</span>
                  <span className="text-white">{profile.payment.bank || "—"}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm block mb-1">Agência</span>
                  <span className="text-white">{profile.payment.agency || "—"}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-sm block mb-1">Conta</span>
                  <span className="text-white">{profile.payment.account || "—"}</span>
                </div>
              </>
            )}
            <div>
              <span className="text-gray-500 text-sm block mb-1">Cadastrado em</span>
              <span className="text-gray-300">{formatDate(profile?.createdAt)}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
