"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Store, Briefcase, UserPlus, TrendingUp, Users } from "lucide-react";
import { registerWithFirebase } from "@/lib/firebaseAuth";
import { useAuth } from "@/context/AuthContext";
import {
  PAISES,
  TIPOS_USUARIO,
  TIPOS_COM_PLANOS_NEGOCIO,
  PLANOS_NEGOCIO,
  PLANOS_PATROCINADOR,
} from "@/lib/constants";
import PasswordInput from "@/components/PasswordInput";
import { useTranslations } from "@/context/LanguageContext";

// Sanitiza para permitir apenas letras (incl. acentuadas), números e espaços
function sanitizeName(value: string): string {
  return value.replace(/[^\p{L}\p{N}\s]/gu, "").slice(0, 50);
}

// Sanitiza cidade: letras, números e espaços
function sanitizeCity(value: string): string {
  return value.replace(/[^\p{L}\p{N}\s]/gu, "").slice(0, 40);
}

// Sanitiza documento (ID/Passaporte): letras, números e separadores comuns
function sanitizeDocument(value: string): string {
  return value.replace(/[^\p{L}\p{N}.\-\/]/gu, "").slice(0, 40);
}

// Apenas dígitos
function onlyDigits(value: string): string {
  return value.replace(/\D/g, "");
}

// Máscara CPF: 000.000.000-00
function maskCPF(value: string): string {
  const d = onlyDigits(value).slice(0, 11);
  if (d.length <= 3) return d;
  if (d.length <= 6) return `${d.slice(0, 3)}.${d.slice(3)}`;
  if (d.length <= 9) return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6)}`;
  return `${d.slice(0, 3)}.${d.slice(3, 6)}.${d.slice(6, 9)}-${d.slice(9)}`;
}

// Máscara CNPJ: 00.000.000/0000-00
function maskCNPJ(value: string): string {
  const d = onlyDigits(value).slice(0, 14);
  if (d.length <= 2) return d;
  if (d.length <= 5) return `${d.slice(0, 2)}.${d.slice(2)}`;
  if (d.length <= 8) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5)}`;
  if (d.length <= 12) return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8)}`;
  return `${d.slice(0, 2)}.${d.slice(2, 5)}.${d.slice(5, 8)}/${d.slice(8, 12)}-${d.slice(12)}`;
}

const TIPOS_DOCUMENTO = [
  { value: "cpf", labelKey: "documentoTipoCpf" as const },
  { value: "cnpj", labelKey: "documentoTipoCnpj" as const },
  { value: "id", labelKey: "documentoTipoId" as const },
  { value: "passaporte", labelKey: "documentoTipoPassaporte" as const },
] as const;

const MAX_NOME = 50;
const MAX_CIDADE = 40;
const MAX_DOCUMENTO = 40;

const inputClass =
  "w-full px-4 py-2.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1179a6] focus:border-transparent";

const TIPO_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  dono_negocio: Briefcase,
  loja_startup: Store,
  patrocinador: UserPlus,
  investidor: TrendingUp,
  socio: Users,
};

export default function CadastroPage() {
  const router = useRouter();
  const { login } = useAuth();
  const tr = useTranslations();
  const [step, setStep] = useState<1 | 2>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pais, setPais] = useState("");
  const [cidade, setCidade] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState<"cpf" | "cnpj" | "id" | "passaporte" | "">("");
  const [documento, setDocumento] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [plano, setPlano] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const planosDisponiveis = TIPOS_COM_PLANOS_NEGOCIO.includes(tipoUsuario)
    ? PLANOS_NEGOCIO
    : PLANOS_PATROCINADOR;

  const validateStep1 = () => {
    setError("");
    if (!tipoDocumento) {
      setError(tr.cadastro.erroTipoDocumento);
      return false;
    }
    if (!documento.trim()) {
      setError(tr.cadastro.erroDocumentoObrigatorio);
      return false;
    }
    const digits = onlyDigits(documento);
    if (tipoDocumento === "cpf" && digits.length !== 11) {
      setError(tr.cadastro.erroCpfInvalido);
      return false;
    }
    if (tipoDocumento === "cnpj" && digits.length !== 14) {
      setError(tr.cadastro.erroCnpjInvalido);
      return false;
    }
    if (!tipoUsuario) {
      setError(tr.cadastro.erroTipoUsuario);
      return false;
    }
    if (!plano) {
      setError(tr.cadastro.erroPlano);
      return false;
    }
    return true;
  };

  const validateStep2 = () => {
    setError("");
    if (password !== confirmPassword) {
      setError(tr.cadastro.erroSenhasDiferentes);
      return false;
    }
    if (password.length < 6) {
      setError(tr.cadastro.erroSenhaCurta);
      return false;
    }
    return true;
  };

  const handleStep1Submit = (e: FormEvent) => {
    e.preventDefault();
    if (validateStep1()) setStep(2);
  };

  const [submitting, setSubmitting] = useState(false);

  const handleStep2Submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateStep2()) return;
    setError("");
    setSubmitting(true);
    const result = await registerWithFirebase({
      email,
      password,
      name,
      telefone: [phoneCountryCode.trim(), phoneNumber.trim()].filter(Boolean).join(" ") || undefined,
      pais: pais || undefined,
      cidade: cidade || undefined,
      documento: documento || undefined,
      tipoUsuario,
      plano,
    });
    setSubmitting(false);

    if (result.success) {
      await login(email, password);
      setSuccess(true);
      setTimeout(() => router.push("/"), 2000);
    } else {
      setError(
        result.error === "EMAIL_IN_USE"
          ? tr.cadastro.erroEmailEmUso
          : result.error || tr.cadastro.erroGenerico
      );
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1179a6]/20 text-[#1179a6] mb-4">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-white mb-2">
            {tr.cadastro.sucesso}
          </h1>
          <p className="text-gray-400 mb-4">{tr.cadastro.redirecionando}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex flex-col">
      <header className="border-b border-[#1A1A1A]/30 bg-[#0F0F0F]/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {tr.cadastro.voltar}
          </Link>
        </div>
      </header>

      <main className="flex-1 py-8 px-4">
        <div className="w-full max-w-lg mx-auto">
          <div className="flex justify-center mb-6">
            <Link href="/" className="block">
              <Image
                src="/images/logo-blackwolf.png"
                alt="Blackwolf"
                width={140}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
          </div>

          {/* Step indicator */}
          <div className="flex justify-center gap-2 mb-6">
            <div
              className={`w-3 h-3 rounded-full ${step >= 1 ? "bg-[#1179a6]" : "bg-[#2A2A2A]"}`}
            />
            <div
              className={`w-3 h-3 rounded-full ${step >= 2 ? "bg-[#1179a6]" : "bg-[#2A2A2A]"}`}
            />
          </div>

          <h1 className="text-2xl font-semibold text-white text-center mb-2">
            {step === 1 && tr.cadastroPagamento.dadosPessoaisTitulo}
            {step === 2 && tr.cadastroPagamento.cadastroTitulo}
          </h1>
          <p className="text-gray-400 text-center mb-8">
            {step === 1 && tr.cadastroPagamento.dadosPessoaisSubtitulo}
            {step === 2 && tr.cadastroPagamento.cadastroSubtitulo}
          </p>

          {step === 1 && (
            <form onSubmit={handleStep1Submit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="cadastro-name"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  {tr.cadastro.nome}
                </label>
                <input
                  id="cadastro-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(sanitizeName(e.target.value))}
                  required
                  maxLength={MAX_NOME}
                  className={inputClass}
                  placeholder="João Silva"
                  autoComplete="name"
                />
              </div>

              <div>
                <label
                  htmlFor="cadastro-pais"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  {tr.cadastro.pais}
                </label>
                <select
                  id="cadastro-pais"
                  value={pais}
                  onChange={(e) => setPais(e.target.value)}
                  className={inputClass}
                  required
                >
                  <option value="">{tr.cadastro.paisPlaceholder}</option>
                  {PAISES.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="cadastro-cidade"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  {tr.cadastroPagamento.cidade}
                </label>
                <input
                  id="cadastro-cidade"
                  type="text"
                  value={cidade}
                  onChange={(e) => setCidade(sanitizeCity(e.target.value))}
                  maxLength={MAX_CIDADE}
                  className={inputClass}
                  placeholder={tr.cadastroPagamento.cidadePlaceholder}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  {tr.cadastro.documento}
                </label>
                <select
                  id="cadastro-tipo-documento"
                  value={tipoDocumento}
                  onChange={(e) => {
                    const v = e.target.value as "" | "cpf" | "cnpj" | "id" | "passaporte";
                    setTipoDocumento(v);
                    setDocumento("");
                  }}
                  required
                  className={inputClass}
                >
                  <option value="">{tr.cadastro.documentoTipoPlaceholder}</option>
                  {TIPOS_DOCUMENTO.map((t) => (
                    <option key={t.value} value={t.value}>
                      {tr.cadastro[t.labelKey]}
                    </option>
                  ))}
                </select>
                {tipoDocumento && (
                  <input
                    id="cadastro-documento"
                    type="text"
                    value={documento}
                    onChange={(e) => {
                      const raw = e.target.value;
                      if (tipoDocumento === "cpf") setDocumento(maskCPF(raw));
                      else if (tipoDocumento === "cnpj") setDocumento(maskCNPJ(raw));
                      else setDocumento(sanitizeDocument(raw));
                    }}
                    maxLength={
                      tipoDocumento === "cpf" ? 14 : tipoDocumento === "cnpj" ? 18 : MAX_DOCUMENTO
                    }
                    className={`${inputClass} mt-2`}
                    placeholder={
                      tipoDocumento === "cpf"
                        ? tr.cadastro.documentoPlaceholderCpf
                        : tipoDocumento === "cnpj"
                          ? tr.cadastro.documentoPlaceholderCnpj
                          : tr.cadastro.documentoPlaceholder
                    }
                    required
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-3">
                  {tr.cadastro.tipoUsuario}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {TIPOS_USUARIO.map((tipo) => {
                    const Icon = TIPO_ICONS[tipo.value];
                    const isSelected = tipoUsuario === tipo.value;
                    return (
                      <button
                        key={tipo.value}
                        type="button"
                        onClick={() => {
                          setTipoUsuario(tipo.value);
                          setPlano("");
                        }}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                          isSelected
                            ? "border-[#1179a6] bg-[#1179a6]/10"
                            : "border-[#2A2A2A] hover:border-[#1179a6]/50 bg-[#1A1A1A]"
                        }`}
                      >
                        {Icon && (
                          <Icon
                            className={`w-6 h-6 ${isSelected ? "text-[#1179a6]" : "text-gray-400"}`}
                          />
                        )}
                        <span className="text-sm font-medium text-center text-gray-300">
                          {tr.cadastroTipos[tipo.value]}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {tipoUsuario && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-3">
                    {tr.cadastro.plano}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {planosDisponiveis.map((p) => {
                      const isSelected = plano === p.id;
                      const valorText =
                        "valor" in p && p.valor != null
                          ? `R$ ${p.valor.toLocaleString("pt-BR")}/ano`
                          : null;
                      return (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPlano(p.id)}
                          className={`flex flex-col items-center gap-1 p-4 rounded-xl border-2 transition-all text-left ${
                            isSelected
                              ? "border-[#1179a6] bg-[#1179a6]/10"
                              : "border-[#2A2A2A] hover:border-[#1179a6]/50 bg-[#1A1A1A]"
                          }`}
                        >
                          <span
                            className={`font-semibold ${
                              isSelected ? "text-[#1179a6]" : "text-white"
                            }`}
                          >
                            {p.nome}
                          </span>
                          {valorText && (
                            <span className="text-sm text-gray-400">
                              {valorText}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3 bg-[#1179a6] hover:bg-[#1179a6]/90 text-white font-medium rounded-lg transition-colors"
              >
                {tr.cadastroPagamento.continuar}
              </button>

              <p className="text-center text-sm text-gray-400">
                {tr.cadastro.jaTemConta}{" "}
                <Link
                  href="/"
                  className="text-[#1179a6] hover:underline font-medium"
                >
                  {tr.cadastro.entrar}
                </Link>
              </p>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleStep2Submit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="cadastro-email"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  {tr.cadastro.email}
                </label>
                <input
                  id="cadastro-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputClass}
                  placeholder="seu@email.com"
                  autoComplete="email"
                />
              </div>

              <div>
                <span className="block text-sm font-medium text-gray-300 mb-1">
                  {tr.cadastro.telefone}
                </span>
                <div className="grid grid-cols-[1fr_2fr] gap-3 mt-1">
                  <div>
                    <label htmlFor="cadastro-codigo-pais" className="sr-only">
                      {tr.cadastro.codigoPais}
                    </label>
                    <input
                      id="cadastro-codigo-pais"
                      type="tel"
                      inputMode="numeric"
                      value={phoneCountryCode}
                      onChange={(e) =>
                        setPhoneCountryCode(e.target.value.replace(/\D/g, "").slice(0, 3))
                      }
                      maxLength={3}
                      className={inputClass}
                      placeholder={tr.cadastro.codigoPaisPlaceholder}
                      autoComplete="tel-country-code"
                    />
                  </div>
                  <div>
                    <label htmlFor="cadastro-telefone" className="sr-only">
                      {tr.cadastro.areaNumero}
                    </label>
                    <input
                      id="cadastro-telefone"
                      type="tel"
                      inputMode="numeric"
                      value={phoneNumber}
                      onChange={(e) =>
                        setPhoneNumber(e.target.value.replace(/\D/g, "").slice(0, 20))
                      }
                      maxLength={20}
                      className={inputClass}
                      placeholder={tr.cadastro.areaNumeroPlaceholder}
                      autoComplete="tel-national"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label
                  htmlFor="cadastro-password"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  {tr.cadastro.senha}
                </label>
                <PasswordInput
                  id="cadastro-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={6}
                  className={inputClass}
                  placeholder={tr.cadastro.senhaPlaceholder}
                  autoComplete="new-password"
                />
              </div>

              <div>
                <label
                  htmlFor="cadastro-confirm"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  {tr.cadastro.confirmarSenha}
                </label>
                <PasswordInput
                  id="cadastro-confirm"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={inputClass}
                  placeholder={tr.cadastro.confirmarSenhaPlaceholder}
                  autoComplete="new-password"
                />
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 py-3 border border-[#2A2A2A] text-gray-300 hover:bg-[#1A1A1A] rounded-lg transition-colors"
                >
                  {tr.cadastroPagamento.voltar}
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 bg-[#1179a6] hover:bg-[#1179a6]/90 disabled:opacity-70 text-white font-medium rounded-lg transition-colors"
                >
                  {submitting ? "..." : tr.cadastroPagamento.concluir}
                </button>
              </div>

              <p className="text-center text-sm text-gray-400">
                {tr.cadastro.jaTemConta}{" "}
                <Link
                  href="/"
                  className="text-[#1179a6] hover:underline font-medium"
                >
                  {tr.cadastro.entrar}
                </Link>
              </p>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
