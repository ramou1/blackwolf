"use client";

import { Zap, Eye, Heart } from "lucide-react";
import { useTranslations } from "@/context/LanguageContext";

export default function Sobre() {
  const tr = useTranslations();

  return (
    <section id="sobre" className="py-20 bg-[#1A1A1A]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-sans font-bold mb-4">
            {tr.sobre.title} <span className="text-[#1179a6]">Blackwolf</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {tr.sobre.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-[#0F0F0F]/50 p-8 rounded-2xl border border-gray-800/50 hover:border-gray-700 transition-all">
            <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-2xl font-sans font-bold mb-4 text-white">{tr.sobre.missao}</h3>
            <p className="text-gray-300 leading-relaxed">{tr.sobre.missaoTexto}</p>
          </div>

          <div className="bg-[#0F0F0F]/50 p-8 rounded-2xl border border-gray-800/50 hover:border-gray-700 transition-all">
            <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-2xl font-sans font-bold mb-4 text-white">{tr.sobre.visao}</h3>
            <p className="text-gray-300 leading-relaxed">{tr.sobre.visaoTexto}</p>
          </div>

          <div className="bg-[#0F0F0F]/50 p-8 rounded-2xl border border-gray-800/50 hover:border-gray-700 transition-all">
            <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-2xl font-sans font-bold mb-4 text-white">{tr.sobre.valores}</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span>{tr.sobre.valor1}</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span>{tr.sobre.valor2}</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span>{tr.sobre.valor3}</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span>{tr.sobre.valor4}</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span>{tr.sobre.valor5}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

