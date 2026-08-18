import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Radio, Mic, Compass, Info, Wallet, User, Menu, X, LayoutDashboard, Sparkles } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isWalletConnected, walletAddress, openWalletModal } = useWallet();
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Explore', path: '/explore', icon: Compass },
    { name: 'Create', path: '/create', icon: Mic, highlight: true },
    { name: 'How It Works', path: '/#how-it-works', isScroll: true, icon: Radio },
    { name: 'About', path: '/about', icon: Info },
  ];

  const handleNavClick = (link) => {
    setMobileMenuOpen(false);
    if (link.isScroll) {
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById('how-it-works');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const el = document.getElementById('how-it-works');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-dark-900/80 backdrop-blur-xl border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-brand-purple via-brand-indigo to-brand-cyan p-[1px] shadow-lg shadow-brand-purple/25 group-hover:shadow-brand-purple/40 transition-all duration-300">
            <div className="w-full h-full bg-dark-900 rounded-[11px] flex items-center justify-center">
              {/* Soundwave + Orbit Icon */}
              <div className="flex items-center gap-0.5">
                <span className="w-0.5 h-3 bg-brand-purple rounded-full animate-pulse" />
                <span className="w-0.5 h-5 bg-brand-indigo rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                <span className="w-0.5 h-4 bg-brand-cyan rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1">
              <span className="font-display font-black text-2xl tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-brand-purple transition-all">
                Echoes
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-purple animate-ping" />
            </div>
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase font-semibold">
              Voice Legacy
            </span>
          </div>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-1.5 bg-dark-800/60 p-1.5 rounded-2xl border border-slate-800/80">
          {navLinks.map((link) => {
            const Icon = link.icon;

            if (link.isScroll) {
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-slate-300 hover:text-white hover:bg-dark-700/60 transition-all"
                >
                  <Icon className="w-4 h-4 text-slate-400" />
                  <span>{link.name}</span>
                </button>
              );
            }

            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-brand-purple/20 text-white border border-brand-purple/40 shadow-sm'
                      : link.highlight
                      ? 'text-brand-purple hover:bg-brand-purple/10'
                      : 'text-slate-300 hover:text-white hover:bg-dark-700/60'
                  }`
                }
              >
                <Icon className={`w-4 h-4 ${link.highlight ? 'text-brand-purple' : 'text-slate-400'}`} />
                <span>{link.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* DESKTOP RIGHT ACTIONS */}
        <div className="hidden md:flex items-center gap-3">
          {/* Wallet Connect Button */}
          <button
            onClick={openWalletModal}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md ${
              isWalletConnected
                ? 'bg-dark-800 border border-brand-teal/40 text-brand-teal hover:border-brand-teal/80'
                : 'bg-gradient-to-r from-brand-purple to-brand-indigo hover:from-brand-purple/90 hover:to-brand-indigo/90 text-white shadow-brand-purple/20 hover:shadow-brand-purple/40'
            }`}
          >
            <Wallet className="w-4 h-4" />
            <span>
              {isWalletConnected
                ? `${walletAddress.substring(0, 4)}...${walletAddress.substring(walletAddress.length - 4)}`
                : 'Connect Wallet'}
            </span>
          </button>

          {/* Profile & Dashboard Icon Link */}
          <Link
            to="/profile"
            className="w-10 h-10 rounded-xl bg-dark-800 border border-slate-800 hover:border-brand-purple/50 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            title="Creator Profile & Dashboard"
          >
            <User className="w-5 h-5" />
          </Link>
        </div>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2.5 rounded-xl bg-dark-800 border border-slate-800 text-slate-300 hover:text-white"
          aria-label="Toggle mobile navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* MOBILE DRAWER MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark-900/95 border-b border-slate-800 backdrop-blur-2xl overflow-hidden px-4 py-6 space-y-4"
          >
            <div className="space-y-2">
              {navLinks.map((link) => {
                const Icon = link.icon;
                if (link.isScroll) {
                  return (
                    <button
                      key={link.name}
                      onClick={() => handleNavClick(link)}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-slate-300 hover:bg-dark-800"
                    >
                      <Icon className="w-5 h-5 text-slate-400" />
                      <span>{link.name}</span>
                    </button>
                  );
                }

                return (
                  <NavLink
                    key={link.name}
                    to={link.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                        isActive
                          ? 'bg-brand-purple/20 text-white border border-brand-purple/30'
                          : 'text-slate-300 hover:bg-dark-800'
                      }`
                    }
                  >
                    <Icon className="w-5 h-5 text-brand-purple" />
                    <span>{link.name}</span>
                  </NavLink>
                );
              })}
              <NavLink
                to="/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-base font-medium text-slate-300 hover:bg-dark-800"
              >
                <LayoutDashboard className="w-5 h-5 text-brand-cyan" />
                <span>Dashboard</span>
              </NavLink>
            </div>

            <div className="pt-4 border-t border-slate-800 flex flex-col gap-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openWalletModal();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-purple to-brand-indigo"
              >
                <Wallet className="w-5 h-5" />
                <span>{isWalletConnected ? 'Wallet Connected' : 'Connect Wallet'}</span>
              </button>

              <Link
                to="/profile"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium text-slate-300 bg-dark-800 border border-slate-700"
              >
                <User className="w-5 h-5" />
                <span>My Creator Profile</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
