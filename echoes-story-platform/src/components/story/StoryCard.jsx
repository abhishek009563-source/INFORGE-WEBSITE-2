import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Pause, Clock, Coins, Percent, Heart, Sparkles } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';

const StoryCard = ({ story }) => {
  const { currentStory, isPlaying, playStory } = useAudio();
  const isThisPlaying = currentStory?.id === story.id && isPlaying;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col rounded-2xl bg-dark-800/80 border border-slate-800/80 hover:border-brand-purple/50 glass-card-hover overflow-hidden shadow-xl"
    >
      {/* COVER IMAGE & OVERLAY */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-dark-900">
        <img
          src={story.coverImage}
          alt={story.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-black/20 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-dark-900/80 text-white backdrop-blur-md border border-slate-700/60">
            {story.category}
          </span>
          <span className="flex items-center gap-1 text-xs font-mono px-2.5 py-1 rounded-full bg-dark-900/80 text-slate-300 backdrop-blur-md border border-slate-700/60">
            <Clock className="w-3 h-3 text-brand-purple" />
            <span>{story.duration}</span>
          </span>
        </div>

        {/* Center Hover Play Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            playStory(story);
          }}
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isThisPlaying ? 'bg-black/50 opacity-100' : 'bg-black/30 opacity-0 group-hover:opacity-100'
          }`}
          aria-label={isThisPlaying ? 'Pause story audio' : 'Play story audio'}
        >
          <div className="w-14 h-14 rounded-full bg-brand-purple hover:bg-brand-purple/90 text-white flex items-center justify-center shadow-xl shadow-brand-purple/40 transform hover:scale-110 transition-all">
            {isThisPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-0.5" />}
          </div>
        </button>
      </div>

      {/* CARD CONTENT */}
      <div className="flex-1 p-5 flex flex-col justify-between space-y-4">
        
        {/* Creator Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <img
              src={story.creator.avatar}
              alt={story.creator.name}
              className="w-7 h-7 rounded-full object-cover border border-brand-purple/40"
            />
            <span className="text-xs font-medium text-slate-300 hover:text-white transition-colors truncate">
              {story.creator.name}
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500">
            {story.creator.handle}
          </span>
        </div>

        {/* Title & Tagline */}
        <div>
          <Link to={`/story/${story.id}`}>
            <h3 className="font-display font-bold text-lg text-white group-hover:text-brand-purple transition-colors line-clamp-1">
              {story.title}
            </h3>
          </Link>
          <p className="text-xs text-slate-400 line-clamp-2 mt-1 leading-relaxed">
            {story.tagline || story.description}
          </p>
        </div>

        {/* Token & Royalty Metrics */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Token Price</span>
            <div className="flex items-center gap-1 font-mono font-bold text-white text-sm">
              <Coins className="w-3.5 h-3.5 text-brand-teal" />
              <span>{story.tokenPrice} SOL</span>
            </div>
          </div>

          <div className="flex flex-col text-right">
            <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Royalty</span>
            <div className="flex items-center gap-0.5 justify-end font-mono text-brand-purple font-semibold text-xs">
              <Percent className="w-3 h-3" />
              <span>{story.royaltyPercentage}%</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-1 flex gap-2">
          <button
            onClick={() => playStory(story)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold border transition-all ${
              isThisPlaying
                ? 'bg-brand-purple text-white border-brand-purple'
                : 'bg-dark-700/60 border-slate-700 text-slate-300 hover:text-white hover:bg-dark-700'
            }`}
          >
            {isThisPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            <span>{isThisPlaying ? 'Pause Audio' : 'Listen Now'}</span>
          </button>

          <Link
            to={`/story/${story.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-semibold bg-brand-purple/10 border border-brand-purple/30 text-brand-purple hover:bg-brand-purple/20 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Collect Token</span>
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default StoryCard;
