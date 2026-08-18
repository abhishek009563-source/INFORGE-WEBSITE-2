import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mic, Radio, Compass, Sparkles, Rocket, Coins, ArrowRight, CheckCircle2, Heart } from 'lucide-react';
import { MOCK_STORIES, DEMO_STATS, HOW_IT_WORKS_STEPS } from '../data/mockData';
import StoryCard from '../components/story/StoryCard';
import DemoBadge from '../components/common/DemoBadge';

const LandingPage = () => {
  const featuredStories = MOCK_STORIES.filter((s) => s.isFeatured).slice(0, 3);

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[80vh] flex items-center justify-center pt-8 pb-12 px-4 sm:px-6 lg:px-8">
        
        {/* Background Radial Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-hero-glow pointer-events-none rounded-full blur-3xl animate-pulse-slow" />
        
        <div className="relative max-w-4xl mx-auto text-center space-y-7 z-10">
          
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-purple/10 border border-brand-purple/30 backdrop-blur-md"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
            <span className="text-xs font-semibold text-brand-purple tracking-wide">
              Your story. Your voice. Your legacy.
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.1]"
          >
            Every story deserves an <span className="text-gradient-purple-cyan">echo.</span>
          </motion.h1>

          {/* Supporting Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Echoes is a digital archive where people record personal memoirs, life wisdom, and audio stories—preserving them permanently on Solana as collectible story tokens.
          </motion.p>

          {/* Primary & Secondary Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
          >
            <Link
              to="/create"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-purple via-brand-indigo to-brand-cyan text-white font-bold text-base shadow-xl shadow-brand-purple/25 hover:shadow-brand-purple/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
            >
              <Mic className="w-5 h-5" />
              <span>Record Your Story</span>
            </Link>

            <Link
              to="/explore"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-dark-800/90 border border-slate-700/80 hover:border-brand-purple/50 text-slate-200 hover:text-white font-bold text-base transition-all duration-200 glass-card"
            >
              <Compass className="w-5 h-5 text-brand-purple" />
              <span>Explore Audio Archive</span>
            </Link>
          </motion.div>

          {/* Featured Visual Hero Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="pt-6"
          >
            <div className="relative max-w-2xl mx-auto rounded-3xl overflow-hidden border border-slate-800 bg-dark-800/80 shadow-2xl group">
              <div className="h-48 sm:h-64 relative overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80"
                  alt="Authentic microphone recording studio"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent" />
                
                <div className="absolute bottom-4 left-4 right-4 text-left flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono font-semibold uppercase text-brand-purple bg-brand-purple/20 px-2.5 py-1 rounded-full border border-brand-purple/30">
                      Featured Audio Story
                    </span>
                    <h3 className="text-lg font-bold text-white line-clamp-1">Lessons I Learned at 20 That Saved My 30s</h3>
                    <p className="text-xs text-slate-300">By Alex Vance • 07:24 audio memoir</p>
                  </div>
                  <Link
                    to="/story/story-1"
                    className="w-12 h-12 rounded-2xl bg-brand-purple text-white flex items-center justify-center shadow-lg shadow-brand-purple/40 hover:scale-110 transition-transform shrink-0"
                    aria-label="Listen to featured story"
                  >
                    <Radio className="w-6 h-6" />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 2. DEMO STATISTICS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-dark-800/60 border border-slate-800 p-8 sm:p-12 glass-panel overflow-hidden">
          
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800/80">
            <div>
              <h3 className="font-display font-bold text-xl text-white">Platform Activity Overview</h3>
              <p className="text-xs text-slate-400">Preserving memories through real human voices</p>
            </div>
            <DemoBadge text="Demo Data" size="sm" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {DEMO_STATS.map((stat, idx) => (
              <div key={idx} className="space-y-2">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider block">
                  {stat.label}
                </span>
                <h4 className="font-display font-black text-3xl sm:text-4xl text-gradient-purple-cyan">
                  {stat.value}
                </h4>
                <p className="text-xs text-slate-400">{stat.subtext}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. HOW IT WORKS (4-STEP SECTION) */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <DemoBadge text="Simple 4-Step Process" size="sm" />
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white">
            How Echoes Works
          </h2>
          <p className="text-slate-400 text-base max-w-xl mx-auto">
            From a simple voice recording to a permanent digital story token on Solana.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOW_IT_WORKS_STEPS.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative p-6 sm:p-8 rounded-3xl bg-dark-800/70 border border-slate-800 hover:border-brand-purple/40 glass-card-hover flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-3xl font-black text-brand-purple/40">
                    {item.step}
                  </span>
                  <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 border border-brand-purple/30 flex items-center justify-center text-brand-purple">
                    {item.step === '01' && <Mic className="w-6 h-6" />}
                    {item.step === '02' && <Sparkles className="w-6 h-6" />}
                    {item.step === '03' && <Rocket className="w-6 h-6" />}
                    {item.step === '04' && <Coins className="w-6 h-6" />}
                  </div>
                </div>

                <h3 className="font-display font-bold text-xl text-white">{item.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{item.desc}</p>
              </div>

              <div className="pt-4 border-t border-slate-800/60 text-xs font-medium text-brand-purple flex items-center gap-1">
                <span>Learn process</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED STORIES SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-brand-purple uppercase tracking-widest block">
              Curated Selection
            </span>
            <h2 className="font-display font-extrabold text-3xl text-white mt-1">
              Trending Stories Worth Hearing
            </h2>
          </div>

          <Link
            to="/explore"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-purple hover:text-white transition-colors"
          >
            <span>View All Stories</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </section>

      {/* 5. MISSION & PHILOSOPHY SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-dark-800/70 border border-slate-800 p-8 sm:p-14 glass-panel overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-6">
              <DemoBadge text="The Echoes Vision" size="sm" />
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight">
                "People carry stories that deserve to outlive algorithm feeds."
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Everyone has experiences worth preserving. Whether it is a hard-won business lesson, an unexpected travel memory, or personal family wisdom—your voice carries nuance that written text can never capture.
              </p>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>No video camera or professional studio needed—your voice is enough.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>Permanent digital preservation on Solana decentralized storage.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                  <span>Perpetual royalties for creators when story tokens are collected.</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dark-700 hover:bg-dark-600 text-white font-semibold text-sm transition-colors border border-slate-700"
                >
                  <span>Read Our Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="relative w-full max-w-md rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=800&q=80"
                  alt="Authentic family photograph memories"
                  className="w-full h-80 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/40 to-transparent" />
                
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-dark-900/90 border border-slate-800 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-brand-purple text-xs font-semibold">
                    <Heart className="w-4 h-4" />
                    <span>Real Human Memories</span>
                  </div>
                  <p className="text-xs text-slate-200 mt-1 italic">
                    "I recorded a 5-minute memory about my family roots. Now 39 collectors hold it as a digital keepsake on Solana."
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-brand-purple/20 via-dark-800 to-dark-900 border border-brand-purple/30 shadow-2xl space-y-6">
          <Sparkles className="w-10 h-10 text-brand-purple mx-auto animate-pulse" />
          
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white">
            Be one of the first voices on Echoes.
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Record your personal experience while the public demo is open. Help shape the future of Web3 voice archiving.
          </p>

          <div className="pt-2">
            <Link
              to="/create"
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-purple via-brand-indigo to-brand-cyan text-white font-bold text-base shadow-xl shadow-brand-purple/30 hover:scale-105 transition-all"
            >
              <Mic className="w-5 h-5" />
              <span>Record Your First Story</span>
            </Link>
          </div>

          <div className="text-xs text-slate-500 pt-4 border-t border-slate-800/80">
            Free public demo mode • Simulated Solana token minting
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
