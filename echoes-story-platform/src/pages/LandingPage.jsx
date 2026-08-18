import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mic, Radio, Compass, Sparkles, Rocket, Repeat, Coins, Users, BookOpen, ArrowRight, Play, CheckCircle2, ShieldAlert } from 'lucide-react';
import { MOCK_STORIES, DEMO_STATS, HOW_IT_WORKS_STEPS } from '../data/mockData';
import StoryCard from '../components/story/StoryCard';
import DemoBadge from '../components/common/DemoBadge';

const FloatingCard = ({ title, category, duration, bgGradient, delay = 0, stylePos }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.8, delay }}
    className={`absolute hidden lg:flex items-center gap-3 p-3.5 rounded-2xl bg-dark-800/90 border border-brand-purple/30 backdrop-blur-xl shadow-2xl z-20 pointer-events-auto ${stylePos} animate-float`}
    style={{ animationDelay: `${delay * 2}s` }}
  >
    <div className={`w-10 h-10 rounded-xl ${bgGradient} flex items-center justify-center text-white shrink-0`}>
      <Mic className="w-5 h-5" />
    </div>
    <div className="text-left">
      <span className="text-[10px] uppercase font-bold text-brand-purple tracking-wider block">{category}</span>
      <h5 className="text-xs font-bold text-white line-clamp-1">{title}</h5>
      <span className="text-[10px] text-slate-400 font-mono">{duration} Audio Story</span>
    </div>
  </motion.div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const featuredStories = MOCK_STORIES.filter((s) => s.isFeatured).slice(0, 3);

  return (
    <div className="space-y-24 pb-20 overflow-hidden">
      
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[85vh] flex items-center justify-center pt-12 pb-16 px-4 sm:px-6 lg:px-8">
        
        {/* Animated Background Orbs & Radial Glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-hero-glow pointer-events-none rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-brand-purple/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-indigo/15 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Story Cards Surrounding Hero Orbit */}
        <FloatingCard
          title="Lessons I Learned at 20"
          category="Life Lessons"
          duration="07:24"
          bgGradient="bg-gradient-to-br from-brand-purple to-brand-indigo"
          delay={0.2}
          stylePos="top-12 left-6 xl:left-16"
        />

        <FloatingCard
          title="My First Startup Failed"
          category="Founder Stories"
          duration="11:15"
          bgGradient="bg-gradient-to-br from-brand-indigo to-brand-cyan"
          delay={0.4}
          stylePos="top-24 right-6 xl:right-16"
        />

        <FloatingCard
          title="A Summer I'll Never Forget"
          category="Personal Experience"
          duration="08:40"
          bgGradient="bg-gradient-to-br from-brand-pink to-brand-purple"
          delay={0.6}
          stylePos="bottom-20 left-12 xl:left-24"
        />

        <FloatingCard
          title="The Trip That Changed Me"
          category="Travel & Kyoto"
          duration="09:40"
          bgGradient="bg-gradient-to-br from-brand-cyan to-brand-teal"
          delay={0.8}
          stylePos="bottom-16 right-12 xl:right-24"
        />

        <div className="relative max-w-5xl mx-auto text-center space-y-8 z-10">
          
          {/* Tagline Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-purple/10 border border-brand-purple/30 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-brand-purple" />
            <span className="text-xs font-semibold text-brand-purple tracking-wide">
              Your story. Your voice. Your legacy.
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tight leading-[1.1]"
          >
            Every story deserves an <span className="text-gradient-purple-cyan">echo.</span>
          </motion.h1>

          {/* Supporting Narrative */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-base sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Echoes lets real people record personal experiences, preserve their voices permanently on-chain, and turn them into tradeable digital story tokens on Solana.
          </motion.p>

          {/* Primary & Secondary Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link
              to="/create"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-brand-purple via-brand-indigo to-brand-cyan text-white font-bold text-base shadow-xl shadow-brand-purple/30 hover:shadow-brand-purple/50 hover:scale-105 transition-all duration-300"
            >
              <Mic className="w-5 h-5" />
              <span>Record Your Story</span>
            </Link>

            <Link
              to="/explore"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-2xl bg-dark-800/90 border border-slate-700/80 hover:border-brand-purple/50 text-slate-200 hover:text-white font-bold text-base transition-all duration-300 glass-card"
            >
              <Compass className="w-5 h-5 text-brand-purple" />
              <span>Explore Stories</span>
            </Link>
          </motion.div>

          {/* Interactive Audio Orbit Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-8 flex justify-center"
          >
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full border border-brand-purple/20 flex items-center justify-center">
              
              {/* Outer Orbiting Ring */}
              <div className="absolute inset-0 rounded-full border border-brand-cyan/20 animate-orbit" />
              
              {/* Center Glow Core */}
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-brand-purple/40 to-brand-cyan/40 backdrop-blur-2xl border border-white/20 flex flex-col items-center justify-center gap-2 shadow-2xl shadow-brand-purple/50 animate-pulse">
                <Radio className="w-8 h-8 text-white" />
                <span className="text-[10px] font-mono text-white font-bold tracking-widest uppercase">
                  RECORDING
                </span>
              </div>

              {/* Animated Waveform Bars Ring */}
              <div className="absolute inset-4 flex items-center justify-between px-2 pointer-events-none opacity-40">
                <div className="flex gap-1 items-center h-full w-full justify-center">
                  {Array.from({ length: 24 }).map((_, i) => (
                    <span
                      key={i}
                      className="w-1 bg-brand-purple rounded-full animate-bar"
                      style={{
                        height: `${Math.sin(i) * 40 + 50}%`,
                        animationDelay: `${i * 0.1}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. DEMO STATISTICS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-dark-800/60 border border-slate-800 p-8 sm:p-12 glass-panel overflow-hidden">
          
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
            <div>
              <h3 className="font-display font-bold text-xl text-white">Platform Activity Overview</h3>
              <p className="text-xs text-slate-400">Voices preserved and story tokens minted</p>
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
            From a personal microphone recording to an on-chain digital story collectible in minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {HOW_IT_WORKS_STEPS.map((item, idx) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15 }}
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
                <span>Learn more</span>
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

      {/* 5. MISSION TEASER SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-dark-800 via-dark-800 to-brand-purple/20 border border-brand-purple/30 p-8 sm:p-14 glass-panel overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            
            <div className="space-y-6">
              <DemoBadge text="The Echoes Philosophy" size="sm" />
              <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight">
                "People carry stories that deserve to be heard."
              </h2>
              <p className="text-slate-300 text-base leading-relaxed">
                Everyone has experiences worth sharing. Whether it’s a hard-won business lesson, an unexpected travel memory, or personal family wisdom—your voice carries nuance that text can never replicate.
              </p>
              <div className="space-y-2 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-purple" />
                  <span>No video camera or makeup required—your voice is enough.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-purple" />
                  <span>Permanent decentralized preservation on Solana storage.</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-brand-purple" />
                  <span>Perpetual royalties for story creators when tokens trade.</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-dark-700 hover:bg-dark-600 text-white font-semibold text-sm transition-colors border border-slate-700"
                >
                  <span>Read Our Full Mission</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="relative flex justify-center">
              <div className="relative w-full max-w-sm aspect-square rounded-3xl bg-gradient-to-tr from-brand-purple/30 to-brand-cyan/30 p-1 border border-brand-purple/40 shadow-2xl">
                <div className="w-full h-full bg-dark-900 rounded-[22px] p-6 flex flex-col justify-between space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Radio className="w-5 h-5 text-brand-purple" />
                      <span className="font-display font-bold text-white text-sm">Audio Legacy</span>
                    </div>
                    <span className="text-[10px] font-mono bg-brand-purple/20 text-brand-purple px-2 py-0.5 rounded-full">
                      SOLANA
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-dark-800 border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Creator Quote</span>
                      <p className="text-xs text-slate-200 italic mt-1">
                        "I recorded a 5-minute memory about my father. Now 40 collectors hold it as a digital keepsake."
                      </p>
                    </div>

                    <div className="p-3 rounded-xl bg-dark-800 border border-slate-800">
                      <span className="text-[10px] text-slate-500 block">Royalty Distribution</span>
                      <p className="text-xs text-brand-teal font-medium mt-1">
                        +0.045 SOL Creator Royalty Paid
                      </p>
                    </div>
                  </div>

                  <div className="text-[10px] text-center text-slate-500">
                    Prototype Demonstration Mode
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. EARLY CREATOR CTA SECTION */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-b from-brand-purple/20 via-dark-800 to-dark-900 border border-brand-purple/40 shadow-2xl space-y-6">
          <Sparkles className="w-10 h-10 text-brand-purple mx-auto animate-bounce" />
          
          <h2 className="font-display font-black text-3xl sm:text-5xl text-white">
            Be one of the first voices on Echoes.
          </h2>

          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Start creating while the public demo is free. Early creators may have access to future perks and early ecosystem benefits.
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
            No expensive gear required • Free public demo mode
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
