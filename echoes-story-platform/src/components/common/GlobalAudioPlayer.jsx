import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Volume2, VolumeX, Maximize2, X, Sparkles, Coins, Disc } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import WaveformVisualizer from './WaveformVisualizer';
import DemoBadge from './DemoBadge';

const GlobalAudioPlayer = () => {
  const {
    currentStory,
    isPlaying,
    progress,
    currentTime,
    duration,
    togglePlay,
    seekTo,
    volume,
    isMuted,
    setVolumeLevel,
    toggleMute,
    isExpandedPlayerOpen,
    setIsExpandedPlayerOpen,
  } = useAudio();

  if (!currentStory) return null;

  return (
    <>
      {/* PERSISTENT BOTTOM BAR PLAYER */}
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-40 bg-dark-800/95 border-t border-brand-purple/30 backdrop-blur-2xl px-4 py-3 shadow-2xl shadow-brand-purple/20"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            
            {/* LEFT: STORY METADATA */}
            <div className="flex items-center gap-3 min-w-0 max-w-[280px] sm:max-w-xs">
              <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-slate-700">
                <img
                  src={currentStory.coverImage}
                  alt={currentStory.title}
                  className="w-full h-full object-cover"
                />
                {isPlaying && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <span className="w-2 h-2 rounded-full bg-brand-purple animate-ping" />
                  </div>
                )}
              </div>

              <div className="min-w-0">
                <h5 className="text-sm font-semibold text-white truncate hover:text-brand-purple cursor-pointer" onClick={() => setIsExpandedPlayerOpen(true)}>
                  {currentStory.title}
                </h5>
                <p className="text-xs text-slate-400 truncate flex items-center gap-1.5">
                  <span>{currentStory.creator?.name || 'Creator'}</span>
                  <span>•</span>
                  <span className="text-brand-purple font-medium">{currentStory.tokenPrice} SOL</span>
                </p>
              </div>
            </div>

            {/* CENTER: PLAY CONTROLS & WAVEFORM */}
            <div className="flex-1 max-w-xl hidden sm:flex flex-col items-center gap-1.5">
              <div className="flex items-center gap-3 w-full">
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-brand-purple hover:bg-brand-purple/90 text-white flex items-center justify-center shadow-lg shadow-brand-purple/30 hover:scale-105 transition-all shrink-0"
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
                </button>

                <div className="flex-1 flex items-center gap-3">
                  <span className="text-xs font-mono text-slate-400 w-10 text-right">{currentTime}</span>
                  <div className="flex-1">
                    <WaveformVisualizer
                      bars={36}
                      isPlaying={isPlaying}
                      progress={progress}
                      onSeek={seekTo}
                      height="h-7"
                    />
                  </div>
                  <span className="text-xs font-mono text-slate-400 w-10">{duration}</span>
                </div>
              </div>
            </div>

            {/* MOBILE PLAY BUTTON */}
            <button
              onClick={togglePlay}
              className="sm:hidden w-10 h-10 rounded-full bg-brand-purple text-white flex items-center justify-center shrink-0"
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
            </button>

            {/* RIGHT: VOLUME & EXPAND */}
            <div className="hidden md:flex items-center gap-4 shrink-0">
              <div className="flex items-center gap-2">
                <button onClick={toggleMute} className="text-slate-400 hover:text-white transition-colors">
                  {isMuted || volume === 0 ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={isMuted ? 0 : volume}
                  onChange={(e) => setVolumeLevel(parseFloat(e.target.value))}
                  className="w-20 accent-brand-purple h-1 rounded-lg cursor-pointer"
                />
              </div>

              <button
                onClick={() => setIsExpandedPlayerOpen(true)}
                className="p-2 rounded-lg bg-dark-700/50 hover:bg-dark-700 text-slate-400 hover:text-white transition-colors"
                title="Expand Full Screen Player"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* FULL EXPANDED PLAYER MODAL */}
      <AnimatePresence>
        {isExpandedPlayerOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpandedPlayerOpen(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-2xl"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="relative w-full max-w-2xl bg-dark-800 border border-brand-purple/40 rounded-3xl p-6 sm:p-10 z-10 glass-panel shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setIsExpandedPlayerOpen(false)}
                className="absolute top-6 right-6 p-2.5 rounded-full bg-dark-700/60 text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center space-y-6">
                <div className="relative w-48 h-48 sm:w-64 sm:h-64 mx-auto rounded-3xl overflow-hidden border-2 border-brand-purple/40 shadow-2xl shadow-brand-purple/30 group">
                  <img src={currentStory.coverImage} alt={currentStory.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-brand-purple/80 text-white backdrop-blur-md">
                      {currentStory.category}
                    </span>
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                    {currentStory.title}
                  </h3>
                  <p className="text-slate-400 text-sm mt-1">
                    By <span className="text-white font-medium">{currentStory.creator?.name}</span> ({currentStory.creator?.handle})
                  </p>
                </div>

                <div className="py-4">
                  <WaveformVisualizer
                    bars={50}
                    isPlaying={isPlaying}
                    progress={progress}
                    onSeek={seekTo}
                    height="h-16"
                  />
                  <div className="flex justify-between text-xs font-mono text-slate-400 mt-2">
                    <span>{currentTime}</span>
                    <span>{duration}</span>
                  </div>
                </div>

                <div className="flex items-center justify-center gap-6">
                  <button
                    onClick={togglePlay}
                    className="w-16 h-16 rounded-full bg-gradient-to-r from-brand-purple to-brand-indigo text-white flex items-center justify-center shadow-xl shadow-brand-purple/40 hover:scale-105 transition-all"
                  >
                    {isPlaying ? <Pause className="w-8 h-8 fill-current" /> : <Play className="w-8 h-8 fill-current ml-1" />}
                  </button>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-brand-purple" />
                    <span>Story Token: <strong className="text-white">{currentStory.tokenPrice} SOL</strong></span>
                  </div>
                  <DemoBadge text="Audio Demo Playback" size="xs" />
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default GlobalAudioPlayer;
