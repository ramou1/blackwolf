import { Briefcase, Users } from "lucide-react";
import { PLANOS_NEGOCIO } from "@/lib/constants";

export default function Planos() {
  return (
    <section id="planos" className="py-20 bg-[#1A1A1A] scroll-mt-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-sans font-bold mb-4">
            Valores <span className="text-[#1179a6]">anuais</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Escolha o plano ideal para o seu perfil
          </p>
        </div>

        {/* Para negócios e startups */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-[#1179a6]/20 rounded-xl flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-[#1179a6]" />
            </div>
            <h3 className="text-2xl font-sans font-bold text-white">
              Pessoas de negócio e Startups
            </h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {PLANOS_NEGOCIO.map((plano) => (
              <div
                key={plano.id}
                className="bg-[#0F0F0F]/50 p-8 rounded-2xl border border-gray-800/50 hover:border-[#1179a6]/50 transition-all"
              >
                <h4 className="text-xl font-sans font-bold text-white mb-2">
                  {plano.nome}
                </h4>
                <div className="mb-6">
                  <span className="text-3xl font-bold text-[#1179a6]">
                    R$ {plano.valor.toLocaleString("pt-BR")}
                  </span>
                  <span className="text-gray-400 ml-1">/ano</span>
                </div>
                <p className="text-gray-400 text-sm mb-6">
                  Plano anual com acesso completo à plataforma
                </p>
                <a
                  href="/cadastro"
                  className="block w-full py-3 text-center bg-[#1179a6] hover:bg-[#1179a6]/90 text-white font-medium rounded-lg transition-colors"
                >
                  Assinar
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Para patrocinadores e investidores */}
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="w-12 h-12 bg-[#1179a6]/20 rounded-xl flex items-center justify-center">
              <Users className="w-6 h-6 text-[#1179a6]" />
            </div>
            <h3 className="text-2xl font-sans font-bold text-white">
              Patrocinadores e Investidores
            </h3>
          </div>

          <div className="rounded-2xl border border-gray-800/50 border-dashed bg-[#0F0F0F]/30 p-12 text-center">
            <p className="text-gray-400 mb-6 max-w-lg mx-auto">
              Valores sob consulta. Entre em contato para conhecer as opções
              exclusivas para patrocinadores e investidores.
            </p>
            <a
              href="#contato"
              className="inline-block px-8 py-3 bg-[#1179a6] hover:bg-[#1179a6]/90 text-white font-medium rounded-lg transition-colors"
            >
              Entrar em contato
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
