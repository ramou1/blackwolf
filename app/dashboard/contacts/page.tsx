"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getAllContacts, markContactAsResponded } from "@/lib/firebaseContacts";
import type { ContactDoc } from "@/lib/firebaseContacts";
import { MessageSquare, Check } from "lucide-react";

export default function ContactsPage() {
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [contacts, setContacts] = useState<ContactDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated) router.replace("/");
  }, [isAuthenticated, router]);

  useEffect(() => {
    if (user?.role === "admin") {
      loadContacts();
    } else {
      setLoading(false);
    }
  }, [user?.role]);

  const loadContacts = () => {
    getAllContacts().then(setContacts).finally(() => setLoading(false));
  };

  const handleMarkResponded = async (id: string) => {
    setUpdatingId(id);
    const result = await markContactAsResponded(id);
    setUpdatingId(null);
    if (result.success) {
      setContacts((prev) =>
        prev.map((c) =>
          c.id === id ? { ...c, responded: true } : c
        )
      );
    }
  };

  const formatDate = (iso?: string) => {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!user) return null;

  if (user.role !== "admin") {
    router.replace("/dashboard");
    return null;
  }

  return (
    <div>
      <div className="flex items-center gap-3 mb-6">
        <MessageSquare className="w-8 h-8 text-[#1179a6]" />
        <h1 className="text-2xl font-semibold text-white">Contatos</h1>
      </div>

      {loading ? (
        <div className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] p-12 text-center text-gray-400">
          Carregando contatos...
        </div>
      ) : (
        <div className="space-y-3">
          {contacts.length === 0 ? (
            <div className="rounded-lg border border-[#2A2A2A] bg-[#1A1A1A] p-12 text-center text-gray-500">
              Nenhum contato recebido ainda.
            </div>
          ) : (
            contacts.map((c) => (
              <div
                key={c.id}
                className={`rounded-lg border bg-[#1A1A1A] overflow-hidden ${
                  c.responded ? "border-[#2A2A2A]" : "border-[#1179a6]/50"
                }`}
              >
                <button
                  onClick={() =>
                    setExpandedId(expandedId === c.id ? null : c.id)
                  }
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-[#222] transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white truncate">{c.name}</p>
                      <p className="text-sm text-gray-400 truncate">{c.email}</p>
                    </div>
                    <span className="text-sm text-gray-500 shrink-0">
                      {formatDate(c.createdAt)}
                    </span>
                    {c.responded && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs bg-green-500/20 text-green-400 shrink-0">
                        <Check className="w-3 h-3" />
                        Respondido
                      </span>
                    )}
                  </div>
                </button>

                {expandedId === c.id && (
                  <div className="px-6 pb-6 pt-0 border-t border-[#2A2A2A]">
                    <div className="mt-4 space-y-3">
                      <div>
                        <span className="text-gray-500 text-sm block mb-1">
                          Nome
                        </span>
                        <span className="text-white">{c.name}</span>
                      </div>
                      <div>
                        <span className="text-gray-500 text-sm block mb-1">
                          E-mail
                        </span>
                        <a
                          href={`mailto:${c.email}`}
                          className="text-[#1179a6] hover:underline"
                        >
                          {c.email}
                        </a>
                      </div>
                      {c.phone && (
                        <div>
                          <span className="text-gray-500 text-sm block mb-1">
                            Telefone
                          </span>
                          <a
                            href={`tel:${c.phone}`}
                            className="text-[#1179a6] hover:underline"
                          >
                            {c.phone}
                          </a>
                        </div>
                      )}
                      <div>
                        <span className="text-gray-500 text-sm block mb-1">
                          Mensagem
                        </span>
                        <p className="text-gray-300 whitespace-pre-wrap">
                          {c.message}
                        </p>
                      </div>
                      {!c.responded && (
                        <button
                          onClick={() => handleMarkResponded(c.id)}
                          disabled={updatingId === c.id}
                          className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 text-white text-sm font-medium disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
                        >
                          <Check className="w-4 h-4" />
                          {updatingId === c.id
                            ? "Salvando..."
                            : "Marcar como respondido"}
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
