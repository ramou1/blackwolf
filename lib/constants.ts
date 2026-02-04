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
  { value: "negocio_startup", label: "Pessoa de negócio ou Startup" },
  { value: "patrocinador_investidor", label: "Patrocinador ou Investidor" },
] as const;

export const PLANOS_NEGOCIO = [
  { id: "basic", nome: "Basic", valor: 999 },
  { id: "standard", nome: "Standard", valor: 1999 },
  { id: "advanced", nome: "Advanced", valor: 2999 },
] as const;

export const PLANOS_PATROCINADOR = [
  { id: "em_breve", nome: "Valores em breve", valor: null },
] as const;
