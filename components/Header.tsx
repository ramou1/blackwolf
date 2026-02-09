"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X, User, LogOut, LayoutDashboard, ChevronDown } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import {
  useLanguage,
  useTranslations,
  LOCALE_FLAGS,
  LOCALE_LABELS,
  type Locale,
} from "@/context/LanguageContext";
import LoginModal from "./LoginModal";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const { user, logout } = useAuth();
  const { locale, setLocale } = useLanguage();
  const tr = useTranslations();

  const firstName = user?.name?.split(" ")[0] || user?.name || tr.nav.usuario;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setIsUserMenuOpen(false);
      }
      if (langMenuRef.current && !langMenuRef.current.contains(target)) {
        setIsLangMenuOpen(false);
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
        {tr.nav.home}
      </button>
      <button
        onClick={() => scrollToSection("sobre")}
        className="text-gray-300 hover:text-[#1179a6] transition-colors"
      >
        {tr.nav.sobre}
      </button>
      <button
        onClick={() => scrollToSection("solucoes")}
        className="text-gray-300 hover:text-[#1179a6] transition-colors"
      >
        {tr.nav.solucoes}
      </button>
      <button
        onClick={() => scrollToSection("planos")}
        className="text-gray-300 hover:text-[#1179a6] transition-colors"
      >
        {tr.nav.planos}
      </button>
      <button
        onClick={() => scrollToSection("contato")}
        className="text-gray-300 hover:text-[#1179a6] transition-colors"
      >
        {tr.nav.contato}
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
              {/* Language switcher - discreto */}
              <div className="relative" ref={langMenuRef}>
                <button
                  onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                  className="flex items-center gap-0.5 text-gray-500 hover:text-gray-300 transition-colors text-lg"
                  aria-label="Idioma"
                  title={LOCALE_LABELS[locale]}
                >
                  <span>{LOCALE_FLAGS[locale]}</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${isLangMenuOpen ? "rotate-180" : ""}`}
                  />
                </button>
                {isLangMenuOpen && (
                  <div className="absolute left-0 top-full mt-1 py-1 min-w-[120px] bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg shadow-xl">
                    {(["pt", "en", "es"] as Locale[]).map((loc) => (
                      <button
                        key={loc}
                        onClick={() => {
                          setLocale(loc);
                          setIsLangMenuOpen(false);
                        }}
                        className={`flex items-center gap-2 w-full px-3 py-2 text-left text-sm transition-colors ${
                          locale === loc
                            ? "text-[#1179a6] bg-[#1179a6]/10"
                            : "text-gray-300 hover:bg-[#2A2A2A] hover:text-white"
                        }`}
                      >
                        <span>{LOCALE_FLAGS[loc]}</span>
                        {LOCALE_LABELS[loc]}
                      </button>
                    ))}
                  </div>
                )}
              </div>
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
                        href="/dashboard/profile"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-[#2A2A2A] hover:text-white transition-colors"
                      >
                        <User className="w-4 h-4" />
                        Perfil
                      </Link>
                      <Link
                        href="/dashboard"
                        onClick={() => setIsUserMenuOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-gray-300 hover:bg-[#2A2A2A] hover:text-white transition-colors"
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        {tr.nav.areaInterna}
                      </Link>
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="flex items-center gap-2 w-full px-4 py-2 text-gray-300 hover:bg-[#2A2A2A] hover:text-red-400 transition-colors text-left"
                      >
                        <LogOut className="w-4 h-4" />
                        {tr.nav.sair}
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="bg-[#1179a6] hover:bg-[#1179a6]/90 text-white px-6 py-2 rounded-full transition-colors"
                >
                  {tr.nav.enter}
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
                  {tr.nav.enter}
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
              <div className="flex flex-wrap gap-2 mb-4 pb-4 border-b border-[#2A2A2A]">
                {(["pt", "en", "es"] as Locale[]).map((loc) => (
                  <button
                    key={loc}
                    onClick={() => {
                      setLocale(loc);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm ${
                      locale === loc
                        ? "text-[#1179a6] bg-[#1179a6]/20"
                        : "text-gray-400 hover:text-gray-300"
                    }`}
                  >
                    <span>{LOCALE_FLAGS[loc]}</span>
                    {LOCALE_LABELS[loc]}
                  </button>
                ))}
              </div>
              <div className="flex flex-col space-y-4">
                {navLinks}
                {user && (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={() => setIsMenuOpen(false)}
                      className="text-gray-300 hover:text-[#1179a6] transition-colors text-left"
                    >
                      {tr.nav.areaInterna}
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="text-red-400 hover:text-red-300 transition-colors text-left"
                    >
                      {tr.nav.sair}
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
