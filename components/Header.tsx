"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, User, LogOut, LayoutDashboard } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import LoginModal from "./LoginModal";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();

  const firstName = user?.name?.split(" ")[0] || user?.name || "Usuário";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMenuOpen(false);
    }
  };

  const navLinks = (
    <>
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
        onClick={() => scrollToSection("planos")}
        className="text-gray-300 hover:text-[#1179a6] transition-colors"
      >
        Planos
      </button>
      <button
        onClick={() => scrollToSection("contato")}
        className="text-gray-300 hover:text-[#1179a6] transition-colors"
      >
        Contato
      </button>
    </>
  );

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F0F0F]/80 backdrop-blur-md border-b border-[#1A1A1A]/30">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo-blackwolf.png"
                alt="Blackwolf Logo"
                width={173}
                height={50}
                className="h-14 w-auto"
                priority
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              {navLinks}
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-[#1179a6] flex items-center justify-center overflow-hidden">
                      {user.avatarUrl ? (
                        <Image
                          src={user.avatarUrl}
                          alt={user.name}
                          width={36}
                          height={36}
                          className="object-cover"
                        />
                      ) : (
                        <User className="w-4 h-4 text-white" />
                      )}
                    </div>
                    <span>{firstName}</span>
                  </button>
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 py-2 w-48 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg shadow-xl">
                      <Link
                        href="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-[#2A2A2A] hover:text-white transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Área interna
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-gray-300 hover:bg-[#2A2A2A] hover:text-red-400 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        Sair
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-[#1179a6] hover:bg-[#1179a6]/90 text-white px-6 py-2 rounded-full transition-colors"
                >
                  Entrar
                </button>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-3">
              {user ? (
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 text-gray-300"
                >
                  <div className="w-8 h-8 rounded-full bg-[#1179a6] flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm">{firstName}</span>
                </Link>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-[#1179a6] hover:bg-[#1179a6]/90 text-white px-4 py-2 rounded-full text-sm"
                >
                  Entrar
                </button>
              )}
              <button
                className="text-white"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-graphite/30">
              <div className="flex flex-col space-y-4">
                {navLinks}
                {user && (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-300 hover:text-[#1179a6] transition-colors text-left"
                    >
                      Área interna
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="text-red-400 hover:text-red-300 transition-colors text-left"
                    >
                      Sair
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}
