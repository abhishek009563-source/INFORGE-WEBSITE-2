import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, Mic, Radio, Rocket, Coins, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import DemoBadge from '../components/common/DemoBadge';

const AboutPage = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      
      {/* HERO SECTION */}
      <div className="text-center space-y-6">
        <DemoBadge text="Echoes Mission & Vision" size="sm" />
        <h1 className="font-display font-black text-4xl sm:text-6xl text-white leading-tight">
          "People carry stories that <span className="text-gradient-purple-cyan">deserve to be heard."</span>
        </h1>
        <p className="text-slate-300 text-lg max-w-2xl mx-auto leading-relaxed">
          Echoes is a Web3 audio storytelling platform built on the belief that human voices are the most intimate, authentic medium for preserving life experiences.
        </p>
      </div>

      {/* CORE VALUES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-dark-800 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center text-brand-purple">
            <Heart className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl text-white">Authentic Human Voice</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Written text loses tone, and video demands vanity. Voice captures emotion, pauses, and authenticity with zero artificial filter.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-dark-800 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-indigo/20 border border-brand-indigo/40 flex items-center justify-center text-brand-indigo">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl text-white">Permanent On-Chain Storage</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Stories are preserved on decentralized storage connected to Solana smart contracts, giving creators true ownership over their audio legacy.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-dark-800 border border-slate-800 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-brand-cyan/20 border border-brand-cyan/40 flex items-center justify-center text-brand-cyan">
            <Coins className="w-6 h-6" />
          </div>
          <h3 className="font-display font-bold text-xl text-white">The Voice Economy</h3>
          <p className="text-sm text-slate-400 leading-relaxed">
            Listeners collect story token editions. Whenever tokens trade on secondary markets, creators receive perpetual automated royalties.
          </p>
        </div>
      </div>

      {/* DETAILED MISSION DEEP DIVE */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-dark-800 via-dark-800 to-brand-purple/10 border border-slate-800 space-y-8">
        <h2 className="font-display font-black text-3xl text-white">Why We Built Echoes</h2>

        <div className="space-y-4 text-slate-300 text-base leading-relaxed">
          <p>
            For decades, centralized media platforms extracted 100% of the financial value from personal stories while treating creators as mere content supply. When platforms change algorithms or shut down, decades of personal narratives vanish overnight.
          </p>
          <p>
            Echoes changes this dynamic by giving every story its own digital economy. Whether you are a startup founder recording lessons from failure, an artist documenting a creative breakthrough, or a grandparent sharing family history—your voice is valued, preserved, and rewarded.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-brand-purple/10 border border-brand-purple/25 space-y-2 text-sm text-slate-300">
          <h4 className="font-bold text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-brand-purple" />
            <span>Early Creator Access & Benefits</span>
          </h4>
          <p className="text-xs text-slate-300 leading-relaxed">
            During our current public demo phase, story token creation is 100% free. Early creators who participate in the public prototype may have early access to future ecosystem perks, verified badges, and priority creator spotlight features.
          </p>
        </div>
      </div>

      {/* EARLY CREATOR CTA */}
      <div className="text-center p-8 sm:p-12 rounded-3xl bg-dark-800 border border-brand-purple/40 space-y-6">
        <h3 className="font-display font-extrabold text-3xl text-white">
          Ready to record your legacy?
        </h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto">
          It takes less than 3 minutes to capture your story on your phone or laptop.
        </p>

        <Link
          to="/create"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-purple via-brand-indigo to-brand-cyan text-white font-bold text-base shadow-xl shadow-brand-purple/30 hover:scale-105 transition-all"
        >
          <Mic className="w-5 h-5" />
          <span>Record Your First Story</span>
        </Link>
      </div>

    </div>
  );
};

export default AboutPage;
