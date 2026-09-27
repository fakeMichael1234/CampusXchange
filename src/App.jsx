import React, { useState, useEffect } from 'react';
import { StoreProvider } from './context/StoreContext';
import { ThemeProvider } from './context/ThemeContext';
import { Toast } from './components/ui/Toast';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { MarketplacePage } from './pages/MarketplacePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { AboutPage } from './pages/AboutPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { AdminPanelPage } from './pages/AdminPanelPage';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { DashboardOverview } from './pages/dashboard/DashboardOverview';
import { MyListingsPage } from './pages/dashboard/MyListingsPage';
import { CreateListingPage } from './pages/dashboard/CreateListingPage';
import { EditListingPage } from './pages/dashboard/EditListingPage';
import { OrdersPage } from './pages/dashboard/OrdersPage';
import { PurchasesPage } from './pages/dashboard/PurchasesPage';
import { WishlistPage } from './pages/dashboard/WishlistPage';
import { MessagesPage } from './pages/dashboard/MessagesPage';
import { ProfilePage } from './pages/dashboard/ProfilePage';
import { SettingsPage } from './pages/dashboard/SettingsPage';
import { NotificationsPage } from './pages/dashboard/NotificationsPage';

export function MainApp() {
  // Simple & Robust URL / Hash State Router for SPA functionality
  const [currentPath, setCurrentPath] = useState(() => {
    const hash = window.location.hash.replace('#', '');
    return hash || '/';
  });

  const navigateTo = (path) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      setCurrentPath(hash || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Determine standard route
  const renderRoute = () => {
    // Product Detail Route: /product/:id
    if (currentPath.startsWith('/product/')) {
      const productId = currentPath.split('/product/')[1];
      return <ProductDetailPage productId={productId} onNavigate={navigateTo} />;
    }

    // Edit Listing Route: /dashboard/listings/:id/edit
    if (currentPath.includes('/listings/') && currentPath.endsWith('/edit')) {
      const productId = currentPath.split('/listings/')[1].replace('/edit', '');
      return (
        <DashboardLayout currentPath={currentPath} onNavigate={navigateTo}>
          <EditListingPage productId={productId} onNavigate={navigateTo} />
        </DashboardLayout>
      );
    }

    // Dashboard Routes (Wrapped in DashboardLayout)
    if (currentPath.startsWith('/dashboard')) {
      let content = <DashboardOverview onNavigate={navigateTo} />;

      if (currentPath === '/dashboard/listings') {
        content = <MyListingsPage onNavigate={navigateTo} />;
      } else if (currentPath === '/dashboard/listings/create') {
        content = <CreateListingPage onNavigate={navigateTo} />;
      } else if (currentPath === '/dashboard/orders') {
        content = <OrdersPage onNavigate={navigateTo} />;
      } else if (currentPath === '/dashboard/purchases') {
        content = <PurchasesPage onNavigate={navigateTo} />;
      } else if (currentPath === '/dashboard/wishlist') {
        content = <WishlistPage onNavigate={navigateTo} />;
      } else if (currentPath === '/dashboard/messages') {
        content = <MessagesPage onNavigate={navigateTo} />;
      } else if (currentPath === '/dashboard/profile') {
        content = <ProfilePage onNavigate={navigateTo} />;
      } else if (currentPath === '/dashboard/settings') {
        content = <SettingsPage onNavigate={navigateTo} />;
      } else if (currentPath === '/dashboard/notifications') {
        content = <NotificationsPage onNavigate={navigateTo} />;
      }

      return (
        <DashboardLayout currentPath={currentPath} onNavigate={navigateTo}>
          {content}
        </DashboardLayout>
      );
    }

    // Public & Admin Routes
    switch (currentPath) {
      case '/login':
        return <LoginPage onNavigate={navigateTo} />;
      case '/signup':
        return <SignupPage onNavigate={navigateTo} />;
      case '/marketplace':
        return <MarketplacePage onNavigate={navigateTo} />;
      case '/about':
        return <AboutPage onNavigate={navigateTo} />;
      case '/how-it-works':
        return <HowItWorksPage onNavigate={navigateTo} />;
      case '/admin':
        return <AdminPanelPage onNavigate={navigateTo} />;
      case '/':
      default:
        return <LandingPage onNavigate={navigateTo} />;
    }
  };

  return (
    <>
      {renderRoute()}
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <StoreProvider>
        <MainApp />
      </StoreProvider>
    </ThemeProvider>
  );
}
