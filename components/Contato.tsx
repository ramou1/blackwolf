"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "@/context/LanguageContext";
import { saveContact } from "@/lib/firebaseContacts";

// Sanitiza para permitir apenas letras (incl. acentuadas), números e espaços
function sanitizeName(value: string): string {
  return value.replace(/[^\p{L}\p{N}\s]/gu, "").slice(0, 40);
}

// Sanitiza para permitir apenas caracteres válidos de email
function sanitizeEmail(value: string): string {
  return value.replace(/[^\w@.\-+]/g, "").slice(0, 30);
}

// Sanitiza para permitir apenas números e símbolos de telefone
function sanitizePhone(value: string): string {
  return value.replace(/[^\d+\-()\s]/g, "").slice(0, 20);
}

// Sanitiza para permitir apenas texto, números e pontuação básica (sem emojis)
function sanitizeMessage(value: string): string {
  return value
    .replace(/[^\p{L}\p{N}\s.,!?\-:;'"()\n\r]/gu, "")
    .slice(0, 150);
}

const MAX_NAME = 40;
const MAX_EMAIL = 30;
const MAX_PHONE = 20;
const MAX_MESSAGE = 150;

export default function Contato() {
  const tr = useTranslations();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const phone = [phoneCountryCode.trim(), phoneNumber.trim()].filter(Boolean).join(" ") || "";
    const result = await saveContact({ name, email, phone, message });

    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setName("");
      setEmail("");
      setPhoneCountryCode("");
      setPhoneNumber("");
      setMessage("");
    } else {
      setError(result.error);
    }
  };

  return (
    <section id="contato" className="py-20 bg-[#0F0F0F] scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-sans font-bold mb-4">
            {tr.contato.title} <span className="text-[#1179a6]">{tr.contato.titleHighlight}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {tr.contato.subtitle}
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-6">
            {success && (
              <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 text-sm">
                Mensagem enviada com sucesso! Entraremos em contato em breve.
              </div>
            )}
            {error && (
              <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-300 mb-2">
                {tr.contato.nome}
              </label>
              <input
                type="text"
                id="nome"
                name="nome"
                required
                maxLength={MAX_NAME}
                value={name}
                onChange={(e) => setName(sanitizeName(e.target.value))}
                className="w-full px-4 py-3 bg-[#1A1A1A]/50 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 text-white placeholder-gray-500"
                placeholder={tr.contato.nomePlaceholder}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  {tr.contato.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  maxLength={MAX_EMAIL}
                  value={email}
                  onChange={(e) => setEmail(sanitizeEmail(e.target.value))}
                  className="w-full px-4 py-3 bg-[#1A1A1A]/50 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 text-white placeholder-gray-500"
                  placeholder="seu@email.com"
                />
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-300 mb-2">
                  {tr.contato.telefone}
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="telefone-codigo" className="sr-only">
                      {tr.contato.codigoPais}
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      id="telefone-codigo"
                      name="telefone-codigo"
                      maxLength={3}
                      value={phoneCountryCode}
                      onChange={(e) =>
                        setPhoneCountryCode(e.target.value.replace(/\D/g, "").slice(0, 3))
                      }
                      className="w-full px-4 py-3 bg-[#1A1A1A]/50 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 text-white placeholder-gray-500"
                      placeholder={tr.contato.codigoPaisPlaceholder}
                    />
                  </div>
                  <div>
                    <label htmlFor="telefone" className="sr-only">
                      {tr.contato.areaNumero}
                    </label>
                    <input
                      type="tel"
                      inputMode="numeric"
                      id="telefone"
                      name="telefone"
                      maxLength={20}
                      value={phoneNumber}
                      onChange={(e) =>
                        setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 20))
                      }
                      className="w-full px-4 py-3 bg-[#1A1A1A]/50 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 text-white placeholder-gray-500"
                      placeholder={tr.contato.areaNumeroPlaceholder}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="mensagem" className="block text-sm font-medium text-gray-300 mb-2">
                {tr.contato.mensagem}
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows={6}
                required
                maxLength={MAX_MESSAGE}
                value={message}
                onChange={(e) => setMessage(sanitizeMessage(e.target.value))}
                className="w-full px-4 py-3 bg-[#1A1A1A]/50 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 text-white placeholder-gray-500 resize-none"
                placeholder={tr.contato.mensagemPlaceholder}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1179a6] hover:bg-[#1179a6]/90 disabled:opacity-60 disabled:cursor-not-allowed text-white font-sans font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              {loading ? "Enviando..." : tr.contato.enviar}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
