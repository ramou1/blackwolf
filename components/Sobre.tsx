import { Zap, Eye, Heart } from "lucide-react";

export default function Sobre() {
  return (
    <section id="sobre" className="py-20 bg-[#1A1A1A]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-sans font-bold mb-4">
            Sobre a <span className="text-[#1179a6]">Blackwolf</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Conectando projetos inovadores a investidores estratégicos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Missão */}
          <div className="bg-[#0F0F0F]/50 p-8 rounded-2xl border border-gray-800/50 hover:border-gray-700 transition-all">
            <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-2xl font-sans font-bold mb-4 text-white">Missão</h3>
            <p className="text-gray-300 leading-relaxed">
              A Blackwolf é uma empresa de negócios e relacionamentos dedicada a conectar projetos inovadores a investidores estratégicos, impulsionando crescimento, rentabilidade e expansão global. Atuamos como ponte entre tecnologia, capital e mercado, oferecendo acesso a uma rede internacional de empresas, soluções prontas e oportunidades de alto impacto.
            </p>
          </div>

          {/* Visão */}
          <div className="bg-[#0F0F0F]/50 p-8 rounded-2xl border border-gray-800/50 hover:border-gray-700 transition-all">
            <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-2xl font-sans font-bold mb-4 text-white">Visão</h3>
            <p className="text-gray-300 leading-relaxed">
              Ser a principal plataforma de conexões de negócios estratégicos da América Latina até 2030, com presença global consolidada e reconhecimento como referência em inovação, expansão tecnológica e rentabilidade.
            </p>
          </div>

          {/* Valores */}
          <div className="bg-[#0F0F0F]/50 p-8 rounded-2xl border border-gray-800/50 hover:border-gray-700 transition-all">
            <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-8 h-8 text-gray-300" />
            </div>
            <h3 className="text-2xl font-sans font-bold mb-4 text-white">Valores</h3>
            <ul className="text-gray-300 space-y-2">
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span><strong className="text-white">Globalização:</strong> Pensamos grande, atuamos no mundo inteiro</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span><strong className="text-white">Resultado:</strong> Foco em rentabilidade, impacto e crescimento real</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span><strong className="text-white">Transparência:</strong> Compromisso ético com investidores e parceiros</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span><strong className="text-white">Conexão:</strong> Geramos valor por meio de relacionamentos estratégicos</span>
              </li>
              <li className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span><strong className="text-white">Ousadia:</strong> Atuamos com coragem e ambição</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

