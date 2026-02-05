"use client";

import { useTranslations } from "@/context/LanguageContext";

export default function Contato() {
  const tr = useTranslations();

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
          <form className="space-y-6">
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
                className="w-full px-4 py-3 bg-[#1A1A1A]/50 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 text-white placeholder-gray-500 resize-none"
                placeholder={tr.contato.mensagemPlaceholder}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#1179a6] hover:bg-[#1179a6]/90 text-white font-sans font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              {tr.contato.enviar}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

