import React from 'react';
import { Link } from 'react-router-dom';
import { Radio, Mic, Compass, Info, User, ExternalLink } from 'lucide-react';
import DemoBadge from './DemoBadge';

const Footer = () => {
  return (
    <footer className="mt-auto bg-dark-900 border-t border-slate-800/80 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* COLUMN 1: BRAND */}
          <div className="md:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-purple to-brand-indigo flex items-center justify-center text-white shadow-md shadow-brand-purple/20">
                <div className="flex items-center gap-0.5">
                  <span className="w-0.5 h-3 bg-white rounded-full" />
                  <span className="w-0.5 h-4 bg-white rounded-full" />
                  <span className="w-0.5 h-2 bg-white rounded-full" />
                </div>
              </div>
              <span className="font-display font-black text-2xl text-white tracking-tight">
                Echoes
              </span>
            </Link>

            <p className="text-base text-slate-300 font-medium italic">
              "Your story. Your voice. Your legacy."
            </p>

            <p className="text-sm text-slate-400 max-w-md leading-relaxed">
              Echoes is a Web3 audio storytelling platform empowering creators to record personal narratives, preserve them on Solana, and participate in a decentralized voice economy.
            </p>

            <div className="pt-2">
              <DemoBadge text="Public Demo Prototype" size="sm" />
            </div>
          </div>

          {/* COLUMN 2: QUICK NAVIGATION */}
          <div>
            <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/explore" className="hover:text-brand-purple transition-colors flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-slate-500" />
                  <span>Explore Stories</span>
                </Link>
              </li>
              <li>
                <Link to="/create" className="hover:text-brand-purple transition-colors flex items-center gap-2">
                  <Mic className="w-3.5 h-3.5 text-slate-500" />
                  <span>Record Story</span>
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-brand-purple transition-colors flex items-center gap-2">
                  <Info className="w-3.5 h-3.5 text-slate-500" />
                  <span>About & Mission</span>
                </Link>
              </li>
              <li>
                <Link to="/profile" className="hover:text-brand-purple transition-colors flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  <span>Creator Profile</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* COLUMN 3: COMMUNITY & APP LINKS */}
          <div>
            <h4 className="font-display font-bold text-white text-sm tracking-wider uppercase mb-4">
              Community & App
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://app.echoes.fans/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-dark-800 border border-slate-700/80 hover:border-brand-purple/50 text-white font-medium hover:text-brand-purple transition-all group"
                >
                  <span>Launch Echoes App</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-purple group-hover:translate-x-0.5 transition-all" />
                </a>
              </li>
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-brand-purple transition-colors inline-flex items-center gap-2 text-slate-300"
                >
                  <span className="font-bold text-white">X</span>
                  <span>@EchoesAudio</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Echoes Fans. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Solana Devnet</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
