import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { useToast } from './ToastContext';

const AudioContext = createContext();

export const AudioProvider = ({ children }) => {
  const { showToast } = useToast();
  const audioRef = useRef(new Audio());
  const [currentStory, setCurrentStory] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTimeSeconds, setCurrentTimeSeconds] = useState(0);
  const [durationSeconds, setDurationSeconds] = useState(0);
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpandedPlayerOpen, setIsExpandedPlayerOpen] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    audio.volume = volume;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setCurrentTimeSeconds(audio.currentTime);
        setDurationSeconds(audio.duration);
        setProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setProgress(0);
      setCurrentTimeSeconds(0);
    };

    const handleError = () => {
      // Graceful fallback for audio loading error (demo mode playback)
      setIsPlaying(true);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, []);

  // Interval timer for fallback demo audio playback if browser blocks external MP3
  useEffect(() => {
    let timer;
    if (isPlaying && currentStory) {
      timer = setInterval(() => {
        setCurrentTimeSeconds((prev) => {
          const next = prev + 1;
          const total = currentStory.durationSeconds || 300;
          setDurationSeconds(total);
          setProgress((next / total) * 100);
          if (next >= total) {
            setIsPlaying(false);
            return 0;
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentStory]);

  const playStory = (story) => {
    if (!story) return;

    if (currentStory?.id === story.id) {
      togglePlay();
      return;
    }

    setCurrentStory(story);
    setIsPlaying(true);
    setCurrentTimeSeconds(0);
    setProgress(0);

    if (story.audioUrl) {
      try {
        audioRef.current.src = story.audioUrl;
        audioRef.current.play().catch(() => {
          // Playback allowed via simulated interval
        });
      } catch (e) {
        console.log('Audio playback fallback active');
      }
    }
    showToast(`Playing "${story.title}"`, 'info');
  };

  const togglePlay = () => {
    if (!currentStory) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const seekTo = (percent) => {
    if (!currentStory) return;
    const total = durationSeconds || currentStory.durationSeconds || 300;
    const targetSeconds = (percent / 100) * total;
    setCurrentTimeSeconds(targetSeconds);
    setProgress(percent);
    if (audioRef.current.duration) {
      audioRef.current.currentTime = targetSeconds;
    }
  };

  const setVolumeLevel = (newVol) => {
    setVolume(newVol);
    audioRef.current.volume = newVol;
    if (newVol === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  const toggleMute = () => {
    if (isMuted) {
      audioRef.current.volume = volume || 0.8;
      setIsMuted(false);
    } else {
      audioRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds || isNaN(seconds)) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <AudioContext.Provider
      value={{
        currentStory,
        isPlaying,
        progress,
        currentTime: formatTime(currentTimeSeconds),
        duration: formatTime(durationSeconds || currentStory?.durationSeconds || 0),
        currentTimeSeconds,
        durationSeconds: durationSeconds || currentStory?.durationSeconds || 0,
        volume,
        isMuted,
        isExpandedPlayerOpen,
        playStory,
        togglePlay,
        seekTo,
        setVolumeLevel,
        toggleMute,
        setIsExpandedPlayerOpen,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
