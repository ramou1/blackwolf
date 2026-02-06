export const PAISES = [
  "Brasil",
  "Argentina",
  "Uruguay",
  "Chile",
  "Colombia",
  "USA",
  "UE",
] as const;

export type Pais = (typeof PAISES)[number];

export const TIPOS_USUARIO = [
  { value: "dono_negocio" },
  { value: "loja_startup" },
  { value: "patrocinador" },
  { value: "investidor" },
  { value: "socio" },
] as const;

export const TIPOS_COM_PLANOS_NEGOCIO = ["dono_negocio", "loja_startup"];

export const PLANOS_NEGOCIO = [
  { id: "basic", nome: "Basic", valor: 999 },
  { id: "standard", nome: "Standard", valor: 1999 },
  { id: "advanced", nome: "Advanced", valor: 2999 },
] as const;

export const PLANOS_PATROCINADOR = [
  { id: "em_breve", nome: "Valores em breve", valor: null },
] as const;
