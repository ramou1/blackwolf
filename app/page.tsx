import Header from "../components/Header";
import Hero from "../components/Hero";
import Sobre from "../components/Sobre";
import Solucoes from "../components/Solucoes";
import ProjetosEvolucao from "../components/ProjetosEvolucao";
import Planos from "../components/Planos";
import Contato from "../components/Contato";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <Header />
      <Hero />
      <Sobre />
      <Solucoes />
      <ProjetosEvolucao />
      <Planos />
      <Contato />
      <Footer />
    </div>
  );
}
