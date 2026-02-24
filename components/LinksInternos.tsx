"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "@/context/LanguageContext";
import {
  User,
  Users,
  MessageSquare,
  ChevronRight,
} from "lucide-react";

export default function LinksInternos() {
  const { user } = useAuth();
  const tr = useTranslations();
  const isAdmin = user?.role === "admin";

  const baseCards = [
    {
      href: "/dashboard/profile",
      icon: User,
      label: tr.linksInternos.perfil,
    },
  ];

  const adminCards = [
    {
      href: "/dashboard/users",
      icon: Users,
      label: tr.linksInternos.usuarios,
    },
    {
      href: "/dashboard/contacts",
      icon: MessageSquare,
      label: tr.linksInternos.contatos,
    },
  ];

  const cards = isAdmin ? [...baseCards, ...adminCards] : baseCards;

  return (
    <section className="py-6">
      <div>
        <h2 className="text-xl font-semibold text-white mb-6">
          {tr.linksInternos.title}{" "}
          <span className="text-[#1179a6]">{tr.linksInternos.titleHighlight}</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center gap-4 p-6 rounded-xl bg-[#1A1A1A] border border-[#2A2A2A] hover:border-[#1179a6]/50 hover:bg-[#1A1A1A]/80 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-[#1179a6]/20 flex items-center justify-center shrink-0 group-hover:bg-[#1179a6]/30 transition-colors">
                  <Icon className="w-7 h-7 text-[#1179a6]" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="font-medium text-white group-hover:text-[#1179a6] transition-colors">
                    {item.label}
                  </span>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500 group-hover:text-[#1179a6] group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
