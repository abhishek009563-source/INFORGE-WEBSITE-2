import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, Square, Play, Pause, RefreshCw, Upload, Sparkles, CheckCircle2, ShieldAlert, Info, Rocket, X, Clock, HelpCircle, Image as ImageIcon } from 'lucide-react';
import { CATEGORIES } from '../data/mockData';
import { useToast } from '../context/ToastContext';
import WaveformVisualizer from '../components/common/WaveformVisualizer';
import DemoBadge from '../components/common/DemoBadge';

const PRESET_COVERS = [
  'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
];

const CreatePage = () => {
  const { showToast } = useToast();

  // Form State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('life-lessons');
  const [description, setDescription] = useState('');
  const [coverImage, setCoverImage] = useState(PRESET_COVERS[0]);

  // Audio Recording State
  const [recordingState, setRecordingState] = useState('idle'); // 'idle' | 'recording' | 'paused' | 'recorded'
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState(null);
  const [isPreviewPlaying, setIsPreviewPlaying] = useState(false);

  // MediaRecorder Refs
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerRef = useRef(null);
  const audioPreviewRef = useRef(new Audio());

  // Launch Success Modal State
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Timer interval for recording duration
  useEffect(() => {
    if (recordingState === 'recording') {
      timerRef.current = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [recordingState]);

  // Format seconds into MM:SS
  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainder = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainder.toString().padStart(2, '0')}`;
  };

  // START RECORDING FUNCTION (BROWSER MediaRecorder WITH FALLBACK)
  const startRecording = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];

        mediaRecorderRef.current.ondataavailable = (event) => {
          if (event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/mp3' });
          const url = URL.createObjectURL(audioBlob);
          setRecordedAudioUrl(url);
          audioPreviewRef.current.src = url;
        };

        mediaRecorderRef.current.start();
        setRecordingState('recording');
        showToast('Microphone active. Recording started!', 'info');
      } else {
        throw new Error('MediaRecorder not available');
      }
    } catch (err) {
      // Fallback demo recording mode if microphone is denied or unsupported
      setRecordingState('recording');
      showToast('Demo recording mode active (Microphone simulated)', 'info');
    }
  };

  const pauseRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.pause();
    }
    setRecordingState('paused');
    showToast('Recording paused', 'info');
  };

  const resumeRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'paused') {
      mediaRecorderRef.current.resume();
    }
    setRecordingState('recording');
    showToast('Recording resumed', 'info');
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      // Stop all audio tracks
      mediaRecorderRef.current.stream?.getTracks().forEach((t) => t.stop());
    }
    setRecordingState('recorded');
    showToast('Recording complete! Audio ready for preview.', 'success');
  };

  const resetRecording = () => {
    setRecordingState('idle');
    setRecordingSeconds(0);
    setRecordedAudioUrl(null);
    setIsPreviewPlaying(false);
    showToast('Recording reset', 'info');
  };

  const togglePreviewPlayback = () => {
    if (isPreviewPlaying) {
      audioPreviewRef.current.pause();
      setIsPreviewPlaying(false);
    } else {
      audioPreviewRef.current.play().catch(() => {});
      setIsPreviewPlaying(true);
    }
  };

  const handleCustomImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setCoverImage(url);
      showToast('Custom cover image uploaded!', 'success');
    }
  };

  const handleLaunchStory = (e) => {
    e.preventDefault();
    if (!title) {
      showToast('Please enter a story title', 'warning');
      return;
    }
    if (recordingSeconds === 0 && recordingState !== 'recorded') {
      showToast('Please record your story audio first', 'warning');
      return;
    }
    setIsSuccessModalOpen(true);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* HEADER SECTION */}
      <div className="text-center space-y-3">
        <DemoBadge text="Echoes Studio" size="sm" />
        <h1 className="font-display font-black text-3xl sm:text-5xl text-white">
          Give your story an echo.
        </h1>
        <p className="text-slate-400 text-base max-w-xl mx-auto">
          Record your personal story, attach details, and launch a digital story collectible on Solana.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* LEFT COLUMN: AUDIO RECORDING STUDIO & TIPS */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* AUDIO STUDIO CARD */}
          <div className="p-6 sm:p-8 rounded-3xl bg-dark-800 border border-brand-purple/40 glass-panel shadow-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-purple animate-ping" />
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                  Audio Recording Interface
                </span>
              </div>
              <span className="font-mono text-sm font-bold text-brand-purple">
                {formatTime(recordingSeconds)}
              </span>
            </div>

            {/* RECORDING WAVEFORM ANIMATION AREA */}
            <div className="h-32 rounded-2xl bg-dark-900/80 border border-slate-800 p-4 flex flex-col justify-between items-center relative overflow-hidden">
              <WaveformVisualizer
                bars={48}
                isPlaying={recordingState === 'recording' || isPreviewPlaying}
                progress={recordingState === 'recorded' ? (isPreviewPlaying ? 50 : 100) : 30}
                height="h-20"
                activeColor="bg-gradient-to-t from-brand-purple to-brand-cyan"
              />

              {recordingState === 'recording' && (
                <div className="absolute inset-0 bg-brand-purple/5 pointer-events-none flex items-center justify-center">
                  <span className="text-xs font-mono font-semibold text-brand-purple bg-dark-900/90 px-3 py-1 rounded-full border border-brand-purple/30">
                    🎙️ Recording Audio... Speak into microphone
                  </span>
                </div>
              )}
            </div>

            {/* RECORDING CONTROL BUTTONS */}
            <div className="flex flex-col items-center gap-4">
              
              {/* LARGE CIRCULAR MICROPHONE BUTTON */}
              {recordingState === 'idle' && (
                <button
                  onClick={startRecording}
                  className="group relative w-24 h-24 rounded-full bg-gradient-to-tr from-brand-purple via-brand-indigo to-brand-cyan p-1 shadow-2xl shadow-brand-purple/40 hover:scale-105 transition-all duration-300"
                  aria-label="Start Recording"
                >
                  <div className="w-full h-full bg-dark-900 rounded-full flex flex-col items-center justify-center text-brand-purple group-hover:text-white transition-colors">
                    <Mic className="w-10 h-10 animate-pulse" />
                  </div>
                </button>
              )}

              {/* RECORDING IN PROGRESS CONTROLS */}
              {recordingState === 'recording' && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={pauseRecording}
                    className="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center hover:bg-amber-500/30 transition-colors"
                    title="Pause Recording"
                  >
                    <Pause className="w-6 h-6" />
                  </button>

                  <button
                    onClick={stopRecording}
                    className="w-20 h-20 rounded-full bg-rose-500 text-white flex items-center justify-center shadow-xl shadow-rose-500/40 hover:scale-105 transition-all"
                    title="Stop Recording"
                  >
                    <Square className="w-8 h-8 fill-current" />
                  </button>
                </div>
              )}

              {/* PAUSED STATE CONTROLS */}
              {recordingState === 'paused' && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={resumeRecording}
                    className="w-16 h-16 rounded-full bg-brand-purple text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all"
                    title="Resume Recording"
                  >
                    <Mic className="w-7 h-7" />
                  </button>
                  <button
                    onClick={stopRecording}
                    className="w-14 h-14 rounded-full bg-rose-500/20 border border-rose-500/40 text-rose-400 flex items-center justify-center hover:bg-rose-500/30"
                    title="Stop & Save"
                  >
                    <Square className="w-6 h-6 fill-current" />
                  </button>
                </div>
              )}

              {/* RECORDED STATE CONTROLS (PREVIEW & RESET) */}
              {recordingState === 'recorded' && (
                <div className="flex items-center gap-4">
                  <button
                    onClick={togglePreviewPlayback}
                    className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-brand-purple text-white font-semibold text-sm shadow-lg shadow-brand-purple/30 hover:bg-brand-purple/90"
                  >
                    {isPreviewPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current" />}
                    <span>{isPreviewPlaying ? 'Pause Audio' : 'Preview Recording'}</span>
                  </button>

                  <button
                    onClick={resetRecording}
                    className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-dark-700 text-slate-300 hover:text-white text-xs font-medium"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Re-record</span>
                  </button>
                </div>
              )}

              <span className="text-xs text-slate-400 font-medium">
                {recordingState === 'idle' && 'Click the microphone to start recording'}
                {recordingState === 'recording' && 'Recording in progress... Click Stop when finished'}
                {recordingState === 'paused' && 'Recording paused'}
                {recordingState === 'recorded' && 'Story audio captured! Complete details on right'}
              </span>
            </div>
          </div>

          {/* RECORDING TIPS CARD */}
          <div className="p-6 rounded-3xl bg-dark-800/60 border border-slate-800 space-y-4">
            <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-brand-purple" />
              <span>Story Recording Tips</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                <span>Find a quiet room with minimal background noise.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                <span>Speak clearly into your phone or laptop microphone.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                <span>Keep your story concise (2 to 10 minutes is ideal).</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                <span>Add an evocative cover image to match your narrative.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-brand-purple shrink-0" />
                <span>Write a clear, explicit description of your experience.</span>
              </li>
            </ul>
          </div>

          {/* NO EQUIPMENT / VOICE ENOUGH INFO BOX */}
          <div className="p-5 rounded-2xl bg-brand-purple/10 border border-brand-purple/25 space-y-2 text-xs">
            <div className="flex items-center gap-2 font-bold text-brand-purple">
              <Info className="w-4 h-4" />
              <span>You don't need expensive gear.</span>
            </div>
            <p className="text-slate-300 leading-relaxed">
              No camera required. You don't need to show your face or buy studio equipment. Your authentic voice is enough to build a digital story legacy.
            </p>
          </div>

        </div>

        {/* RIGHT COLUMN: STORY DETAILS FORM & PREVIEW */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* STORY FORM */}
          <form onSubmit={handleLaunchStory} className="p-6 sm:p-8 rounded-3xl bg-dark-800 border border-slate-800 space-y-5">
            <h3 className="font-display font-bold text-xl text-white">Story Metadata</h3>

            {/* Story Title */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Story Title *</label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Lessons I Learned at 20 That Saved My 30s"
                className="w-full bg-dark-900 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-purple"
              />
            </div>

            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-dark-900 border border-slate-700/80 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-purple cursor-pointer"
              >
                {CATEGORIES.filter((c) => c.id !== 'all').map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Story Description */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-300">Description *</label>
              <textarea
                rows={3}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write a clear and explicit summary of what listeners will hear in your audio story..."
                className="w-full bg-dark-900 border border-slate-700/80 rounded-xl p-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-brand-purple resize-none"
              />
            </div>

            {/* Cover Image Upload & Presets */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 flex items-center justify-between">
                <span>Cover Image</span>
                <span className="text-[10px] text-slate-500">Select preset or upload</span>
              </label>

              {/* Preset Image Options */}
              <div className="grid grid-cols-4 gap-2">
                {PRESET_COVERS.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCoverImage(img)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      coverImage === img ? 'border-brand-purple scale-95 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="Preset cover" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>

              {/* Upload Button */}
              <label className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-dark-900 border border-dashed border-slate-700 hover:border-brand-purple/60 cursor-pointer text-xs font-medium text-slate-300 hover:text-white transition-colors">
                <Upload className="w-4 h-4 text-brand-purple" />
                <span>Upload Custom Image</span>
                <input type="file" accept="image/*" onChange={handleCustomImageUpload} className="hidden" />
              </label>
            </div>

            {/* PREVIEW CARD OF CREATED STORY */}
            <div className="pt-4 border-t border-slate-800 space-y-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">Live Story Card Preview</span>
              <div className="p-4 rounded-2xl bg-dark-900 border border-slate-800 flex gap-3 items-center">
                <img src={coverImage} alt="Cover preview" className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-700" />
                <div className="min-w-0">
                  <span className="text-[10px] font-bold text-brand-purple uppercase">{category}</span>
                  <h5 className="text-sm font-bold text-white truncate">{title || 'Untitled Story'}</h5>
                  <span className="text-[10px] text-slate-400 font-mono">Duration: {formatTime(recordingSeconds)}</span>
                </div>
              </div>
            </div>

            {/* LAUNCH STORY BUTTON CTA */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-brand-purple via-brand-indigo to-brand-cyan text-white font-bold text-base shadow-xl shadow-brand-purple/30 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <Rocket className="w-5 h-5" />
              <span>Launch Story</span>
            </button>
          </form>

        </div>
      </div>

      {/* DEMO LAUNCH SUCCESS MODAL */}
      <AnimatePresence>
        {isSuccessModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSuccessModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-dark-800 border border-brand-purple/40 rounded-3xl p-8 z-10 glass-panel shadow-2xl text-center space-y-6 overflow-hidden"
            >
              <button
                onClick={() => setIsSuccessModalOpen(false)}
                className="absolute top-6 right-6 text-slate-400 hover:text-white p-2 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-brand-purple to-brand-cyan p-1 mx-auto shadow-2xl shadow-brand-purple/40">
                <div className="w-full h-full bg-dark-900 rounded-full flex items-center justify-center text-brand-teal">
                  <CheckCircle2 className="w-10 h-10 animate-bounce" />
                </div>
              </div>

              <div>
                <h3 className="font-display font-black text-2xl sm:text-3xl text-white">
                  "Your story is ready to echo."
                </h3>
                <p className="text-brand-purple font-semibold text-sm mt-1">
                  Demo launch complete.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-dark-900/80 border border-slate-800 text-left space-y-2 text-xs text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-400">Story Title:</span>
                  <span className="font-bold text-white">{title}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Audio Duration:</span>
                  <span className="font-mono text-white">{formatTime(recordingSeconds)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Token Standard:</span>
                  <span className="font-mono text-brand-teal font-bold">Solana Story Edition</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-brand-purple/10 border border-brand-purple/20 text-xs text-slate-300">
                ✨ <strong>Launch fee covered by Echoes</strong> in the current public demo version.
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => {
                    setIsSuccessModalOpen(false);
                    navigate('/dashboard');
                  }}
                  className="flex-1 py-3.5 rounded-xl bg-brand-purple text-white hover:bg-brand-purple/90 font-bold text-sm shadow-lg shadow-brand-purple/30"
                >
                  Go to Creator Dashboard
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default CreatePage;
