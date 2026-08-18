import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Coins, Mic, Users, Eye, TrendingUp, Sparkles, ArrowRight, ShieldCheck, Repeat } from 'lucide-react';
import { CURRENT_USER } from '../data/mockData';
import StatsCard from '../components/creator/StatsCard';
import RoyaltyCard from '../components/creator/RoyaltyCard';
import DemoBadge from '../components/common/DemoBadge';

const DashboardPage = () => {
  const earningsData = [
    { month: 'Mar', sol: 0.8 },
    { month: 'Apr', sol: 1.2 },
    { month: 'May', sol: 1.9 },
    { month: 'Jun', sol: 2.8 },
    { month: 'Jul', sol: 4.5 },
    { month: 'Aug', sol: 6.42 },
  ];

  const maxSol = 7.0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* DASHBOARD HEADER */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-4 h-4 text-brand-purple" />
            <span className="text-xs font-bold uppercase tracking-widest text-brand-purple">
              Creator Studio Analytics
            </span>
          </div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-white">
            Creator Dashboard
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Track your story performance, royalties, and collector engagement.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <DemoBadge text="Simulated Analytics" size="sm" />
          <Link
            to="/create"
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-brand-purple to-brand-indigo text-white font-semibold text-sm shadow-lg shadow-brand-purple/20 hover:scale-105 transition-all"
          >
            + Record New Story
          </Link>
        </div>
      </div>

      {/* STATS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          label="Total Royalties"
          value={`${CURRENT_USER.totalRoyaltiesSOL} SOL`}
          subtext="≈ $1,284 USD"
          icon={Coins}
          trend="+18.4% this month"
          isDemo={true}
        />
        <StatsCard
          label="Stories Created"
          value={CURRENT_USER.storiesCount}
          subtext="Active on Solana"
          icon={Mic}
          trend="+1 story this week"
          isDemo={true}
        />
        <StatsCard
          label="Unique Collectors"
          value={CURRENT_USER.collectorsCount}
          subtext="Edition holders"
          icon={Users}
          trend="+24 new holders"
          isDemo={true}
        />
        <StatsCard
          label="Total Story Plays"
          value={CURRENT_USER.totalViews.toLocaleString()}
          subtext="Audio streams"
          icon={Eye}
          trend="+1.2k listens"
          isDemo={true}
        />
      </div>

      {/* ROYALTY BREAKDOWN & EARNINGS CHART GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT: ROYALTY CARD */}
        <div className="lg:col-span-6">
          <RoyaltyCard
            royaltiesSOL={CURRENT_USER.totalRoyaltiesSOL}
            storiesCount={CURRENT_USER.storiesCount}
          />
        </div>

        {/* RIGHT: EARNINGS GRAPH CHART */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-dark-800 border border-slate-800 space-y-6 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="font-display font-bold text-lg text-white">Royalty Growth Chart</h4>
              <p className="text-xs text-slate-400">Monthly SOL Royalties Accumulation</p>
            </div>
            <DemoBadge text="Simulated Chart" size="xs" />
          </div>

          {/* SVG/CSS BAR CHART */}
          <div className="h-48 flex items-end justify-between gap-3 pt-6 px-2">
            {earningsData.map((d, i) => {
              const heightPercent = (d.sol / maxSol) * 100;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity">
                    {d.sol} SOL
                  </span>
                  <div className="w-full bg-dark-900 rounded-t-xl overflow-hidden h-36 flex items-end">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPercent}%` }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="w-full bg-gradient-to-t from-brand-purple to-brand-cyan rounded-t-xl group-hover:brightness-125 transition-all"
                    />
                  </div>
                  <span className="text-xs font-mono text-slate-400">{d.month}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-slate-800">
            <span>Average Monthly Growth: <strong className="text-emerald-400">+24.5%</strong></span>
            <Link to="/stories" className="text-brand-purple font-medium hover:underline">
              View All My Stories →
            </Link>
          </div>
        </div>

      </div>

      {/* MY CREATED STORIES TABLE SUMMARY */}
      <div className="p-6 sm:p-8 rounded-3xl bg-dark-800 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="font-display font-bold text-xl text-white">Recent Story Tokens</h3>
          <Link to="/stories" className="text-xs font-semibold text-brand-purple hover:underline">
            View All ({CURRENT_USER.createdStories.length})
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="pb-3">Story</th>
                <th className="pb-3">Plays</th>
                <th className="pb-3">Collectors</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Royalties</th>
                <th className="pb-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {CURRENT_USER.createdStories.map((story) => (
                <tr key={story.id} className="hover:bg-dark-700/40 transition-colors">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <img src={story.coverImage} alt={story.title} className="w-10 h-10 rounded-xl object-cover" />
                      <div>
                        <span className="font-bold text-white block line-clamp-1">{story.title}</span>
                        <span className="text-xs text-slate-400">{story.duration}</span>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 font-mono font-medium text-slate-300">{story.plays.toLocaleString()}</td>
                  <td className="py-4 font-mono font-medium text-slate-300">{story.collectors}</td>
                  <td className="py-4 font-mono font-bold text-white">{story.priceSOL} SOL</td>
                  <td className="py-4 font-mono font-bold text-brand-teal">+{story.royaltiesSOL} SOL</td>
                  <td className="py-4">
                    <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-brand-teal/10 border border-brand-teal/30 text-brand-teal">
                      <ShieldCheck className="w-3 h-3" />
                      {story.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default DashboardPage;
