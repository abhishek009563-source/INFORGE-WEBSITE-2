import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import GlobalAudioPlayer from './components/common/GlobalAudioPlayer';
import WalletModal from './components/common/WalletModal';
import Toast from './components/common/Toast';

// Context Providers
import { ToastProvider } from './context/ToastContext';
import { WalletProvider } from './context/WalletContext';
import { AudioProvider } from './context/AudioContext';

// Pages
import LandingPage from './pages/LandingPage';
import ExplorePage from './pages/ExplorePage';
import StoryDetailPage from './pages/StoryDetailPage';
import CreatePage from './pages/CreatePage';
import DashboardPage from './pages/DashboardPage';
import MyStoriesPage from './pages/MyStoriesPage';
import ProfilePage from './pages/ProfilePage';
import AboutPage from './pages/AboutPage';

// Scroll to top component on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const AppContent = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dark-900 text-slate-100 font-sans selection:bg-brand-purple/30 selection:text-brand-purple">
      <ScrollToTop />
      
      {/* STICKY NAVBAR */}
      <Navbar />

      {/* GLOBAL NOTIFICATIONS TOAST */}
      <Toast />

      {/* MOCK WALLET MODAL */}
      <WalletModal />

      {/* MAIN ROUTER CONTENT */}
      <main className="flex-1 pb-28">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/story/:id" element={<StoryDetailPage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/stories" element={<MyStoriesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>

      {/* GLOBAL PERSISTENT AUDIO PLAYER */}
      <GlobalAudioPlayer />

      {/* FOOTER */}
      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <ToastProvider>
      <WalletProvider>
        <AudioProvider>
          <Router>
            <AppContent />
          </Router>
        </AudioProvider>
      </WalletProvider>
    </ToastProvider>
  );
};

export default App;
