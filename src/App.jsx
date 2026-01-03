import React, { useEffect, useState, useRef, lazy, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Link,
} from "react-router-dom";
import { useScrollAndAnimation } from "./hooks/useScrollAndAnimation";
import Navigation from "./components/Hero/Navigation";
import Hero from "./components/Hero/Hero";
import LeadershipHistory from "./components/Hero/LeadershipHistory";
import Footer from "./components/Hero/Footer";
import GlobalStyles from "./components/Hero/GlobalStyles";
import Breadcrumb from './components/ui/Breadcrumb';
import LoadingScreen from "./components/ui/LoadingScreen.jsx";

// Import all components from components folder using React.lazy
const TentangKami = lazy(() => import("./components/TentangKami"));
const StrukturOrganisasi = lazy(() => import("./components/StrukturOrganisasi"));
const FotoKegiatan = lazy(() => import("./components/FotoKegiatan"));
const FotoPurnaAmbalan = lazy(() => import("./components/FotoPurnaAmbalan"));
const SeragamPramuka = lazy(() => import("./components/SeragamPramuka"));
const MateriPramuka = lazy(() => import("./components/MateriPramuka"));

const Filosofi = lazy(() => import("./components/filosofi.jsx"));
const Achievements = lazy(() => import("./components/Achievements.jsx"));

// Admin components
const LoginPage = lazy(() => import('./components/admin/LoginPage'));
const AdminPageEditor = lazy(() => import('./components/admin/AdminPageEditor'));
const ProtectedRoute = lazy(() => import('./components/admin/ProtectedRoute'));
const AdminIndexPage = lazy(() => import('./components/admin/AdminIndexPage'));

import { usePageData } from "./hooks/usePageData.js";

const Home = ({ onModalStateChange, isVisible }) => {
  const { pageData, loading, error } = usePageData('home');

  if (loading) {
    // We can return a specific loader for the home content
    return <div style={{minHeight: '100vh'}}>{/* Placeholder for loader */}</div>;
  }

  if (error) {
    return <div style={{minHeight: '100vh', padding: '4rem', textAlign: 'center'}}>Could not load page content.</div>;
  }

  // Find the specific sections from the fetched data
  const heroContent = pageData?.sections.find(s => s.type === 'hero')?.content;
  const tentangKamiContent = pageData?.sections.find(s => s.type === 'tentangKami')?.content;
  const leadershipHistoryContent = pageData?.sections.find(s => s.type === 'leadershipHistory')?.content;

  return (
    <div className="relative">
      {heroContent && <Hero 
        data={heroContent}
        isVisible={isVisible} 
        onModalStateChange={onModalStateChange}
      />}
      {tentangKamiContent && <TentangKami data={tentangKamiContent} isVisible={isVisible} />}
      {leadershipHistoryContent && <LeadershipHistory data={leadershipHistoryContent} isVisible={isVisible} />}
    </div>
  );
};

// Wrapper component for individual route pages
const PageWrapper = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  console.log('PageWrapper rendered for path:', location.pathname);

  return (
    <div className="relative min-h-screen pt-20">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {!isHomePage && <Breadcrumb />}
        {children}
      </div>
    </div>
  );
};

// Full-size wrapper for SVG or full-screen components (no padding, no container)
const FullSizeWrapper = ({ children }) => {
  return (
    <div className="relative w-full min-h-screen pt-10">
      {children}
    </div>
  );
};

// Component to handle scroll reset on route change
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
};

// Enhanced route component with proper visibility handling
// eslint-disable-next-line no-unused-vars
const RouteComponent = ({ Component, isFullSize = false, isVisible }) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content immediately, then let animations enhance the experience
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 50);

    return () => clearTimeout(timer);
  },
  []);

  // Create enhanced visibility that shows content by default
  const enhancedVisibility = {};
  const elements = document.querySelectorAll("[data-animate]");
  elements.forEach((el) => {
    if (el.id) {
      // Show content if showContent is true OR if intersection observer detected it
      enhancedVisibility[el.id] = showContent || isVisible[el.id] === true;
    }
  });

  const pageVariants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    in: {
      opacity: 1,
      y: 0,
    },
    out: {
      opacity: 0,
      y: -20,
    },
  };

  const pageTransition = {
    type: "tween",
    ease: "anticipate",
    duration: 0.5,
  };

  const WrapperComponent = isFullSize ? FullSizeWrapper : PageWrapper;

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <WrapperComponent>
        <Component isVisible={enhancedVisibility} />
      </WrapperComponent>
    </motion.div>
  );
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
          <div className="p-8 text-center">
            <img 
              src="/images/logo/LogoTransparant.webp" 
              alt="Error Illustration" 
              className="w-64 h-64 mx-auto mb-8" 
            />
            <h1 className="mb-4 text-2xl font-bold text-red-600">
              Oops! Something went wrong.
            </h1>
            <p className="mb-4 text-gray-600">
              We're sorry, but it seems like there's a technical issue. Please try again later.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const AppContent = () => {
  const { isVisible, isScrolled, refreshObserver } = useScrollAndAnimation();
  const location = useLocation();
  
  // MODAL STATE MANAGEMENT
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Loading State Management
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true); // Changed from useRef to useState
  const loadStartTime = useRef(null);

  // Effect for initial page load
  useEffect(() => {
    loadStartTime.current = Date.now();
    
    const handleInitialLoad = () => {
      const loadDuration = Date.now() - loadStartTime.current;
      const minLoadTime = 600; // Reduced from 1000ms to 600ms for faster initial load
      const remainingTime = Math.max(0, minLoadTime - loadDuration);

      setTimeout(() => {
        setIsPageLoading(false);
        setIsInitialLoad(false); // Changed from isInitialLoad.current = false
      }, remainingTime);
    };

    // Check if the document is already loaded
    if (document.readyState === 'complete') {
      handleInitialLoad();
    } else {
      window.addEventListener('load', handleInitialLoad, { once: true });
      
      // Fallback timeout in case load event doesn't fire
      const fallbackTimeout = setTimeout(handleInitialLoad, 2000); // Reduced from 3000ms
      
      return () => {
        window.removeEventListener('load', handleInitialLoad);
        clearTimeout(fallbackTimeout);
      };
    }
  }, []);

  // Effect for handling loading screen on route changes
  useEffect(() => {
    // Don't run this on the initial load
    if (isInitialLoad) {
      return;
    }

    // Show loading screen
    setIsPageLoading(true);
    loadStartTime.current = Date.now();

    // Hide loading screen after a minimum display time
    const minLoadTime = 500; // Reduced from 800ms to 500ms for snappier route changes
    const navigationLoadTimer = setTimeout(() => {
      setIsPageLoading(false);
    }, minLoadTime);

    return () => {
      clearTimeout(navigationLoadTimer);
    };
  }, [location.pathname, isInitialLoad]);

  useEffect(() => {
    if (!isInitialLoad) {
      refreshObserver();
    }
  }, [location.pathname, isInitialLoad, refreshObserver]);

  // Determine if we should show full-screen loading
  // Full screen when: initial load OR navigating to home page
  const isFullScreenLoading = isInitialLoad || location.pathname === "/";

  // Handle modal state changes from Hero component
  const handleModalStateChange = (modalState) => {
    setIsModalOpen(modalState);
  };

  // Reset modal state when route changes
  useEffect(() => {
    setIsModalOpen(false);
    
    // Clear any ongoing animations or timeouts here if needed
    return () => {
      // Cleanup function
    };
  }, [location]);

  const handleTouchStart = () => {
    // Touch handlers can be added here if needed for global gestures
  };

  const handleTouchMove = () => {
    // Touch handlers can be added here if needed for global gestures
  };

  const handleTouchEnd = () => {
    // Touch handlers can be added here if needed for global gestures
  };

  return (
    <div
      className="relative min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <LoadingScreen isLoading={isPageLoading} isInitialLoad={isFullScreenLoading} />
      <GlobalStyles />
      <ScrollToTop />

      {/* Global Background Pattern */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5c0b08]/5 via-[#903d04]/3 to-[#9c7502]/5"></div>
      </div>

      {/* NAVIGATION WITH MODAL STATE */}
      <Navigation 
        isPageLoading={isPageLoading}
        isInitialLoad={isFullScreenLoading}
        isScrolled={isScrolled} 
        isModalOpen={isModalOpen}
      />

      {/* Main Content Area with Routes */}
      <main className={`relative z-10`}>
        <ErrorBoundary>
          <Suspense fallback={<LoadingScreen isLoading={true} isInitialLoad={isFullScreenLoading} />}>
            <AnimatePresence mode="wait">
              <Routes location={location} key={location.pathname}>
                {/* ADMIN ROUTES */}
                <Route path="/admin/login" element={<LoginPage />} />
                <Route
                  path="/admin/edit/:slug"
                  element={
                    <ProtectedRoute>
                      <AdminPageEditor />
                    </ProtectedRoute>
                  }
                />

                {/* HOME ROUTE WITH MODAL STATE HANDLER */}
                <Route 
                  path="/" 
                  element={
                    <Home onModalStateChange={handleModalStateChange} isVisible={isVisible} />
                  } 
                />
                
                {/* Regular routes with PageWrapper */}
                <Route
                  path="/tentang-kami"
                  element={<RouteComponent Component={TentangKami} isVisible={isVisible} />}
                />
                <Route
                  path="/foto-kegiatan"
                  element={<RouteComponent Component={FotoKegiatan} isVisible={isVisible} />}
                />
                <Route
                  path="/foto-purna-ambalan"
                  element={<RouteComponent Component={FotoPurnaAmbalan} isVisible={isVisible} />}
                />
                <Route
                  path="/seragam"
                  element={<RouteComponent Component={SeragamPramuka} isVisible={isVisible} />}
                />
                <Route
                  path="/materi-pramuka"
                  element={<RouteComponent Component={MateriPramuka} isFullSize={true} isVisible={isVisible} />}
                />
                <Route
                  path="/admin"
                  element={<AdminIndexPage />}
                />
                
                {/* Full-size routes (SVG, diagrams, charts, etc.) */}
                <Route
                  path="/struktur-organisasi"
                  element={<RouteComponent Component={StrukturOrganisasi} isFullSize={true} isVisible={isVisible} />}
                />
                <Route
                  path="/filosofi"
                  element={<RouteComponent Component={Filosofi} isFullSize={true} isVisible={isVisible} />}
                />
                <Route
                  path="/achievements"
                  element={<RouteComponent Component={Achievements} isFullSize={true} isVisible={isVisible} />}
                />
                
                {/* 404 Route */}
                <Route
                  path="*"
                  element={
                    <PageWrapper>
                      <div className="py-20 text-center">
                        <h1 className="mb-4 text-4xl font-bold text-gray-600">
                          404
                        </h1>
                        <p className="mb-8 text-gray-500">
                          Halaman tidak ditemukan
                        </p>
                        <Link
                          to="/"
                          className="inline-block px-6 py-3 bg-gradient-to-r from-[#5c0b08] to-[#903d04] text-white rounded-lg hover:shadow-lg transition-all duration-300"
                        >
                          Kembali ke Beranda
                        </Link>
                      </div>
                    </PageWrapper>
                  }
                />
              </Routes>
            </AnimatePresence>
          </Suspense>
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
};

import { AuthProvider } from "./contexts/AuthContext";

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </Router>
    </ErrorBoundary>
  );
};

export default App;