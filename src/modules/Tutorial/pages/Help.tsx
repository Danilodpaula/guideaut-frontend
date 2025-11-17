// Help.tsx
// Página de Ajuda (FAQ) do GuideAut
// Exibe perguntas frequentes divididas por categorias, com busca dinâmica e suporte multilíngue (pt-BR/en-US).

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useI18n } from "@/core/i18n/I18nContext";
import {
  Search as SearchIcon,
  BookOpen,
  MessageCircle,
  Mail,
} from "lucide-react";

/**
 * 💬 Componente principal da página de Ajuda (FAQ)
 * Permite aos usuários buscar respostas sobre uso geral, acessibilidade e administração.
 */
export default function Help() {
  const { t, language } = useI18n();
  const [searchTerm, setSearchTerm] = useState("");

  /**
   * 📚 Base de perguntas e respostas multilíngue.
   * Organizada por categoria e ícone para melhor experiência visual.
   */
  const faqData =
    language === "pt-BR"
      ? [
          {
            category: "Primeiros Passos",
            icon: BookOpen,
            questions: [
              {
                q: "Como faço para começar a usar o GuideAut?",
                a: "Após fazer login, você terá acesso ao painel principal. Navegue pelo menu lateral para explorar as funcionalidades disponíveis. Recomendamos começar configurando suas preferências de acessibilidade em Configurações.",
              },
              {
                q: "Como personalizo a interface?",
                a: "Acesse Configurações > Acessibilidade no menu do usuário (canto superior direito). Lá você pode ajustar o tema (claro/escuro), tamanho da fonte e reduzir animações.",
              },
              {
                q: "Preciso aceitar os termos de uso?",
                a: "Sim, na primeira vez que acessar o sistema após o login, você será solicitado a aceitar os termos de uso. Isso é necessário para continuar usando a plataforma.",
              },
            ],
          },
          {
            category: "Acessibilidade",
            icon: MessageCircle,
            questions: [
              {
                q: "Quais recursos de acessibilidade estão disponíveis?",
                a: "O GuideAut oferece: tema claro e escuro com alto contraste, controle de tamanho de fonte (pequeno, médio, grande), opção para reduzir animações, navegação completa por teclado, e suporte a leitores de tela.",
              },
              {
                q: "Como ativo o modo de redução de animações?",
                a: "Vá em Configurações > Acessibilidade e ative a opção 'Reduzir animações'. Isso minimizará todas as transições e efeitos visuais, tornando a interface mais estável e confortável.",
              },
              {
                q: "Minhas preferências são salvas?",
                a: "Sim! Todas as suas configurações de acessibilidade são salvas automaticamente e aplicadas sempre que você fizer login.",
              },
            ],
          },
          {
            category: "Administração",
            icon: Mail,
            questions: [
              {
                q: "Quem pode acessar o painel administrativo?",
                a: "Apenas usuários com papel de ADMIN têm acesso às funcionalidades administrativas como gerenciamento de usuários, papéis, categorias e auditoria.",
              },
              {
                q: "Como adiciono novos usuários?",
                a: "Na seção Administração > Usuários, clique no botão 'Criar Usuário'. Preencha os dados necessários e atribua os papéis apropriados.",
              },
              {
                q: "O que é o log de auditoria?",
                a: "O log de auditoria registra todas as ações importantes realizadas no sistema, incluindo login, alterações de dados e ações administrativas. Isso garante transparência e rastreabilidade.",
              },
            ],
          },
        ]
      : [
          {
            category: "Getting Started",
            icon: BookOpen,
            questions: [
              {
                q: "How do I start using GuideAut?",
                a: "After logging in, you'll have access to the main dashboard. Navigate through the sidebar menu to explore available features. We recommend starting by configuring your accessibility preferences in Settings.",
              },
              {
                q: "How do I customize the interface?",
                a: "Go to Settings > Accessibility in the user menu (top right corner). There you can adjust the theme (light/dark), font size, and reduce animations.",
              },
              {
                q: "Do I need to accept the terms of use?",
                a: "Yes, the first time you access the system after logging in, you'll be asked to accept the terms of use. This is required to continue using the platform.",
              },
            ],
          },
          {
            category: "Accessibility",
            icon: MessageCircle,
            questions: [
              {
                q: "What accessibility features are available?",
                a: "GuideAut offers: light and dark theme with high contrast, font size control (small, medium, large), option to reduce animations, full keyboard navigation, and screen reader support.",
              },
              {
                q: "How do I enable motion reduction?",
                a: "Go to Settings > Accessibility and enable the 'Reduce motion' option. This will minimize all transitions and visual effects, making the interface more stable and comfortable.",
              },
              {
                q: "Are my preferences saved?",
                a: "Yes! All your accessibility settings are automatically saved and applied whenever you log in.",
              },
            ],
          },
          {
            category: "Administration",
            icon: Mail,
            questions: [
              {
                q: "Who can access the admin panel?",
                a: "Only users with ADMIN role have access to administrative features like user management, roles, categories, and audit logs.",
              },
              {
                q: "How do I add new users?",
                a: "In the Administration > Users section, click the 'Create User' button. Fill in the required information and assign appropriate roles.",
              },
              {
                q: "What is the audit log?",
                a: "The audit log records all important actions performed in the system, including logins, data changes, and administrative actions. This ensures transparency and traceability.",
              },
            ],
          },
        ];

  /**
   * 🔍 Filtra perguntas conforme o termo digitado.
   */
  const filteredFaq = faqData
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (item) =>
          item.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.a.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    }))
    .filter((category) => category.questions.length > 0);

  return (
    <div className="flex-1 space-y-6 p-6 animate-fade-in">
      {/* Cabeçalho da página */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{t("nav.help")}</h1>
        <p className="text-muted-foreground mt-2">
          {language === "pt-BR"
            ? "Encontre respostas para as perguntas mais comuns"
            : "Find answers to frequently asked questions"}
        </p>
      </div>

      {/* Campo de busca */}
      <Card>
        <CardHeader>
          <CardTitle>{t("common.search")}</CardTitle>
          <CardDescription>
            {language === "pt-BR"
              ? "Digite sua dúvida ou palavra-chave"
              : "Type your question or keyword"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <SearchIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder={
                language === "pt-BR" ? "Buscar ajuda..." : "Search help..."
              }
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Categorias com perguntas */}
      <div className="space-y-6">
        {filteredFaq.map((category, idx) => {
          const Icon = category.icon;
          return (
            <Card key={idx} className="animate-scale-in">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <CardTitle>{category.category}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible>
                  {category.questions.map((item, qIdx) => (
                    <AccordionItem key={qIdx} value={`item-${idx}-${qIdx}`}>
                      <AccordionTrigger className="text-left hover:text-primary transition-colors">
                        {item.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Caso não haja resultados */}
      {filteredFaq.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">
              {language === "pt-BR"
                ? "Nenhum resultado encontrado. Tente outra palavra-chave."
                : "No results found. Try another keyword."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
