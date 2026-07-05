import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard, FileText, Users, Search } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/turbomr-logo-upload.png";

const items = [
  { to: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/leads", label: "Leads", icon: Users },
  { to: "/admin/blog", label: "Blog", icon: FileText },
  { to: "/admin/seo", label: "SEO", icon: Search },
];

export const AdminNav = () => {
  const { signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <Link to="/" aria-label="Site">
            <img src={logo} alt="TurboMR" className="h-9 w-auto" />
          </Link>
          <span className="text-sm text-muted-foreground hidden sm:inline">/ Admin</span>
        </div>
        <nav className="flex items-center gap-1 overflow-x-auto">
          {items.map((it) => {
            const active =
              location.pathname === it.to || location.pathname.startsWith(it.to + "/");
            const Icon = it.icon;
            return (
              <Button
                key={it.to}
                asChild
                variant={active ? "default" : "ghost"}
                size="sm"
              >
                <Link to={it.to}>
                  <Icon className="w-4 h-4" />
                  <span className="hidden md:inline">{it.label}</span>
                </Link>
              </Button>
            );
          })}
          <Button variant="ghost" size="sm" onClick={handleSignOut} aria-label="Sair">
            <LogOut className="w-4 h-4" />
          </Button>
        </nav>
      </div>
    </header>
  );
};
