import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import CookieConsent from "./components/CookieConsent";
import { AuthProvider } from "./hooks/useAuth";
import { ProtectedRoute } from "./components/admin/ProtectedRoute";

// Code-split secondary routes
const Lp = lazy(() => import("./pages/Lp.tsx"));
const LpAds = lazy(() => import("./pages/LpAds.tsx"));
const Blog = lazy(() => import("./pages/Blog.tsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.tsx"));
const AdminLogin = lazy(() => import("./pages/admin/AdminLogin.tsx"));
const AdminBlog = lazy(() => import("./pages/admin/AdminBlog.tsx"));
const PostEditor = lazy(() => import("./pages/admin/PostEditor.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const RouteFallback = () => (
  <div className="min-h-screen bg-background" aria-hidden />
);

const wrap = (el: React.ReactNode) => (
  <Suspense fallback={<RouteFallback />}>{el}</Suspense>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider delayDuration={150}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/lp" element={wrap(<Lp />)} />
            <Route path="/lp-ads" element={wrap(<LpAds />)} />
            <Route path="/blog" element={wrap(<Blog />)} />
            <Route path="/blog/:slug" element={wrap(<BlogPost />)} />
            <Route path="/admin/login" element={wrap(<AdminLogin />)} />
            <Route
              path="/admin/blog"
              element={wrap(<ProtectedRoute><AdminBlog /></ProtectedRoute>)}
            />
            <Route
              path="/admin/blog/novo"
              element={wrap(<ProtectedRoute><PostEditor /></ProtectedRoute>)}
            />
            <Route
              path="/admin/blog/editar/:id"
              element={wrap(<ProtectedRoute><PostEditor /></ProtectedRoute>)}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={wrap(<NotFound />)} />
          </Routes>
          <CookieConsent />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
