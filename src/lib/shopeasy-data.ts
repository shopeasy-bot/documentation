/**
 * Dados de referência do ShopEasy usados pelos componentes interativos da documentação.
 * Mantenha em sincronia com content/docs/bot/comandos.mdx e content/docs/bot/plans.mdx.
 */

export type PlanId = "basic" | "essential" | "professional" | "complete";

export const PLANS: {
  id: PlanId;
  name: string;
  price: string;
  tagline: string;
}[] = [
  { id: "basic", name: "Básico", price: "Grátis", tagline: "Para começar a vender" },
  { id: "essential", name: "Essencial", price: "R$ 4,90/mês", tagline: "Personalização e equipe" },
  { id: "professional", name: "Profissional", price: "R$ 8,90/mês", tagline: "Mais gateways e IA" },
  { id: "complete", name: "Completo", price: "R$ 14,90/mês", tagline: "Bot exclusivo e automações" },
];

export const PLAN_ORDER: PlanId[] = PLANS.map((p) => p.id);

export interface PlanFeature {
  label: string;
  group: "Loja" | "Pagamentos" | "Equipe e marca" | "Vendas e IA" | "Bot exclusivo";
  /** Plano mínimo que libera o recurso. */
  minPlan: PlanId;
  /** Valor por plano quando não é simplesmente sim/não. */
  values?: Partial<Record<PlanId, string>>;
}

export const PLAN_FEATURES: PlanFeature[] = [
  { label: "Produtos, estoque manual/automático e carrinhos", group: "Loja", minPlan: "basic" },
  { label: "Cupons (/cupom)", group: "Loja", minPlan: "basic" },
  { label: "Tickets (/ticket)", group: "Loja", minPlan: "basic" },
  {
    label: "Imagens na galeria",
    group: "Loja",
    minPlan: "basic",
    values: { basic: "20", essential: "50", professional: "100", complete: "Ilimitado" },
  },
  { label: "Catálogos (/catalogo)", group: "Loja", minPlan: "essential" },
  { label: "Painel de solicitação de produtos", group: "Loja", minPlan: "essential" },
  { label: "Envio manual de produtos (/produto enviar)", group: "Loja", minPlan: "essential" },
  { label: "PIX Manual, Bravex Pay e Carteira ShopEasy", group: "Pagamentos", minPlan: "basic" },
  { label: "Mercado Pago e EFI Pay", group: "Pagamentos", minPlan: "professional" },
  { label: "Saldo como forma de pagamento (/saldo)", group: "Pagamentos", minPlan: "professional" },
  { label: "PagSeguro, Asaas, Stripe e NowPayments", group: "Bot exclusivo", minPlan: "complete" },
  { label: "Personalização (/personalizar)", group: "Equipe e marca", minPlan: "essential" },
  { label: "Permissões da equipe", group: "Equipe e marca", minPlan: "essential" },
  { label: "Nome e avatar do bot no servidor (/bot)", group: "Equipe e marca", minPlan: "essential" },
  { label: "Relatório e perfil de vendas", group: "Vendas e IA", minPlan: "basic" },
  { label: "Gerar produto e canais com IA", group: "Vendas e IA", minPlan: "essential" },
  { label: "Ranking (/rank) e resumo com IA", group: "Vendas e IA", minPlan: "professional" },
  { label: "Mensagem direta para clientes (/dm)", group: "Vendas e IA", minPlan: "professional" },
  { label: "Textos da personalização com IA", group: "Vendas e IA", minPlan: "professional" },
  { label: "Bot exclusivo com token próprio", group: "Bot exclusivo", minPlan: "complete" },
  { label: "Automações (/automacoes)", group: "Bot exclusivo", minPlan: "complete" },
];

export type CommandCategory = "Loja" | "Pagamentos" | "Vendas" | "Clientes" | "Atendimento" | "Conta e bot";

export interface CommandInfo {
  name: string;
  subcommands?: string[];
  description: string;
  permission: string;
  plan: string;
  category: CommandCategory;
  /** Link para a página da documentação. */
  href: string;
}

export const COMMANDS: CommandInfo[] = [
  { name: "ajuda", description: "Ajuda do bot, relato de bugs e lista de planos", permission: "—", plan: "—", category: "Conta e bot", href: "/docs/comandos#ajuda" },
  { name: "configuracoes", description: "Carrinhos, vendas, canais e permissões", permission: "Configurações", plan: "—", category: "Loja", href: "/docs/configs" },
  { name: "personalizar", description: "Cor da loja, card de produto e card de ticket", permission: "Configurações", plan: "Essencial", category: "Loja", href: "/docs/configs/customization" },
  { name: "painel", description: "Painel central e botão de abrir/fechar a loja", permission: "Administrador", plan: "—", category: "Loja", href: "/docs/painel" },
  { name: "produto", subcommands: ["criar", "configurar", "definir", "esgotados"], description: "Cria, configura e publica produtos", permission: "Produtos", plan: "—", category: "Loja", href: "/docs/products" },
  { name: "produto", subcommands: ["solicitar", "enviar"], description: "Painel de solicitação e envio manual de produtos", permission: "Produtos", plan: "Essencial", category: "Loja", href: "/docs/comandos#produto" },
  { name: "catalogo", subcommands: ["criar", "configurar", "definir"], description: "Agrupa produtos em um catálogo", permission: "Produtos", plan: "Essencial", category: "Loja", href: "/docs/products/catalogos" },
  { name: "cupom", subcommands: ["criar", "configurar", "enviar"], description: "Cupons de desconto", permission: "Produtos", plan: "—", category: "Vendas", href: "/docs/cupons" },
  { name: "galeria", description: "Imagens do servidor", permission: "Produtos", plan: "—", category: "Loja", href: "/docs/products/galeria" },
  { name: "pagamento", subcommands: ["configurar", "aprovar", "consultar"], description: "Gateways, aprovação manual e consulta de pagamentos", permission: "Gerenciar Pagamentos", plan: "—", category: "Pagamentos", href: "/docs/pagamentos" },
  { name: "vendas", subcommands: ["relatorio", "perfil"], description: "Relatório de vendas e compras de um usuário", permission: "Vendas", plan: "—", category: "Vendas", href: "/docs/vendas" },
  { name: "vendas", subcommands: ["resumo"], description: "Resumo semanal com IA", permission: "Vendas", plan: "Profissional", category: "Vendas", href: "/docs/vendas" },
  { name: "rank", subcommands: ["produtos", "clientes"], description: "Rankings de vendas", permission: "Vendas", plan: "Profissional", category: "Vendas", href: "/docs/comandos#rank" },
  { name: "saldo", subcommands: ["ver"], description: "Mostra o seu saldo na loja", permission: "—", plan: "Profissional", category: "Pagamentos", href: "/docs/pagamentos#saldo" },
  { name: "saldo", subcommands: ["dar"], description: "Credita saldo a um usuário", permission: "Administrador", plan: "Profissional", category: "Pagamentos", href: "/docs/pagamentos#saldo" },
  { name: "clientes", subcommands: ["vincular"], description: "Entrega o cargo de clientes a quem já comprou", permission: "Gerenciar clientes", plan: "—", category: "Clientes", href: "/docs/comandos#clientes" },
  { name: "dm", description: "Mensagem privada para um membro", permission: "Gerenciar clientes", plan: "Profissional", category: "Clientes", href: "/docs/comandos#dm" },
  { name: "ticket", subcommands: ["configurar", "definir"], description: "Sistema de tickets", permission: "Configurações", plan: "—", category: "Atendimento", href: "/docs/tickets" },
  { name: "plano", subcommands: ["adquirir", "gerenciar", "resgatar"], description: "Compra, renovação e resgate de planos", permission: "Configurações", plan: "—", category: "Conta e bot", href: "/docs/comprar-plano" },
  { name: "integracoes", description: "Chaves de API e integrações (exige login)", permission: "Configurações", plan: "—", category: "Conta e bot", href: "/docs/painel#integrações" },
  { name: "bot", description: "Personaliza o bot ou gerencia o bot exclusivo", permission: "Gerenciar Bot", plan: "Essencial", category: "Conta e bot", href: "/docs/bot-exclusivo" },
  { name: "automacoes", description: "Automações da loja", permission: "Gerenciar Bot", plan: "Bot exclusivo", category: "Conta e bot", href: "/docs/bot-exclusivo#automações" },
  { name: "voz", subcommands: ["conectar", "desconectar"], description: "Conecta o bot a um canal de voz", permission: "Gerenciar Bot", plan: "—", category: "Conta e bot", href: "/docs/comandos#voz" },
  { name: "perfil", description: "Seu histórico de compras", permission: "—", plan: "—", category: "Clientes", href: "/docs/comandos#perfil" },
  { name: "carteira", description: "Sua carteira ShopEasy (exige login)", permission: "—", plan: "—", category: "Pagamentos", href: "/docs/pagamentos#carteira-shopeasy" },
];
