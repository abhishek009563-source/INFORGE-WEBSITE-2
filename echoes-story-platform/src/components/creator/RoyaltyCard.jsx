import React from 'react';
import { Coins, Percent, ShieldCheck, ArrowUpRight } from 'lucide-react';
import DemoBadge from '../common/DemoBadge';

const RoyaltyCard = ({ royaltiesSOL = '6.42', storiesCount = 4 }) => {
  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-brand-purple/20 via-dark-800 to-dark-900 border border-brand-purple/30 glass-panel shadow-2xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center text-brand-purple">
            <Coins className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-display font-bold text-xl text-white">Creator Royalty Earnings</h4>
            <p className="text-xs text-slate-400">Solana On-Chain Perpetuals</p>
          </div>
        </div>
        <DemoBadge text="Simulated Earnings" size="xs" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
        <div className="p-4 rounded-xl bg-dark-900/60 border border-slate-800">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block">Total Royalties Earned</span>
          <span className="font-display font-black text-3xl text-gradient-solana block mt-1">
            {royaltiesSOL} SOL
          </span>
          <span className="text-[11px] text-slate-400 block mt-1">≈ $1,284 USD (Simulated)</span>
        </div>

        <div className="p-4 rounded-xl bg-dark-900/60 border border-slate-800">
          <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold block">Active Royalty Token Contracts</span>
          <span className="font-display font-black text-3xl text-white block mt-1">
            {storiesCount} Stories
          </span>
          <span className="text-[11px] text-brand-teal font-medium block mt-1 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            5.0% - 8.0% Secondary Royalty Rate
          </span>
        </div>
      </div>

      <div className="p-3.5 rounded-xl bg-brand-purple/10 border border-brand-purple/20 text-xs text-slate-300 leading-relaxed">
        <strong className="text-white">How Royalties Work:</strong> Whenever collectors trade your story tokens on secondary marketplaces, smart contracts automatically transfer your creator royalty percentage directly to your connected wallet.
      </div>
    </div>
  );
};

export default RoyaltyCard;
