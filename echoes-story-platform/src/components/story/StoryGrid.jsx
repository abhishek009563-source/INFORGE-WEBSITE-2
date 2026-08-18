import React from 'react';
import StoryCard from './StoryCard';
import { Search, Sparkles, Filter } from 'lucide-react';

export const StorySkeleton = () => (
  <div className="rounded-2xl bg-dark-800/60 border border-slate-800 p-4 space-y-4 animate-pulse">
    <div className="w-full aspect-[16/10] bg-dark-700/60 rounded-xl" />
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-dark-700/60" />
      <div className="h-4 bg-dark-700/60 rounded w-1/3" />
    </div>
    <div className="h-5 bg-dark-700/60 rounded w-3/4" />
    <div className="h-4 bg-dark-700/60 rounded w-full" />
    <div className="h-10 bg-dark-700/60 rounded-xl w-full" />
  </div>
);

const StoryGrid = ({ stories = [], isLoading = false, emptyMessage = 'No audio stories found matching your filter criteria.' }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <StorySkeleton key={i} />
        ))}
      </div>
    );
  }

  if (stories.length === 0) {
    return (
      <div className="text-center py-16 px-4 rounded-3xl bg-dark-800/40 border border-slate-800 flex flex-col items-center justify-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple">
          <Search className="w-8 h-8" />
        </div>
        <h4 className="font-display font-bold text-xl text-white">No Stories Found</h4>
        <p className="text-sm text-slate-400 max-w-md">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
};

export default StoryGrid;
