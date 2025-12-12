"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F0F0F]/80 backdrop-blur-md border-b border-[#1A1A1A]/30">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Image
              src="/images/logo-blackwolf.png"
              alt="Blackwolf Logo"
              width={173}
              height={50}
              className="h-14 w-auto"
              priority
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className="text-gray-300 hover:text-[#1179a6] transition-colors"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("sobre")}
              className="text-gray-300 hover:text-[#1179a6] transition-colors"
            >
              Sobre
            </button>
            <button
              onClick={() => scrollToSection("solucoes")}
              className="text-gray-300 hover:text-[#1179a6] transition-colors"
            >
              Soluções
            </button>
            <button
              onClick={() => scrollToSection("contato")}
              className="bg-[#1179a6] hover:bg-[#1179a6]/90 text-white px-6 py-2 rounded-full transition-colors"
            >
              Contato
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-graphite/30">
            <div className="flex flex-col space-y-4">
              <button
                onClick={() => scrollToSection("home")}
                className="text-gray-300 hover:text-[#1179a6] transition-colors text-left"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("sobre")}
                className="text-gray-300 hover:text-[#1179a6] transition-colors text-left"
              >
                Sobre
              </button>
              <button
                onClick={() => scrollToSection("solucoes")}
                className="text-gray-300 hover:text-[#1179a6] transition-colors text-left"
              >
                Soluções
              </button>
              <button
                onClick={() => scrollToSection("contato")}
                className="text-gray-300 hover:text-[#1179a6] transition-colors text-left"
              >
                Contato
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

