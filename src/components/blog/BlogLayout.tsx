import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Logo } from "@/components/Logo";

const WHATSAPP = "551153043453";

export const BlogLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-background flex flex-col">
    <header className="border-b border-border bg-background/90 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <Link to="/" className="flex items-center group">
          <Logo symbolClassName="h-8 sm:h-9" />
        </Link>
        <nav className="flex items-center gap-1 sm:gap-3">
          <Button asChild variant="ghost" size="sm">
            <Link to="/"><ArrowLeft className="w-4 h-4" /><span className="hidden sm:inline">Site</span></Link>
          </Button>
          <Button asChild variant="ghost" size="sm">
            <Link to="/blog">Blog</Link>
          </Button>
          <Button asChild size="sm" className="bg-success text-success-foreground hover:bg-success/90">
            <a href={`https://wa.me/${WHATSAPP}?text=Vim%20do%20blog%20TurboMR`} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="w-4 h-4" /><span className="hidden sm:inline">WhatsApp</span>
            </a>
          </Button>
        </nav>
      </div>
    </header>
    <main className="flex-1">{children}</main>
    <footer className="border-t border-white/10 py-7 bg-secondary">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-3 text-center text-xs text-white/60">
        <Logo variant="light" symbolClassName="h-8 sm:h-9" />
        © {new Date().getFullYear()} TurboMR · <Link to="/" className="hover:text-primary">Voltar ao site</Link>
      </div>
    </footer>
  </div>
);
