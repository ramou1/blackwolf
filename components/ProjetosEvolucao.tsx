"use client";

import Image from "next/image";
import { useTranslations } from "@/context/LanguageContext";

const PROJETOS = [
  { id: "etesouro", nome: "Etesouro", logo: "/images/logo-etesouro.png" },
  { id: "commish", nome: "Commish", logo: "/images/logo-commish.png" },
  { id: "trajecta", nome: "Trajecta", logo: "/images/logo-trajecta.png" },
];

export default function ProjetosEvolucao() {
  const tr = useTranslations();

  return (
    <section id="projetos-evolucao" className="py-20 bg-[#0F0F0F] scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-sans font-bold mb-4">
            {tr.projetosEvolucao.title}{" "}
            <span className="text-[#1179a6]">{tr.projetosEvolucao.titleHighlight}</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            {tr.projetosEvolucao.subtitle}
          </p>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-16">
          {PROJETOS.map((projeto) => (
            <div
              key={projeto.id}
              className="flex items-center justify-center p-6 rounded-2xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#1179a6]/30 transition-all"
            >
              <Image
                src={projeto.logo}
                alt={projeto.nome}
                width={180}
                height={60}
                className="h-14 w-auto object-contain opacity-90 hover:opacity-100 transition-opacity"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
