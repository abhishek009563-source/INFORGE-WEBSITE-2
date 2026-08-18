import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Clock, Coins, Percent, Users, ShieldCheck, Sparkles, CheckCircle2, History, Share2, Heart, ExternalLink, X } from 'lucide-react';
import { MOCK_STORIES } from '../data/mockData';
import { useWallet } from '../context/WalletContext';
import { useToast } from '../context/ToastContext';
import AudioPlayerInline from '../components/story/AudioPlayerInline';
import DemoBadge from '../components/common/DemoBadge';

const StoryDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
  const { isWalletConnected, openWalletModal } = useWallet();

  const story = MOCK_STORIES.find((s) => s.id === id) || MOCK_STORIES[0];
  const [isCollectModalOpen, setIsCollectModalOpen] = useState(false);
  const [isCollected, setIsCollected] = useState(false);

  const handleCollectClick = () => {
    if (!isWalletConnected) {
      openWalletModal();
      return;
    }
    setIsCollectModalOpen(true);
  };

  const confirmDemoCollect = () => {
    setIsCollected(true);
    setIsCollectModalOpen(false);
    showToast(`Demo Collect Success! You now hold 1 edition of "${story.title}"`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      
      {/* TOP NAVIGATION BACK BUTTON */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Explore</span>
        </button>

        <DemoBadge text="Solana Story Token Demo" size="sm" />
      </div>

      {/* MAIN HERO GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: COVER & AUDIO PLAYER */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* COVER IMAGE CONTAINER */}
          <div className="relative aspect-[16/10] w-full rounded-3xl overflow-hidden border border-slate-800 shadow-2xl group">
            <img
              src={story.coverImage}
              alt={story.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-black/30" />

            <div className="absolute top-4 left-4 flex gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-dark-900/80 text-white backdrop-blur-md border border-slate-700">
                {story.category}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-dark-900/80 text-slate-300 backdrop-blur-md border border-slate-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-brand-purple" />
                {story.duration}
              </span>
            </div>
          </div>

          {/* INLINE CUSTOM AUDIO PLAYER */}
          <AudioPlayerInline story={story} />

          {/* STORY DESCRIPTION */}
          <div className="p-8 rounded-3xl bg-dark-800/60 border border-slate-800 space-y-4">
            <h3 className="font-display font-bold text-xl text-white">About This Audio Story</h3>
            <p className="text-slate-300 text-base leading-relaxed whitespace-pre-line">
              {story.description}
            </p>

            <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-4 text-xs text-slate-400">
              <div>
                <span className="text-slate-500 block">Total Plays:</span>
                <span className="font-bold text-white font-mono text-sm">{story.playsCount.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Likes / Upvotes:</span>
                <span className="font-bold text-white font-mono text-sm">{story.likesCount}</span>
              </div>
              <div>
                <span className="text-slate-500 block">Recorded On:</span>
                <span className="font-bold text-white font-mono text-sm">{story.createdAt}</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: TOKEN & CREATOR DETAILS */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* STORY TITLE & CREATOR */}
          <div className="space-y-4">
            <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-white leading-tight">
              {story.title}
            </h1>

            <p className="text-sm text-slate-400 font-normal italic">
              "{story.tagline}"
            </p>

            {/* CREATOR PROFILE CARD */}
            <div className="p-4 rounded-2xl bg-dark-800/80 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={story.creator.avatar}
                  alt={story.creator.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-brand-purple/40"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-white text-sm">{story.creator.name}</span>
                    <ShieldCheck className="w-4 h-4 text-brand-purple" />
                  </div>
                  <span className="text-xs text-slate-400">{story.creator.handle}</span>
                </div>
              </div>

              <button
                onClick={() => showToast(`Following ${story.creator.handle} (Demo)`, 'success')}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-brand-purple/10 border border-brand-purple/30 text-brand-purple hover:bg-brand-purple/20 transition-colors"
              >
                Follow
              </button>
            </div>
          </div>

          {/* TOKEN ECONOMICS & COLLECT CARD */}
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-800 border border-brand-purple/40 glass-panel space-y-6 shadow-2xl">
            
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Current Story Token Price</span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span className="font-display font-black text-3xl sm:text-4xl text-white">
                    {story.tokenPrice} SOL
                  </span>
                  <span className="text-xs text-slate-400">≈ $90.00 USD</span>
                </div>
              </div>

              <div className="text-right">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block">Creator Royalty</span>
                <span className="font-display font-bold text-xl text-brand-purple">
                  {story.royaltyPercentage}%
                </span>
              </div>
            </div>

            {/* Minted Supply Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-slate-400 font-mono">
                <span>Holders: {story.holdersCount}</span>
                <span>Editions Minted: {story.mintedCount} / {story.totalSupply}</span>
              </div>
              <div className="w-full h-2 rounded-full bg-dark-900 overflow-hidden border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-brand-purple to-brand-cyan rounded-full"
                  style={{ width: `${(story.mintedCount / story.totalSupply) * 100}%` }}
                />
              </div>
            </div>

            {/* COLLECT BUTTON CTA */}
            <button
              onClick={handleCollectClick}
              disabled={isCollected}
              className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-3 shadow-xl transition-all ${
                isCollected
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 cursor-default'
                  : 'bg-gradient-to-r from-brand-purple via-brand-indigo to-brand-cyan text-white shadow-brand-purple/30 hover:scale-[1.02]'
              }`}
            >
              {isCollected ? (
                <>
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Story Token Collected (Demo)</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  <span>Collect Story Token ({story.tokenPrice} SOL)</span>
                </>
              )}
            </button>

            {/* CREATOR ROYALTY GUARANTEE NOTE */}
            <div className="p-4 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 space-y-1.5">
              <div className="flex items-center gap-2 text-xs font-bold text-brand-purple">
                <Coins className="w-4 h-4" />
                <span>Creator Royalty Guarantee</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Every eligible secondary trade on Solana automatically rewards <strong className="text-white">{story.creator.name}</strong> with a {story.royaltyPercentage}% perpetual royalty fee.
              </p>
            </div>
          </div>

          {/* STORY TIMELINE */}
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-800/60 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-white flex items-center gap-2">
                <History className="w-5 h-5 text-brand-purple" />
                <span>Story Timeline</span>
              </h3>
              <DemoBadge text="Activity Log" size="xs" />
            </div>

            <div className="space-y-6 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-800">
              {story.timeline?.map((item, idx) => (
                <div key={idx} className="relative flex items-start gap-4 pl-8">
                  <div className="absolute left-1.5 top-1 w-4 h-4 rounded-full bg-brand-purple border-4 border-dark-900 shrink-0" />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-white text-sm">{item.event}</span>
                      <span className="text-[10px] font-mono text-slate-400">{item.date}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* DEMO COLLECT CONFIRMATION MODAL */}
      <AnimatePresence>
        {isCollectModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCollectModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-dark-800 border border-brand-purple/40 rounded-3xl p-6 sm:p-8 z-10 glass-panel shadow-2xl space-y-6"
            >
              <button
                onClick={() => setIsCollectModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center text-brand-purple mx-auto">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="font-display font-bold text-xl text-white">Confirm Demo Collection</h3>
                <p className="text-xs text-slate-400">Simulate collecting 1 digital story token edition</p>
              </div>

              <div className="p-4 rounded-xl bg-dark-900/60 border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Story:</span>
                  <span className="font-bold text-white line-clamp-1">{story.title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Price:</span>
                  <span className="font-bold text-white font-mono">{story.tokenPrice} SOL</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Creator Royalty:</span>
                  <span className="font-bold text-brand-purple">{story.royaltyPercentage}%</span>
                </div>
              </div>

              <DemoBadge text="Prototype Action — No real SOL charged" size="sm" className="w-full justify-center" />

              <div className="flex gap-3">
                <button
                  onClick={() => setIsCollectModalOpen(false)}
                  className="flex-1 py-3 rounded-xl bg-dark-700 text-slate-300 hover:text-white text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDemoCollect}
                  className="flex-1 py-3 rounded-xl bg-brand-purple text-white hover:bg-brand-purple/90 text-xs font-semibold shadow-lg shadow-brand-purple/30"
                >
                  Confirm Collection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default StoryDetailPage;
