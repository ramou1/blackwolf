import Header from "../components/Header";
import Hero from "../components/Hero";
import Sobre from "../components/Sobre";
import Solucoes from "../components/Solucoes";
import Contato from "../components/Contato";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      <Header />
      <Hero />
      <Sobre />
      <Solucoes />
      <Contato />
      <Footer />
    </div>
  );
}
