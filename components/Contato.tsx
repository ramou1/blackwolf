export default function Contato() {
  return (
    <section id="contato" className="py-20 bg-[#0F0F0F]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-sans font-bold mb-4">
            Entre em <span className="text-[#1179a6]">contato</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Vamos conversar sobre como podemos impulsionar seu negócio
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <form className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nome" className="block text-sm font-medium text-gray-300 mb-2">
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  required
                  className="w-full px-4 py-3 bg-[#1A1A1A]/50 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 text-white placeholder-gray-500"
                  placeholder="Seu nome"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  E-mail
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
                Assunto
              </label>
              <input
                type="text"
                id="assunto"
                name="assunto"
                required
                className="w-full px-4 py-3 bg-[#1A1A1A]/50 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 text-white placeholder-gray-500"
                placeholder="Assunto da mensagem"
              />
            </div>
            <div>
              <label htmlFor="mensagem" className="block text-sm font-medium text-gray-300 mb-2">
                Mensagem
              </label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows={6}
                required
                className="w-full px-4 py-3 bg-[#1A1A1A]/50 border border-gray-800 rounded-lg focus:outline-none focus:border-gray-600 text-white placeholder-gray-500 resize-none"
                placeholder="Sua mensagem..."
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#1179a6] hover:bg-[#1179a6]/90 text-white font-sans font-semibold py-4 px-8 rounded-lg transition-colors text-lg"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

