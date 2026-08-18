import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Sparkles, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { MOCK_STORIES, CATEGORIES } from '../data/mockData';
import StoryGrid from '../components/story/StoryGrid';
import DemoBadge from '../components/common/DemoBadge';

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('trending');

  const filteredStories = useMemo(() => {
    return MOCK_STORIES.filter((story) => {
      // Search query filter
      const matchesSearch =
        story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.creator.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        story.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Category filter
      const matchesCategory =
        selectedCategory === 'all' || story.categoryId === selectedCategory;

      return matchesSearch && matchesCategory;
    }).sort((a, b) => {
      if (sortBy === 'trending') return b.playsCount - a.playsCount;
      if (sortBy === 'new') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'highest-price') return parseFloat(b.tokenPrice) - parseFloat(a.tokenPrice);
      if (sortBy === 'lowest-price') return parseFloat(a.tokenPrice) - parseFloat(b.tokenPrice);
      return 0;
    });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      {/* HEADER SECTION */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1 justify-center sm:justify-start">
              <Sparkles className="w-4 h-4 text-brand-purple" />
              <span className="text-xs font-bold uppercase tracking-widest text-brand-purple">
                Voice Marketplace
              </span>
            </div>
            <h1 className="font-display font-black text-3xl sm:text-5xl text-white">
              Discover Audio Stories
            </h1>
            <p className="text-slate-400 text-sm sm:text-base mt-1">
              Explore authentic personal narratives preserved on Solana.
            </p>
          </div>

          <DemoBadge text="Demo Marketplace" size="sm" />
        </div>
      </div>

      {/* SEARCH BAR & CONTROLS */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center gap-4">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, creator, or topic (e.g. startup, Kyoto, wisdom)..."
              className="w-full bg-dark-800 border border-slate-700/80 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-purple transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>

          {/* Sort Selector */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <ArrowUpDown className="w-4 h-4 text-slate-400 shrink-0" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full sm:w-auto bg-dark-800 border border-slate-700/80 rounded-2xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-brand-purple cursor-pointer"
            >
              <option value="trending">🔥 Trending & Most Listened</option>
              <option value="new">✨ Newly Recorded</option>
              <option value="highest-price">💎 Token Price: High to Low</option>
              <option value="lowest-price">🪙 Token Price: Low to High</option>
            </select>
          </div>
        </div>

        {/* CATEGORY CHIPS SCROLLBAR */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                  isSelected
                    ? 'bg-brand-purple text-white border-brand-purple shadow-lg shadow-brand-purple/20 scale-105'
                    : 'bg-dark-800/80 text-slate-300 border-slate-800 hover:border-brand-purple/40 hover:text-white'
                }`}
              >
                <span>{cat.name}</span>
                {cat.count > 0 && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-dark-700 text-slate-400'
                    }`}
                  >
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* RESULTS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Showing {filteredStories.length} audio story collectibles</span>
          {selectedCategory !== 'all' && (
            <button
              onClick={() => setSelectedCategory('all')}
              className="text-brand-purple hover:underline"
            >
              Reset category filter
            </button>
          )}
        </div>

        <StoryGrid stories={filteredStories} />
      </div>
    </div>
  );
};

export default ExplorePage;
