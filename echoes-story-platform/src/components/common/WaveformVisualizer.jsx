import React from 'react';
import { motion } from 'framer-motion';

const WaveformVisualizer = ({
  bars = 40,
  isPlaying = false,
  progress = 0,
  onSeek = null,
  height = 'h-12',
  barWidth = 'w-1',
  activeColor = 'bg-brand-purple',
  inactiveColor = 'bg-slate-700/60',
}) => {
  // Generate consistent bar heights for visual structure
  const barHeights = React.useMemo(() => {
    return Array.from({ length: bars }, (_, i) => {
      const sin = Math.sin((i / bars) * Math.PI * 3);
      const cos = Math.cos((i / bars) * Math.PI * 2);
      const val = Math.abs(sin * 0.7 + cos * 0.3) * 80 + 20;
      return Math.max(15, Math.min(100, val));
    });
  }, [bars]);

  const handleContainerClick = (e) => {
    if (!onSeek) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    onSeek(percent);
  };

  return (
    <div
      onClick={handleContainerClick}
      className={`relative flex items-center justify-between gap-[2px] sm:gap-1 ${height} w-full ${
        onSeek ? 'cursor-pointer group' : ''
      }`}
      role="progressbar"
      aria-valuenow={progress}
      aria-valuemin="0"
      aria-valuemax="100"
    >
      {barHeights.map((barHeight, idx) => {
        const barPercent = (idx / bars) * 100;
        const isActive = barPercent <= progress;

        return (
          <div
            key={idx}
            className={`relative flex-1 ${barWidth} rounded-full transition-all duration-200 overflow-hidden ${
              isActive ? activeColor : inactiveColor
            }`}
            style={{ height: `${barHeight}%` }}
          >
            {/* Animated Glow on active bars when playing */}
            {isPlaying && isActive && (
              <motion.div
                animate={{
                  scaleY: [1, 1.3, 0.8, 1.2, 1],
                }}
                transition={{
                  duration: 0.8 + (idx % 5) * 0.1,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="w-full h-full bg-white/40"
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default WaveformVisualizer;
