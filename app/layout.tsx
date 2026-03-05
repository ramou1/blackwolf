import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Blackwolf - Negócios, Inovação, Confiança",
  description: "Conectando projetos inovadores a investidores estratégicos. Impulsionando crescimento, rentabilidade e expansão global.",
  icons: {
    icon: "/images/icone-blackwolf.png",
  },
  openGraph: {
    images: ["/images/image-wolf.png"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/image-wolf.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body
        className={`${inter.variable} font-sans antialiased`}
      >
        <AuthProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
