# Echoes — Web3 Voice & Audio Storytelling Platform

> **Your story. Your voice. Your legacy.**

**Echoes** is a human-centered Web3 audio platform designed to preserve personal memoirs, life wisdom, field recordings, and oral histories. Creators record their authentic voice stories and archive them permanently on Solana as digital story tokens.

---

## 🌟 The Problem

Social media and centralized audio platforms extract 100% of the value from personal content while offering creators pennies. Furthermore, written posts fail to capture the nuance, emotion, and intimacy of a human voice. When centralized platforms shut down or alter their algorithms, personal digital memories can vanish overnight.

## 💡 The Solution

Echoes provides a decentralized, voice-first archive where:
- **Real Voices are Preserved**: Record stories using your browser or phone microphone without needing video cameras or expensive studio equipment.
- **On-Chain Digital Ownership**: Mint limited-edition collectible story tokens on Solana to give listeners digital ownership of audio memoirs.
- **Perpetual Creator Royalties**: Automatic creator royalties on all secondary marketplace exchanges.

---

## 🛠️ Key Features

- **In-Browser Audio Recording Studio**: Built-in voice recorder with live waveform visualizer, playback preview, and fallback audio mode.
- **Global Audio Player**: Persistent audio player supporting seek progress, volume controls, audio waveform visualization, and expanded full-screen view.
- **Solana Web3 Wallet Integration**: Simulated Web3 wallet modal supporting Phantom, Solflare, and Backpack wallet connections.
- **Story Discovery Marketplace**: Category filtering (Life Lessons, Founder Stories, Travel, Relationships, Career, Motivation, Family) with real-time text search and sorting.
- **Creator Dashboard**: Detailed stats for audio plays, collector counts, total SOL volume, and story token trade history.
- **Responsive & Accessible Design**: Crafted with dark theme aesthetics, focus rings, accessible touch targets, and full mobile optimization.

---

## 🚀 Technology Stack

- **Core**: React 18, Vite 6
- **Routing**: React Router DOM v6 (with SPA fallback & 404 handler)
- **Styling**: Tailwind CSS v3, PostCSS, Autoprefixer
- **Animations**: Framer Motion 11
- **Icons**: Lucide React
- **Typography**: Google Fonts (Outfit & Space Grotesk)

---

## 💻 Local Development Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) (or `http://localhost:3000`) to view the application in your browser.

### 3. Production Build
```bash
npm run build
```
Generates the optimized production build output in `dist/`.

### 4. Preview Production Build Locally
```bash
npm run preview
```

---

## 🌐 Vercel Production Deployment

Echoes is pre-configured for zero-config Vercel deployment:
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **SPA Rewrites**: Handled cleanly via client-side React Router fallback.

---

## 🛡️ Web3 & Solana Demo Mode Notice

This prototype contains simulated Web3 wallet connections and Solana token minting for demonstration and hackathon review purposes. No real SOL transactions or gas fees are incurred during testing.

---

## 📄 License

MIT License — free for open-source exploration and contribution.
