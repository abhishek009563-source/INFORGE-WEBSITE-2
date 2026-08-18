import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mic, Play, Eye, Users, Coins, ShieldCheck, Plus, Sparkles } from 'lucide-react';
import { CURRENT_USER } from '../data/mockData';
import DemoBadge from '../components/common/DemoBadge';

const MyStoriesPage = () => {
  const stories = CURRENT_USER.createdStories;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Mic className="w-4 h-4 text-brand-purple" />
            <span className="text-xs font-bold uppercase tracking-widest text-brand-purple">
              Personal Voice Library
            </span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
            My Created Stories
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Manage your recorded audio stories and monitor collector engagement.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DemoBadge text="User Collection" size="sm" />
          <Link
            to="/create"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo text-white font-bold text-sm shadow-lg shadow-brand-purple/20 hover:scale-105 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Record New Story</span>
          </Link>
        </div>
      </div>

      {/* STORIES CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <motion.div
            key={story.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 rounded-3xl bg-dark-800 border border-slate-800 hover:border-brand-purple/40 glass-card-hover flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-slate-700/60">
                <img src={story.coverImage} alt={story.title} className="w-full h-full object-cover" />
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full bg-dark-900/90 text-brand-teal border border-brand-teal/30 backdrop-blur-md">
                    <ShieldCheck className="w-3 h-3" />
                    {story.status}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3 text-xs font-mono px-2.5 py-1 rounded-full bg-dark-900/90 text-slate-300 backdrop-blur-md border border-slate-700">
                  {story.duration}
                </div>
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-white line-clamp-1">{story.title}</h3>
                <span className="text-xs text-slate-400">Created: {story.createdAt}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-800 text-center text-xs">
                <div className="p-2 rounded-xl bg-dark-900/60">
                  <span className="text-[10px] text-slate-400 block">Plays</span>
                  <span className="font-bold text-white font-mono">{story.plays.toLocaleString()}</span>
                </div>
                <div className="p-2 rounded-xl bg-dark-900/60">
                  <span className="text-[10px] text-slate-400 block">Collectors</span>
                  <span className="font-bold text-white font-mono">{story.collectors}</span>
                </div>
                <div className="p-2 rounded-xl bg-dark-900/60">
                  <span className="text-[10px] text-slate-400 block">Royalties</span>
                  <span className="font-bold text-brand-teal font-mono">+{story.royaltiesSOL} SOL</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/story/story-1"
                className="w-full py-2.5 rounded-xl bg-brand-purple/10 border border-brand-purple/30 text-brand-purple hover:bg-brand-purple/20 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>View Story Page</span>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MyStoriesPage;
