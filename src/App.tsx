import { useState, useCallback } from 'react';
import { useScrollReveal } from '@/hooks/useScrollReveal.ts';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import Collections from "./pages/Collections.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import Bundles from "./pages/Bundles.tsx";
import Account from "./pages/Account.tsx";
import Mission from "./pages/Mission.tsx";
import System from "./pages/System.tsx";
import NotFound from "./pages/NotFound.tsx";
import StacksPage from "./pages/StacksPage.tsx";
import ScrollToTop from "@/components/ScrollToTop";
import ScrollProgress from "@/components/ScrollProgress";
import Navbar from "@/components/Navbar.tsx";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import FullscreenMenu from "@/components/FullscreenMenu";
import type { CartItem } from "@/data/pureload";
import { PRODUCTS } from "@/data/pureload";
import { useNavigate, useLocation } from "react-router-dom";

const queryClient = new QueryClient();

const AppContent = () => {
  const [cartOpen, setCartOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const navigate = useNavigate();
  const location = useLocation();
  useScrollReveal(); // Global scroll-triggered reveal animations

  const addToCart = useCallback((qty: number, price: number, label: string, variantId?: string, isSubscription?: boolean, subscriptionInterval?: number, img?: string) => {
    const productImg = img || PRODUCTS.find(p => p.shopifyVariantId === variantId)?.img;
    setCart(prev => {
      const ex = prev.find(i => i.label === label);
      if (ex) return prev.map(i => i.label === label ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { qty, price, label, variantId, isSubscription, subscriptionInterval, img: productImg }];
    });
    setCartOpen(true);
  }, []);

  const handleGotoSection = useCallback((id: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.pathname, navigate]);

  const updateCartQty = useCallback((index: number, delta: number) => {
    setCart(prev => {
      const next = [...prev];
      next[index] = { ...next[index], qty: next[index].qty + delta };
      if (next[index].qty <= 0) next.splice(index, 1);
      return next;
    });
  }, []);

  const SharedNav = (
    <Navbar
      onOpenMenu={() => setMenuOpen(true)}
      onOpenCart={() => setCartOpen(true)}
      cartCount={cartCount}
      onGotoSection={handleGotoSection}
    />
  );

  return (
    <>
      <CartDrawer open={cartOpen} onClose={() => setCartOpen(false)} cart={cart} onUpdateQty={updateCartQty} />
      <FullscreenMenu open={menuOpen} onClose={() => setMenuOpen(false)} onGotoSection={handleGotoSection} />
      <Routes>
        <Route path="/" element={
          <Index onAddCart={addToCart} onOpenCart={() => setCartOpen(true)} cartCount={cartCount} />
        } />
        <Route path="/collections" element={<>{SharedNav}<Collections /></>} />
        <Route path="/products/:slug" element={<>{SharedNav}<ProductDetail onAddCart={addToCart} /><Footer /></>} />
        <Route path="/bundles" element={<>{SharedNav}<Bundles onAddCart={addToCart} /></>} />
        <Route path="/stacks" element={<>{SharedNav}<StacksPage onAddCart={addToCart} /></>} />
        <Route path="/account" element={<>{SharedNav}<Account /><Footer /></>} />
        <Route path="/mission" element={<>{SharedNav}<Mission /><Footer /></>} />
        <Route path="/system" element={<>{SharedNav}<System /><Footer /></>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <ScrollProgress />
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
