import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { ScrollToTop } from './ScrollToTop';
import { CartDrawer } from '@/components/cart';
import { LoginModal } from '@/components/auth';

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <LoginModal />
    </div>
  );
}
