import Image from "next/image";
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
      <div className="flex justify-center py-12 bg-[#0F0F0F]">
        <Image
          src="/images/icone-patas.png"
          alt=""
          width={72}
          height={72}
          className="object-contain opacity-90"
          unoptimized
        />
      </div>
      <ProjetosEvolucao />
      <Planos />
      <Contato />
      <Footer />
    </div>
  );
}
