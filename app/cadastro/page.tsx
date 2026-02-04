"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { registerUser } from "@/lib/mockUsers";
import {
  PAISES,
  TIPOS_USUARIO,
  PLANOS_NEGOCIO,
  PLANOS_PATROCINADOR,
} from "@/lib/constants";

const inputClass =
  "w-full px-4 py-2.5 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#1179a6] focus:border-transparent";

export default function CadastroPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [pais, setPais] = useState("");
  const [documento, setDocumento] = useState("");
  const [tipoUsuario, setTipoUsuario] = useState("");
  const [plano, setPlano] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const planosDisponiveis =
    tipoUsuario === "negocio_startup" ? PLANOS_NEGOCIO : PLANOS_PATROCINADOR;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (!tipoUsuario) {
      setError("Selecione o tipo de usuário.");
      return;
    }

    if (!plano) {
      setError("Selecione um plano.");
      return;
    }

    const result = registerUser({
      email,
      password,
      name,
      telefone: telefone || undefined,
      pais: pais || undefined,
      documento: documento || undefined,
      tipoUsuario,
      plano,
    });

    if (result.success) {
      setSuccess(true);
      setTimeout(() => router.push("/"), 2000);
    } else {
      setError(result.error || "Erro ao criar conta.");
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
            Conta criada com sucesso!
          </h1>
          <p className="text-gray-400 mb-4">
            Redirecionando para a página inicial... Você já pode fazer login.
          </p>
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
            Voltar
          </Link>
        </div>
      </header>

      <main className="flex-1 py-8 px-4">
        <div className="w-full max-w-lg mx-auto">
          <div className="flex justify-center mb-6">
            <Image
              src="/images/logo-blackwolf.png"
              alt="Blackwolf"
              width={140}
              height={40}
              className="h-10 w-auto"
            />
          </div>

          <h1 className="text-2xl font-semibold text-white text-center mb-2">
            Criar conta
          </h1>
          <p className="text-gray-400 text-center mb-8">
            Preencha os dados para se cadastrar
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                Nome completo
              </label>
              <input
                id="cadastro-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={inputClass}
                placeholder="João Silva"
                autoComplete="name"
              />
            </div>

            <div>
              <label
                htmlFor="cadastro-email"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                E-mail
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
              <label
                htmlFor="cadastro-telefone"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Telefone
              </label>
              <input
                id="cadastro-telefone"
                type="tel"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                className={inputClass}
                placeholder="+55 11 99999-9999"
                autoComplete="tel"
              />
            </div>

            <div>
              <label
                htmlFor="cadastro-pais"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                País de origem
              </label>
              <select
                id="cadastro-pais"
                value={pais}
                onChange={(e) => setPais(e.target.value)}
                className={inputClass}
                required
              >
                <option value="">Selecione o país</option>
                {PAISES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="cadastro-documento"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                CPF / CNPJ / ID / Passaporte
              </label>
              <input
                id="cadastro-documento"
                type="text"
                value={documento}
                onChange={(e) => setDocumento(e.target.value)}
                className={inputClass}
                placeholder="Número do documento"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tipo de usuário
              </label>
              <div className="space-y-2">
                {TIPOS_USUARIO.map((tipo) => (
                  <label
                    key={tipo.value}
                    className="flex items-center gap-3 p-3 rounded-lg border border-[#2A2A2A] hover:border-[#1179a6]/50 cursor-pointer transition-colors"
                  >
                    <input
                      type="radio"
                      name="tipoUsuario"
                      value={tipo.value}
                      checked={tipoUsuario === tipo.value}
                      onChange={() => {
                        setTipoUsuario(tipo.value);
                        setPlano("");
                      }}
                      className="text-[#1179a6] focus:ring-[#1179a6]"
                    />
                    <span className="text-gray-300">{tipo.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {tipoUsuario && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Plano
                </label>
                <div className="space-y-2">
                  {planosDisponiveis.map((p) => (
                    <label
                      key={p.id}
                      className="flex items-center gap-3 p-3 rounded-lg border border-[#2A2A2A] hover:border-[#1179a6]/50 cursor-pointer transition-colors"
                    >
                      <input
                        type="radio"
                        name="plano"
                        value={p.id}
                        checked={plano === p.id}
                        onChange={() => setPlano(p.id)}
                        className="text-[#1179a6] focus:ring-[#1179a6]"
                      />
                      <span className="text-gray-300">
                        {p.nome}
                        {"valor" in p && p.valor != null
                          ? ` - R$ ${p.valor.toLocaleString("pt-BR")}/ano`
                          : ""}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div>
              <label
                htmlFor="cadastro-password"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Senha
              </label>
              <input
                id="cadastro-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
                className={inputClass}
                placeholder="Mínimo 6 caracteres"
                autoComplete="new-password"
              />
            </div>

            <div>
              <label
                htmlFor="cadastro-confirm"
                className="block text-sm font-medium text-gray-300 mb-1"
              >
                Confirmar senha
              </label>
              <input
                id="cadastro-confirm"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className={inputClass}
                placeholder="Repita a senha"
                autoComplete="new-password"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#1179a6] hover:bg-[#1179a6]/90 text-white font-medium rounded-lg transition-colors"
            >
              Criar conta
            </button>

            <p className="text-center text-sm text-gray-400">
              Já tem uma conta?{" "}
              <Link href="/" className="text-[#1179a6] hover:underline font-medium">
                Entrar
              </Link>
            </p>
          </form>
        </div>
      </main>
    </div>
  );
}
