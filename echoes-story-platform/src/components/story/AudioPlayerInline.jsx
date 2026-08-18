import React from 'react';
import { Play, Pause, Volume2, VolumeX, RotateCcw, RotateCw, Radio } from 'lucide-react';
import { useAudio } from '../../context/AudioContext';
import WaveformVisualizer from '../common/WaveformVisualizer';
import DemoBadge from '../common/DemoBadge';

const AudioPlayerInline = ({ story }) => {
  const {
    currentStory,
    isPlaying,
    progress,
    currentTime,
    duration,
    playStory,
    togglePlay,
    seekTo,
    volume,
    isMuted,
    setVolumeLevel,
    toggleMute,
  } = useAudio();

  const isThisPlaying = currentStory?.id === story.id && isPlaying;
  const isThisSelected = currentStory?.id === story.id;

  const handlePlayClick = () => {
    playStory(story);
  };

  return (
    <div className="w-full rounded-3xl bg-dark-800/90 border border-brand-purple/30 p-6 sm:p-8 glass-panel shadow-2xl space-y-6">
      
      {/* HEADER BAR */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-brand-purple animate-ping" />
          <span className="text-xs font-mono font-semibold tracking-wider text-slate-300 uppercase">
            Story Audio Player
          </span>
        </div>
        <DemoBadge text="Demo Audio Stream" size="xs" />
      </div>

      {/* WAVEFORM VISUALIZER (CLICKABLE TO SEEK) */}
      <div className="space-y-2 py-2">
        <WaveformVisualizer
          bars={60}
          isPlaying={isThisPlaying}
          progress={isThisSelected ? progress : 0}
          onSeek={(percent) => {
            if (!isThisSelected) playStory(story);
            seekTo(percent);
          }}
          height="h-20"
          activeColor="bg-gradient-to-t from-brand-purple to-brand-cyan"
          inactiveColor="bg-slate-700/50"
        />

        {/* TIME STAMPS */}
        <div className="flex items-center justify-between text-xs font-mono text-slate-400">
          <span>{isThisSelected ? currentTime : '00:00'}</span>
          <span>{story.duration}</span>
        </div>
      </div>

      {/* PLAYER CONTROLS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        
        {/* PLAY / PAUSE BUTTON */}
        <div className="flex items-center gap-4">
          <button
            onClick={handlePlayClick}
            className="w-14 h-14 rounded-full bg-gradient-to-r from-brand-purple via-brand-indigo to-brand-cyan text-white flex items-center justify-center shadow-xl shadow-brand-purple/30 hover:scale-105 transition-all"
            aria-label={isThisPlaying ? 'Pause Audio' : 'Play Audio'}
          >
            {isThisPlaying ? <Pause className="w-7 h-7 fill-current" /> : <Play className="w-7 h-7 fill-current ml-1" />}
          </button>

          <div>
            <span className="text-sm font-semibold text-white block">
              {isThisPlaying ? 'Now Playing Story' : 'Click to Listen'}
            </span>
            <span className="text-xs text-slate-400">
              {story.duration} • High Definition Audio
            </span>
          </div>
        </div>

        {/* VOLUME CONTROL */}
        <div className="flex items-center gap-3 bg-dark-900/60 px-4 py-2 rounded-xl border border-slate-800">
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
            className="w-24 accent-brand-purple h-1 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default AudioPlayerInline;
