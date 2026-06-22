import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Loader2, LogIn, UserPlus } from "lucide-react";
import logo from "@/assets/turbomr-logo-upload.png";

const AdminLogin = () => {
  const { user, signIn, signUp, loading: authLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (user) navigate("/admin/blog", { replace: true });
  }, [user, navigate]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }
  if (user) return <Navigate to="/admin/blog" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({ title: "Senha muito curta", description: "Mínimo 6 caracteres.", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    const fn = mode === "signin" ? signIn : signUp;
    const { error } = await fn(email.trim(), password);
    setSubmitting(false);
    if (error) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
      return;
    }
    if (mode === "signup") {
      toast({
        title: "Conta criada!",
        description: "Faça login para continuar. O primeiro usuário do sistema vira admin automaticamente.",
      });
      setMode("signin");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background gradient-hero p-4">
      <Helmet>
        <title>Admin — TurboMR</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Card className="w-full max-w-md p-8 border-primary/20 shadow-elegant">
        <div className="text-center mb-6">
          <Link to="/" className="inline-block mb-4">
            <img src={logo} alt="TurboMR" className="h-12 w-auto mx-auto" />
          </Link>
          <h1 className="text-2xl font-bold">{mode === "signin" ? "Entrar no Admin" : "Criar conta admin"}</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {mode === "signin" ? "Acesse o painel do blog" : "Primeiro cadastro vira admin automático"}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="h-11 rounded-xl"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              className="h-11 rounded-xl"
            />
          </div>
          <Button type="submit" disabled={submitting} className="w-full h-11 font-bold">
            {submitting ? (
              <><Loader2 className="w-4 h-4 animate-spin" /> Aguarde…</>
            ) : mode === "signin" ? (
              <><LogIn className="w-4 h-4" /> Entrar</>
            ) : (
              <><UserPlus className="w-4 h-4" /> Cadastrar</>
            )}
          </Button>
        </form>
        <div className="text-center mt-5 text-sm">
          {mode === "signin" ? (
            <button type="button" onClick={() => setMode("signup")} className="text-primary hover:underline">
              Criar conta
            </button>
          ) : (
            <button type="button" onClick={() => setMode("signin")} className="text-primary hover:underline">
              Já tenho conta — entrar
            </button>
          )}
        </div>
      </Card>
    </div>
  );
};

export default AdminLogin;
