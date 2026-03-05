"use client";

import Image from "next/image";
import { useTranslations } from "@/context/LanguageContext";

const OFERECEMOS_ICONS = [
  "/images/icone-gestao-estrategica.png",
  "/images/icone-captacao-investidores.png",
  "/images/icone-seguranca-juridica.png",
  "/images/icone-projetos-potencial.png",
  "/images/icone-expansao-internacional.png",
  "/images/icone-empresas-produtos.png",
] as const;

const TARGET_ICONS = [
  "/images/icone-startups.png",
  "/images/icone-investidores.png",
  "/images/icone-empresas.png",
  "/images/icone-projetos.png",
] as const;

export default function Solucoes() {
  const tr = useTranslations();

  const targetItems = [
    { title: tr.solucoes.startup, description: tr.solucoes.startupDesc, iconSrc: TARGET_ICONS[0] },
    { title: tr.solucoes.investidores, description: tr.solucoes.investidoresDesc, iconSrc: TARGET_ICONS[1] },
    { title: tr.solucoes.empresas, description: tr.solucoes.empresasDesc, iconSrc: TARGET_ICONS[2] },
    { title: tr.solucoes.projetos, description: tr.solucoes.projetosDesc, iconSrc: TARGET_ICONS[3] },
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
                <div className="w-16 h-16 flex items-center justify-center mr-4 shrink-0">
                  <Image
                    src={OFERECEMOS_ICONS[index] ?? OFERECEMOS_ICONS[0]}
                    alt=""
                    width={64}
                    height={64}
                    className="object-contain w-16 h-16"
                    unoptimized
                  />
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
            {targetItems.map((item, index) => (
              <div
                key={index}
                className="bg-[#2A2A2A] p-8 rounded-2xl border border-gray-700/50 hover:border-gray-600 hover:bg-[#2F2F2F] transition-all text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center p-2 shrink-0">
                    <Image
                      src={item.iconSrc}
                      alt={item.title}
                      width={64}
                      height={64}
                      className="object-contain w-12 h-12"
                      unoptimized
                    />
                  </div>
                </div>
                <h3 className="text-xl font-sans font-bold mb-2 text-white">{item.title}</h3>
                <p className="text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

