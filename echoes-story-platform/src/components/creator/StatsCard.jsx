import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import DemoBadge from '../common/DemoBadge';

const StatsCard = ({ label, value, subtext, icon: Icon, trend, isDemo = true }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative p-6 rounded-2xl bg-dark-800/80 border border-slate-800/80 glass-card-hover space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="w-10 h-10 rounded-xl bg-brand-purple/10 border border-brand-purple/30 flex items-center justify-center text-brand-purple">
          {Icon && <Icon className="w-5 h-5" />}
        </div>
        {isDemo && <DemoBadge text="Demo" size="xs" />}
      </div>

      <div>
        <span className="text-xs text-slate-400 font-medium block uppercase tracking-wider">{label}</span>
        <h4 className="font-display font-extrabold text-2xl sm:text-3xl text-white mt-1">{value}</h4>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800/60 text-xs">
        <span className="text-slate-400">{subtext}</span>
        {trend && (
          <span className="inline-flex items-center gap-1 text-emerald-400 font-medium font-mono">
            <TrendingUp className="w-3.5 h-3.5" />
            {trend}
          </span>
        )}
      </div>
    </motion.div>
  );
};

export default StatsCard;
