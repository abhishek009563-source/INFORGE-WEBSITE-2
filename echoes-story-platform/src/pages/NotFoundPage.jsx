import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, Home, Mic, ArrowLeft } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16 text-center">
      <div className="max-w-lg mx-auto space-y-6">
        <div className="w-20 h-20 mx-auto rounded-3xl bg-brand-purple/10 border border-brand-purple/20 flex items-center justify-center text-brand-purple shadow-xl">
          <Compass className="w-10 h-10 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-mono font-bold text-brand-purple uppercase tracking-widest">404 — Page Not Found</span>
          <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white">This story page does not exist</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            The link you followed might be broken, or the story may have been relocated. Explore our audio archive or return home.
          </p>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-purple hover:bg-brand-purple/90 text-white font-medium text-sm transition-all shadow-lg shadow-brand-purple/20"
          >
            <Home className="w-4 h-4" />
            Back to Home
          </Link>

          <Link
            to="/explore"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-dark-800 border border-slate-700/80 hover:bg-dark-700 text-slate-200 font-medium text-sm transition-all"
          >
            <Mic className="w-4 h-4 text-brand-cyan" />
            Explore Stories
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
