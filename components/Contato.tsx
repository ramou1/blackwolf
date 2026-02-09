"use client";

import { useState, FormEvent } from "react";
import { useTranslations } from "@/context/LanguageContext";
import { saveContact } from "@/lib/firebaseContacts";

export default function Contato() {
  const tr = useTranslations();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);

    const result = await saveContact({ name, email, subject, message });

    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setName("");
      setEmail("");
      setSubject("");
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
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-300 mb-2">
                  {tr.contato.nome}
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1A1A1A]/50 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 text-white placeholder-gray-500"
                  placeholder={tr.contato.nomePlaceholder}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  {tr.contato.email}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-[#1A1A1A]/50 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 text-white placeholder-gray-500"
                  placeholder="seu@email.com"
                />
              </div>
            </div>
            <div>
              <label htmlFor="assunto" className="block text-sm font-medium text-gray-300 mb-2">
                {tr.contato.assunto}
              </label>
              <input
                type="text"
                id="assunto"
                name="assunto"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-4 py-3 bg-[#1A1A1A]/50 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 text-white placeholder-gray-500"
                placeholder={tr.contato.assuntoPlaceholder}
              />
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
                value={message}
                onChange={(e) => setMessage(e.target.value)}
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

