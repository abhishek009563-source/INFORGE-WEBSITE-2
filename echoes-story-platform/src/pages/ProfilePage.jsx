import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, Coins, Users, Mic, Share2, Sparkles, ExternalLink, Calendar, Plus } from 'lucide-react';
import { CURRENT_USER } from '../data/mockData';
import StoryCard from '../components/story/StoryCard';
import DemoBadge from '../components/common/DemoBadge';

const ProfilePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* HEADER BANNER */}
      <div className="relative rounded-3xl overflow-hidden border border-slate-800 bg-dark-800 shadow-2xl">
        <div className="h-48 sm:h-64 w-full relative">
          <img
            src={CURRENT_USER.coverImage}
            alt="Profile Banner"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent" />
          <div className="absolute top-4 right-4">
            <DemoBadge text="Creator Profile" size="sm" />
          </div>
        </div>

        {/* PROFILE HEADER DETAILS */}
        <div className="px-6 sm:px-10 pb-8 relative -mt-16 sm:-mt-20 space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-5">
              <img
                src={CURRENT_USER.avatar}
                alt={CURRENT_USER.name}
                className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl object-cover border-4 border-dark-900 shadow-2xl ring-2 ring-brand-purple/50"
              />
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <h1 className="font-display font-black text-2xl sm:text-3xl text-white">
                    {CURRENT_USER.name}
                  </h1>
                  <ShieldCheck className="w-5 h-5 text-brand-purple" />
                </div>
                <p className="text-sm font-mono text-slate-400">{CURRENT_USER.handle}</p>
                <div className="inline-flex items-center gap-1.5 text-xs text-brand-teal font-mono bg-brand-teal/10 border border-brand-teal/25 px-2.5 py-0.5 rounded-full">
                  <span>Solana Wallet:</span>
                  <span>{CURRENT_USER.walletAddress}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/create"
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo text-white font-bold text-sm shadow-lg shadow-brand-purple/20 hover:scale-105 transition-all flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                <span>New Audio Story</span>
              </Link>
            </div>
          </div>

          <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
            {CURRENT_USER.bio}
          </p>

          {/* CREATOR METRICS BAR */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-800/80 text-center sm:text-left">
            <div className="p-3 rounded-2xl bg-dark-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Stories Created</span>
              <span className="font-display font-black text-xl text-white mt-0.5 block">{CURRENT_USER.storiesCount} Stories</span>
            </div>
            <div className="p-3 rounded-2xl bg-dark-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Collectors</span>
              <span className="font-display font-black text-xl text-white mt-0.5 block">{CURRENT_USER.collectorsCount} Holders</span>
            </div>
            <div className="p-3 rounded-2xl bg-dark-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Total Royalties</span>
              <span className="font-display font-black text-xl text-brand-teal mt-0.5 block">+{CURRENT_USER.totalRoyaltiesSOL} SOL</span>
            </div>
            <div className="p-3 rounded-2xl bg-dark-900/60 border border-slate-800">
              <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold block">Total Story Views</span>
              <span className="font-display font-black text-xl text-brand-purple mt-0.5 block">{CURRENT_USER.totalViews.toLocaleString()}</span>
            </div>
          </div>

        </div>
      </div>

      {/* CREATED STORIES GRID SECTION */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-2xl text-white">Public Audio Stories</h3>
          <span className="text-xs text-slate-400 font-mono">Showing {CURRENT_USER.createdStories.length} On-Chain Collectibles</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {CURRENT_USER.createdStories.map((story, i) => (
            <motion.div
              key={story.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-5 rounded-3xl bg-dark-800 border border-slate-800 hover:border-brand-purple/40 glass-card-hover space-y-4"
            >
              <div className="aspect-[16/10] rounded-2xl overflow-hidden border border-slate-700">
                <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="font-display font-bold text-base text-white line-clamp-1">{story.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{story.duration} • {story.plays.toLocaleString()} plays</p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <span className="font-bold text-white font-mono">{story.priceSOL} SOL</span>
                <span className="text-brand-teal font-mono">+{story.royaltiesSOL} SOL Royalties</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProfilePage;
