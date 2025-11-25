import { Button } from "@/components/ui/button";
import { FileText, ArrowLeft } from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  onBack?: () => void;
}

export function Layout({
  children,
  showBackButton = false,
  onBack,
}: LayoutProps) {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-56 bg-slate-900 text-white flex flex-col">
        <nav className="px-2 py-6 space-y-0.5">
          <button className="w-full text-left px-3 py-2 rounded text-sm hover:bg-slate-800 text-slate-300 flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" />
            Início
          </button>
          <button className="w-full text-left px-3 py-2 rounded text-sm hover:bg-slate-800 text-slate-300 flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" />
            Processo ProAut
          </button>
          <button className="w-full text-left px-3 py-2 rounded text-sm hover:bg-slate-800 text-slate-300 flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" />
            Recomendações
          </button>
          <button className="w-full text-left px-3 py-2 rounded text-sm hover:bg-slate-800 text-slate-300 flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" />
            Padrões de Design
          </button>
          <button className="w-full text-left px-3 py-2 rounded text-sm bg-slate-800 text-white flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" />
            Artefatos
          </button>
          <button className="w-full text-left px-3 py-2 rounded text-sm hover:bg-slate-800 text-slate-300 flex items-center gap-2">
            <FileText className="w-3.5 h-3.5" />
            Ajuda
          </button>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && onBack && (
              <Button variant="ghost" size="icon" onClick={onBack}>
                <ArrowLeft className="w-5 h-5" />
              </Button>
            )}
            <h1 className="text-blue-600">GuideAut</h1>
          </div>
          <Button variant="default" className="gap-2">
            Entrar
          </Button>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
