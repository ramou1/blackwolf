"use client";

import { Check, Rocket, Briefcase, TrendingUp, Globe } from "lucide-react";
import { useTranslations } from "@/context/LanguageContext";

export default function Solucoes() {
  const tr = useTranslations();

  const targetItems = [
    { title: tr.solucoes.startup, description: tr.solucoes.startupDesc, icon: Rocket },
    { title: tr.solucoes.investidores, description: tr.solucoes.investidoresDesc, icon: Briefcase },
    { title: tr.solucoes.empresas, description: tr.solucoes.empresasDesc, icon: TrendingUp },
    { title: tr.solucoes.projetos, description: tr.solucoes.projetosDesc, icon: Globe },
  ];

  return (
    <section id="solucoes" className="py-20 bg-[#0F0F0F]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-sans font-bold mb-4">
            {tr.solucoes.title} <span className="text-[#1179a6]">{tr.solucoes.titleHighlight}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {tr.solucoes.subtitle}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {tr.solucoes.items.map((solucao, index) => (
            <div
              key={index}
              className="bg-[#2A2A2A] p-6 rounded-xl border border-gray-700/50 hover:border-gray-600 hover:bg-[#2F2F2F] transition-all group"
            >
              <div className="flex items-start">
                <div className="w-10 h-10 bg-gray-700/50 rounded-lg flex items-center justify-center mr-4 group-hover:bg-gray-600/50 transition-colors">
                  <Check className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-gray-200 font-medium">{solucao}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-20 py-16 bg-[#1A1A1A] rounded-3xl px-6 sm:px-8 lg:px-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-sans font-bold mb-4">
              {tr.solucoes.paraQuemPrefix} <span className="text-[#1179a6]">Blackwolf</span>
              {tr.solucoes.paraQuemSuffix}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetItems.map((item, index) => {
              const IconComponent = item.icon as React.ComponentType<{ className?: string }>;
              return (
                <div
                  key={index}
                  className="bg-[#2A2A2A] p-8 rounded-2xl border border-gray-700/50 hover:border-gray-600 hover:bg-[#2F2F2F] transition-all text-center"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-16 h-16 bg-gray-700/50 rounded-full flex items-center justify-center">
                      <IconComponent className="w-8 h-8 text-gray-300" />
                    </div>
                  </div>
                  <h3 className="text-xl font-sans font-bold mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-300">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

