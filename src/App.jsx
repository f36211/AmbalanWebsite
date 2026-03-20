import React, { useEffect, useState, useRef } from "react";
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
import Breadcrumb from "./components/ui/Breadcrumb";
import AdminApp from "./components/admin/AdminApp";
import Filosofi from "./components/filosofi.jsx";
import Achievements from "./components/Achievements.jsx";
import LoadingScreen from "./components/ui/LoadingScreen.jsx";

// Import all components from components folder
import TentangKami from "./components/TentangKami";
import StrukturOrganisasi from "./components/StrukturOrganisasi";
import FotoKegiatan from "./components/FotoKegiatan";
import FotoPurnaAmbalan from "./components/FotoPurnaAmbalan";
import SeragamPramuka from "./components/SeragamPramuka";
import MateriPramuka from "./components/MateriPramuka";

// Route-specific visibility hook
const useRouteVisibility = () => {
  const [isVisible, setIsVisible] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  const observerRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    // Clear previous visibility state when route changes
    setIsVisible({});
    setIsScrolled(window.scrollY > 50);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    // Create new intersection observer for each route
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        const newVisibility = {};
        entries.forEach((entry) => {
          if (entry.target.id) {
            newVisibility[entry.target.id] = entry.isIntersecting;
          }
        });

        if (Object.keys(newVisibility).length > 0) {
          setIsVisible((prev) => ({ ...prev, ...newVisibility }));
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px 0px -50px 0px",
      },
    );

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Function to observe elements with retry mechanism
    const observeElements = (attempts = 0) => {
      if (attempts >= 10) return; // Max 10 attempts

      const elements = document.querySelectorAll("[data-animate]");
      if (elements.length > 0) {
        // Set initial visibility for elements already in viewport
        const initialVisibility = {};
        elements.forEach((el) => {
          if (el.id && observerRef.current) {
            const rect = el.getBoundingClientRect();
            const isInViewport =
              rect.top < window.innerHeight && rect.bottom > 0;
            initialVisibility[el.id] = isInViewport;
            observerRef.current.observe(el);
          }
        });

        if (Object.keys(initialVisibility).length > 0) {
          setIsVisible((prev) => ({ ...prev, ...initialVisibility }));
        }
      } else {
        // Retry after a short delay if elements not found
        setTimeout(() => observeElements(attempts + 1), 100);
      }
    };

    // Start observing after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(() => observeElements(), 100);

    return () => {
      clearTimeout(timeoutId);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]); // Re-run when route changes

  return { isVisible, isScrolled };
};

// Home component that contains all the sections from the original single-page layout
const Home = ({ onModalStateChange }) => {
  const { isVisible } = useRouteVisibility();

  return (
    <div className="relative">
      <Hero isVisible={isVisible} onModalStateChange={onModalStateChange} />
      <TentangKami isVisible={isVisible} />
      <LeadershipHistory isVisible={isVisible} />
    </div>
  );
};

// Wrapper component for individual route pages
const PageWrapper = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <div className="pt-20 min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!isHomePage && <Breadcrumb />}
        {children}
      </div>
    </div>
  );
};

// Full-size wrapper for SVG or full-screen components (no padding, no container)
const FullSizeWrapper = ({ children }) => {
  return <div className="pt-10 min-h-screen relative w-full">{children}</div>;
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
const RouteComponent = ({ Component, isFullSize = false }) => {
  const { isVisible } = useRouteVisibility();
  const [showContent, setShowContent] = useState(false);
  const [enhancedVisibility, setEnhancedVisibility] = useState({});

  useEffect(() => {
    // Show content immediately, then let animations enhance the experience
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // Move DOM query into useEffect instead of running on every render
  useEffect(() => {
    const elements = document.querySelectorAll("[data-animate]");
    const newVisibility = {};
    elements.forEach((el) => {
      if (el.id) {
        newVisibility[el.id] = showContent || isVisible[el.id] === true;
      }
    });
    setEnhancedVisibility(newVisibility);
  }, [showContent, isVisible]);

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
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  handleCopyError = () => {
    const errorText = `Error: ${this.state.error?.toString()}\n\nStack Trace:\n${this.state.errorInfo?.componentStack}`;
    navigator.clipboard
      .writeText(errorText)
      .then(() => {
        alert("Error details copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy error: ", err);
      });
  };

  handleReload = () => {
    // Clear caches if possible (standard reload usually sufficient)
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50 p-4">
          <div className="text-center p-8 bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-orange-100 max-w-lg w-full">
            <div className="mb-6 relative">
              <div className="absolute inset-0 bg-red-100 rounded-full w-24 h-24 mx-auto animate-pulse opacity-50"></div>
              <img
                src="/images/logo/LogoTransparant.webp"
                alt="Error Illustration"
                loading="lazy"
                className="w-24 h-24 mx-auto relative z-10 object-contain drop-shadow-md"
              />
            </div>

            <h1 className="text-2xl font-bold text-red-600 mb-2">
              Oops! Something went wrong.
            </h1>
            <p className="text-gray-600 mb-6 text-sm">
              We're sorry, but an unexpected error occurred.
            </p>

            <div className="flex flex-col gap-3 justify-center sm:flex-row">
              <button
                onClick={this.handleReload}
                className="px-6 py-2.5 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-lg hover:shadow-lg hover:from-orange-700 hover:to-red-700 transition-all duration-300 font-medium text-sm flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Reload Page
              </button>

              <button
                onClick={this.handleCopyError}
                className="px-6 py-2.5 bg-white text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-medium text-sm flex items-center justify-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                  />
                </svg>
                Copy Error Details
              </button>
            </div>

            {/* Optional: Show error message in dev mode or behind a toggle */}
            <details className="mt-8 text-left border-t pt-4">
              <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600 transition-colors list-none text-center">
                Show technical details
              </summary>
              <div className="mt-2 p-3 bg-gray-50 rounded text-xs text-mono text-red-800 overflow-auto max-h-40 whitespace-pre-wrap border border-red-100">
                {this.state.error && this.state.error.toString()}
              </div>
            </details>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Route title mapping for dynamic document titles
const routeTitles = {
  "/": "Ambalan SMAIT Ummul Quro Bogor",
  "/tentang-kami": "Tentang Kami | Ambalan SMAIT Ummul Quro",
  "/foto-kegiatan": "Foto Kegiatan | Ambalan SMAIT Ummul Quro",
  "/foto-purna-ambalan": "Foto Purna Ambalan | Ambalan SMAIT Ummul Quro",
  "/seragam": "Seragam Pramuka | Ambalan SMAIT Ummul Quro",
  "/materi-pramuka": "Materi Pramuka | Ambalan SMAIT Ummul Quro",
  "/struktur-organisasi": "Struktur Organisasi | Ambalan SMAIT Ummul Quro",
  "/filosofi": "Filosofi Logo | Ambalan SMAIT Ummul Quro",
  "/achievements": "Prestasi | Ambalan SMAIT Ummul Quro",
  "/admin": "Admin Panel | Ambalan SMAIT Ummul Quro",
};

const AppContent = () => {
  const { isScrolled } = useScrollAndAnimation();
  const location = useLocation();

  // MODAL STATE MANAGEMENT
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Loading State Management — only for initial page load, not route changes
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const loadStartTime = useRef(null);

  // Dynamic document title based on route
  useEffect(() => {
    document.title = routeTitles[location.pathname] || "Ambalan SMAIT Ummul Quro Bogor";
  }, [location.pathname]);

  // Effect for initial page load only
  useEffect(() => {
    loadStartTime.current = Date.now();

    const handleInitialLoad = () => {
      const loadDuration = Date.now() - loadStartTime.current;
      const minLoadTime = 600;
      const remainingTime = Math.max(0, minLoadTime - loadDuration);

      setTimeout(() => {
        setIsPageLoading(false);
        setIsInitialLoad(false);
      }, remainingTime);
    };

    if (document.readyState === "complete") {
      handleInitialLoad();
    } else {
      window.addEventListener("load", handleInitialLoad, { once: true });

      const fallbackTimeout = setTimeout(handleInitialLoad, 2000);

      return () => {
        window.removeEventListener("load", handleInitialLoad);
        clearTimeout(fallbackTimeout);
      };
    }
  }, []);

  // Full screen loading only on initial load
  const isFullScreenLoading = isInitialLoad;

  // Handle modal state changes from Hero component
  const handleModalStateChange = (modalState) => {
    setIsModalOpen(modalState);
  };

  // Reset modal state when route changes
  useEffect(() => {
    setIsModalOpen(false);
  }, [location]);

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 relative"
    >
      <LoadingScreen
        isLoading={isPageLoading}
        isInitialLoad={isFullScreenLoading}
      />
      <GlobalStyles />
      <ScrollToTop />

      {/* Global Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
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
      <main id="main-content" className={`relative z-10`}>
        <ErrorBoundary>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              {/* HOME ROUTE WITH MODAL STATE HANDLER */}
              <Route
                path="/"
                element={<Home onModalStateChange={handleModalStateChange} />}
              />

              {/* Regular routes with PageWrapper */}
              <Route
                path="/tentang-kami"
                element={<RouteComponent Component={TentangKami} />}
              />
              <Route
                path="/foto-kegiatan"
                element={<RouteComponent Component={FotoKegiatan} />}
              />
              <Route
                path="/foto-purna-ambalan"
                element={<RouteComponent Component={FotoPurnaAmbalan} />}
              />
              <Route
                path="/seragam"
                element={<RouteComponent Component={SeragamPramuka} />}
              />
              <Route
                path="/materi-pramuka"
                element={
                  <RouteComponent Component={MateriPramuka} isFullSize={true} />
                }
              />
              <Route
                path="/admin"
                element={<RouteComponent Component={AdminApp} />}
              />

              {/* Full-size routes (SVG, diagrams, charts, etc.) */}
              <Route
                path="/struktur-organisasi"
                element={
                  <RouteComponent
                    Component={StrukturOrganisasi}
                    isFullSize={true}
                  />
                }
              />
              <Route
                path="/filosofi"
                element={
                  <RouteComponent Component={Filosofi} isFullSize={true} />
                }
              />
              <Route
                path="/achievements"
                element={
                  <RouteComponent Component={Achievements} isFullSize={true} />
                }
              />

              {/* 404 Route */}
              <Route
                path="*"
                element={
                  <PageWrapper>
                    <div className="text-center py-20">
                      <h1 className="text-4xl font-bold text-gray-600 mb-4">
                        404
                      </h1>
                      <p className="text-gray-500 mb-8">
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
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <ErrorBoundary>
      <Router>
        <AppContent />
      </Router>
    </ErrorBoundary>
  );
};

export default App;
