"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { getUserProfile, updateUserProfile } from "@/lib/firebaseAuth";
import type { FirestoreUserDoc } from "@/lib/types";
import { PAISES, PLANOS_NEGOCIO, PLANOS_PATROCINADOR } from "@/lib/constants";
import { useTranslations } from "@/context/LanguageContext";
import { User, Pencil, X, Check } from "lucide-react";

const inputClass =
  "w-full px-4 py-2.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1179a6] focus:border-transparent";

export default function ProfilePage() {
  const { user, isAuthenticated } = useAuth();
  const tr = useTranslations();
  const [profile, setProfile] = useState<FirestoreUserDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    country: "",
    city: "",
    phone: "",
    document: "",
    bank: "",
    agency: "",
    account: "",
  });

  useEffect(() => {
    if (!isAuthenticated || !user) return;
    getUserProfile(user.id)
      .then((p) => {
        setProfile(p);
        if (p) {
          setFormData({
            name: p.name || "",
            country: p.country || "",
            city: p.city || "",
            phone: p.phone || "",
            document: p.document || "",
            bank: p.payment?.bank || "",
            agency: p.payment?.agency || "",
            account: p.payment?.account || "",
          });
        }
      })
      .finally(() => setLoading(false));
  }, [user?.id, isAuthenticated]);

  const handleSave = async () => {
    if (!user || !profile) return;
    setSaving(true);
    setError(null);
    const result = await updateUserProfile(user.id, formData, profile);
    setSaving(false);
    if (result.success) {
      setProfile({
        ...profile,
        name: formData.name,
        country: formData.country || null,
        city: formData.city || null,
        phone: formData.phone || null,
        document: formData.document || null,
        payment: profile.payment?.method === "transferencia"
          ? {
              ...profile.payment,
              bank: formData.bank || null,
              agency: formData.agency || null,
              account: formData.account || null,
            }
          : profile.payment,
      });
      setEditing(false);
    } else {
      setError(result.error);
    }
  };

  const handleCancel = () => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        country: profile.country || "",
        city: profile.city || "",
        phone: profile.phone || "",
        document: profile.document || "",
        bank: profile.payment?.bank || "",
        agency: profile.payment?.agency || "",
        account: profile.payment?.account || "",
      });
    }
    setEditing(false);
    setError(null);
  };

  const getUserTypeLabel = (userType?: string | null) => {
    if (!userType) return "—";
    const tipos = tr.cadastroTipos as Record<string, string>;
    return tipos[userType] || userType;
  };

  const getPaymentMethodLabel = (method?: string | null) => {
    if (!method) return "—";
    if (method === "boleto") return "Boleto";
    if (method === "transferencia") return "Transferência";
    return method;
  };

  const getPlanLabel = (planId?: string | null) => {
    if (!planId) return "—";
    const pn = PLANOS_NEGOCIO.find((p) => p.id === planId);
    if (pn) return pn.nome;
    const pp = PLANOS_PATROCINADOR.find((p) => p.id === planId);
    if (pp) return pp.nome;
    return planId;
  };

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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <User className="w-8 h-8 text-[#1179a6]" />
          <h1 className="text-2xl font-semibold text-white">Meu Perfil</h1>
        </div>
        {!loading && profile && !editing && (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1179a6] hover:bg-[#1179a6]/90 text-white text-sm font-medium transition-colors"
          >
            <Pencil className="w-4 h-4" />
            Editar
          </button>
        )}
      </div>

      {loading ? (
        <div className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] p-12 text-center text-gray-400">
          Carregando perfil...
        </div>
      ) : (
        <div className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] p-6 max-w-2xl">
          {error && (
            <div className="mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
              {error}
            </div>
          )}
          <div className="space-y-6">
            {/* Nome - editável */}
            <div>
              <span className="text-gray-500 text-sm block mb-1">Nome</span>
              {editing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={inputClass}
                  placeholder="Seu nome"
                />
              ) : (
                <span className="text-white">{profile?.name || user.name || "—"}</span>
              )}
            </div>

            {/* E-mail - NÃO editável */}
            <div>
              <span className="text-gray-500 text-sm block mb-1">E-mail</span>
              <span className="text-white">{profile?.email || user.email || "—"}</span>
            </div>

            {/* País - editável */}
            <div>
              <span className="text-gray-500 text-sm block mb-1">País</span>
              {editing ? (
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className={inputClass}
                >
                  <option value="">Selecione o país</option>
                  {PAISES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              ) : (
                <span className="text-white">{profile?.country || "—"}</span>
              )}
            </div>

            {/* Cidade - editável */}
            <div>
              <span className="text-gray-500 text-sm block mb-1">Cidade</span>
              {editing ? (
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className={inputClass}
                  placeholder="Sua cidade"
                />
              ) : (
                <span className="text-white">{profile?.city || "—"}</span>
              )}
            </div>

            {/* Telefone - editável */}
            <div>
              <span className="text-gray-500 text-sm block mb-1">Telefone</span>
              {editing ? (
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={inputClass}
                  placeholder="Seu telefone"
                />
              ) : (
                <span className="text-white">{profile?.phone || "—"}</span>
              )}
            </div>

            {/* Documento - editável */}
            <div>
              <span className="text-gray-500 text-sm block mb-1">Documento</span>
              {editing ? (
                <input
                  type="text"
                  value={formData.document}
                  onChange={(e) => setFormData({ ...formData, document: e.target.value })}
                  className={inputClass}
                  placeholder="CPF / CNPJ / ID / Passaporte"
                />
              ) : (
                <span className="text-white">{profile?.document || "—"}</span>
              )}
            </div>

            {/* Tipo de usuário - apenas exibição (não editável) */}
            <div>
              <span className="text-gray-500 text-sm block mb-1">Tipo de usuário</span>
              <span className="text-white">{getUserTypeLabel(profile?.userType)}</span>
            </div>

            {/* Plano - NÃO editável */}
            <div>
              <span className="text-gray-500 text-sm block mb-1">Plano</span>
              <span className="text-white">{getPlanLabel(profile?.plan)}</span>
            </div>

            {/* Forma de pagamento - NÃO editável */}
            <div>
              <span className="text-gray-500 text-sm block mb-1">Forma de pagamento</span>
              <span className="text-white">{getPaymentMethodLabel(profile?.payment?.method)}</span>
            </div>

            {/* Dados bancários - editáveis se transferência */}
            {profile?.payment?.method === "transferencia" && (
              <>
                <div>
                  <span className="text-gray-500 text-sm block mb-1">Banco</span>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.bank}
                      onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
                      className={inputClass}
                      placeholder="Nome do banco"
                    />
                  ) : (
                    <span className="text-white">{profile.payment.bank || "—"}</span>
                  )}
                </div>
                <div>
                  <span className="text-gray-500 text-sm block mb-1">Agência</span>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.agency}
                      onChange={(e) => setFormData({ ...formData, agency: e.target.value })}
                      className={inputClass}
                      placeholder="Agência"
                    />
                  ) : (
                    <span className="text-white">{profile.payment.agency || "—"}</span>
                  )}
                </div>
                <div>
                  <span className="text-gray-500 text-sm block mb-1">Conta</span>
                  {editing ? (
                    <input
                      type="text"
                      value={formData.account}
                      onChange={(e) => setFormData({ ...formData, account: e.target.value })}
                      className={inputClass}
                      placeholder="Conta"
                    />
                  ) : (
                    <span className="text-white">{profile.payment.account || "—"}</span>
                  )}
                </div>
              </>
            )}

            {/* Cadastrado em - NÃO editável */}
            <div>
              <span className="text-gray-500 text-sm block mb-1">Cadastrado em</span>
              <span className="text-gray-300">{formatDate(profile?.createdAt)}</span>
            </div>

            {editing && (
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-green-600 hover:bg-green-500 disabled:opacity-60 text-white font-medium transition-colors"
                >
                  <Check className="w-4 h-4" />
                  {saving ? "Salvando..." : "Salvar"}
                </button>
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-[#2A2A2A] hover:bg-[#2A2A2A] text-gray-300 font-medium transition-colors"
                >
                  <X className="w-4 h-4" />
                  Cancelar
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
