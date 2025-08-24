import React, { useEffect, useState, useRef } from "react";
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
import AdminApp from "./components/admin/AdminApp";
import Filosofi from "./components/filosofi.jsx";
import Achivements from "./components/achivements.jsx";

// Import all components from components folder (moved from routes/)
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
      }
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
      <Hero 
        isVisible={isVisible} 
        onModalStateChange={onModalStateChange}
      />
      <TentangKami isVisible={isVisible} />
      <LeadershipHistory isVisible={isVisible} />
    </div>
  );
};

// Wrapper component for individual route pages
const PageWrapper = ({ children }) => {
  return (
    <div className="pt-20 min-h-screen relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </div>
  );
};

// Full-size wrapper for SVG or full-screen components (no padding, no container)
const FullSizeWrapper = ({ children }) => {
  return (
    <div className="pt-10 min-h-screen relative w-full">
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
const RouteComponent = ({ Component, isFullSize = false }) => {
  const { isVisible } = useRouteVisibility();
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Show content immediately, then let animations enhance the experience
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 50);

    return () => clearTimeout(timer);
  }, []);

  // Create enhanced visibility that shows content by default
  const enhancedVisibility = {};
  const elements = document.querySelectorAll("[data-animate]");
  elements.forEach((el) => {
    if (el.id) {
      // Show content if showContent is true OR if intersection observer detected it
      enhancedVisibility[el.id] = showContent || isVisible[el.id] === true;
    }
  });

  const WrapperComponent = isFullSize ? FullSizeWrapper : PageWrapper;

  return (
    <WrapperComponent>
      <Component isVisible={enhancedVisibility} />
    </WrapperComponent>
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
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold text-red-600 mb-4">
              Something went wrong
            </h1>
            <p className="text-gray-600 mb-4">
              Please check the console for more details.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
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
  const { isScrolled } = useScrollAndAnimation();
  const location = useLocation();
  
  // MODAL STATE MANAGEMENT - Added this section
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleTouchStart = (e) => {
    // Touch handlers can be added here if needed for global gestures
  };

  const handleTouchMove = (e) => {
    // Touch handlers can be added here if needed for global gestures
  };

  const handleTouchEnd = () => {
    // Touch handlers can be added here if needed for global gestures
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50 relative"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <GlobalStyles />
      <ScrollToTop />

      {/* Global Background Pattern */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-[#5c0b08]/5 via-[#903d04]/3 to-[#9c7502]/5"></div>
      </div>

      {/* UPDATED NAVIGATION WITH MODAL STATE */}
      <Navigation 
        isScrolled={isScrolled} 
        isModalOpen={isModalOpen}
      />

      {/* Main Content Area with Routes */}
      <main className={`relative z-10`}>
        <ErrorBoundary>
          <Routes>
            {/* UPDATED HOME ROUTE WITH MODAL STATE HANDLER */}
            <Route 
              path="/" 
              element={
                <Home onModalStateChange={handleModalStateChange} />
              } 
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
              element={<RouteComponent Component={MateriPramuka} isFullSize={true} />}
            />
            <Route
              path="/admin"
              element={<RouteComponent Component={AdminApp} />}
            />
            
            {/* Full-size routes (SVG, diagrams, charts, etc.) */}
            <Route
              path="/struktur-organisasi"
              element={<RouteComponent Component={StrukturOrganisasi}/>}
            />
            <Route
              path="/filosofi"
              element={<RouteComponent Component={Filosofi} isFullSize={true} />}
            />
            <Route
              path="/achievements"
              element={<RouteComponent Component={Achivements} isFullSize={true} />}
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