// Authentic Mock Dataset for Echoes Web3 Audio Storytelling Platform

export const CATEGORIES = [
  { id: 'all', name: 'All Categories', icon: 'Sparkles', count: 12 },
  { id: 'life-lessons', name: 'Life Lessons', icon: 'Compass', count: 4, description: 'Wisdom gained through personal experience' },
  { id: 'founder-stories', name: 'Founder Stories', icon: 'Rocket', count: 3, description: 'Behind-the-scenes of building ventures' },
  { id: 'travel', name: 'Travel & Adventure', icon: 'Globe', count: 2, description: 'Journeys that expanded worldviews' },
  { id: 'relationships', name: 'Relationships', icon: 'Heart', count: 2, description: 'Bonding, heartbreak, and human connection' },
  { id: 'career', name: 'Career & Ambition', icon: 'Briefcase', count: 2, description: 'Pivots, triumphs, and workplace lessons' },
  { id: 'motivation', name: 'Motivation & Growth', icon: 'Zap', count: 3, description: 'Mindset shifts and overcoming obstacles' },
  { id: 'family', name: 'Family & Heritage', icon: 'Home', count: 1, description: 'Generational tales and roots' },
  { id: 'personal-experiences', name: 'Personal Experiences', icon: 'BookOpen', count: 3, description: 'Raw, unfiltered human moments' },
];

export const MOCK_STORIES = [
  {
    id: 'story-1',
    title: 'Lessons I Learned at 20 That Saved My 30s',
    tagline: 'Reflections on financial independence, choosing mentors, and embracing failure early.',
    description: 'Looking back at my 20s, I made classic mistakes—maxing out credit cards, chasing vanity metrics, and ignoring my health. In this 7-minute audio story, I share the 4 hard truths that changed my trajectory before turning 30.',
    category: 'Life Lessons',
    categoryId: 'life-lessons',
    duration: '07:24',
    durationSeconds: 444,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=ambient-piano-amp-strings-10711.mp3',
    coverImage: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80',
    creator: {
      id: 'creator-alex',
      name: 'Alex Vance',
      handle: '@alexvance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      bio: 'Storyteller, independent podcaster, and voice archivist sharing life wisdom.',
      verified: true,
      followersCount: 1420
    },
    tokenPrice: '0.45',
    royaltyPercentage: 5.0,
    holdersCount: 42,
    totalSupply: 100,
    mintedCount: 42,
    totalVolumeSOL: '18.9',
    playsCount: 2840,
    likesCount: 390,
    createdAt: '2026-08-10',
    isTrending: true,
    isFeatured: true,
    timeline: [
      { event: 'Recorded & Archived', date: 'Aug 10, 2026', desc: 'Audio recorded and metadata attached on Echoes Studio' },
      { event: 'Minted Digital Edition', date: 'Aug 10, 2026', desc: '100 Collectible Story Tokens minted on Solana' },
      { event: 'First Collector', date: 'Aug 11, 2026', desc: 'Collected by @solana_collector for 0.45 SOL' },
      { event: 'Secondary Trade', date: '2 hours ago', desc: 'Secondary sale for 0.48 SOL (0.024 SOL Royalty paid to creator)' }
    ]
  },
  {
    id: 'story-2',
    title: 'My First Startup Failed. Here Is What I Built Next.',
    tagline: 'How losing $120k in my first software venture became my greatest product lesson.',
    description: 'In 2023, my co-founder and I shut down our first software company after 18 months of zero traction. We were devastated, but the lessons we learned about listening to real users allowed us to rebuild stronger.',
    category: 'Founder Stories',
    categoryId: 'founder-stories',
    duration: '11:15',
    durationSeconds: 675,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a7373f.mp3?filename=inspiring-cinematic-ambient-116199.mp3',
    coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
    creator: {
      id: 'creator-elena',
      name: 'Elena Rostova',
      handle: '@elena_builds',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      bio: 'Product builder and audio creator exploring digital ownership for voice.',
      verified: true,
      followersCount: 3890
    },
    tokenPrice: '0.80',
    royaltyPercentage: 7.5,
    holdersCount: 78,
    totalSupply: 150,
    mintedCount: 78,
    totalVolumeSOL: '48.2',
    playsCount: 4920,
    likesCount: 720,
    createdAt: '2026-08-04',
    isTrending: true,
    isFeatured: true,
    timeline: [
      { event: 'Recorded & Archived', date: 'Aug 04, 2026', desc: 'Recorded live in San Francisco studio' },
      { event: 'Minted Digital Edition', date: 'Aug 04, 2026', desc: '150 Collectible Story Tokens minted on Solana' },
      { event: 'First Collector', date: 'Aug 04, 2026', desc: 'Collected by @venture_dao for 0.80 SOL' },
      { event: 'Secondary Trade', date: '4 hours ago', desc: 'Secondary sale for 0.92 SOL (0.069 SOL Royalty to Elena)' }
    ]
  },
  {
    id: 'story-3',
    title: 'The Solo Trip Across Japan That Fixed My Burnout',
    tagline: '30 days in Kyoto, Hokkaido, and mountain villages with no phone notifications.',
    description: 'After 5 years of intense tech work, I was completely drained. I booked a one-way ticket to Osaka with a backpack and a microphone. This audio diary captures the quiet temples, night trains, and random encounters that restored my peace.',
    category: 'Travel',
    categoryId: 'travel',
    duration: '09:40',
    durationSeconds: 580,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=soft-rain-ambient-111154.mp3',
    coverImage: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=80',
    creator: {
      id: 'creator-kenji',
      name: 'Kenji Takahashi',
      handle: '@kenji_audio',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
      bio: 'Audio field recordist and travel writer documenting quiet human moments.',
      verified: true,
      followersCount: 2150
    },
    tokenPrice: '0.35',
    royaltyPercentage: 6.0,
    holdersCount: 54,
    totalSupply: 100,
    mintedCount: 54,
    totalVolumeSOL: '22.5',
    playsCount: 3100,
    likesCount: 440,
    createdAt: '2026-08-01',
    isTrending: false,
    isFeatured: true,
    timeline: [
      { event: 'Recorded & Archived', date: 'Aug 01, 2026', desc: 'Recorded in Kyoto bamboo grove' },
      { event: 'Minted Digital Edition', date: 'Aug 01, 2026', desc: '100 Digital Story Tokens launched on Solana' },
      { event: 'Secondary Trade', date: '1 day ago', desc: 'Collected by @wanderer_sol for 0.38 SOL' }
    ]
  },
  {
    id: 'story-4',
    title: 'A Letter to My Younger Self on Imposter Syndrome',
    tagline: 'Why walking into a room where you feel unqualified is actually a growth opportunity.',
    description: 'I spent years feeling like I was pretending to belong in boardrooms and keynotes. This is the heartfelt letter I wish someone had handed me when I started my career at 22.',
    category: 'Motivation',
    categoryId: 'motivation',
    duration: '05:48',
    durationSeconds: 348,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=ambient-piano-amp-strings-10711.mp3',
    coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=80',
    creator: {
      id: 'creator-maya',
      name: 'Maya Lin',
      handle: '@mayaspeaks',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
      bio: 'Speaker, audio essayist, and mentor helping creators find their voice.',
      verified: true,
      followersCount: 5100
    },
    tokenPrice: '0.50',
    royaltyPercentage: 5.0,
    holdersCount: 65,
    totalSupply: 120,
    mintedCount: 65,
    totalVolumeSOL: '31.0',
    playsCount: 5800,
    likesCount: 890,
    createdAt: '2026-07-28',
    isTrending: true,
    isFeatured: false,
    timeline: [
      { event: 'Recorded & Archived', date: 'Jul 28, 2026', desc: 'Recorded on Echoes Web Studio' },
      { event: 'Minted Digital Edition', date: 'Jul 28, 2026', desc: '120 Digital Collectible Tokens minted' }
    ]
  },
  {
    id: 'story-5',
    title: 'The Midnight Call That Changed Our Family Forever',
    tagline: 'A story of migration, resilience, and the quiet sacrifices of my grandparents.',
    description: 'In 1978, my grandfather made a decision to board a ship across the Atlantic with two suitcases and no English. This is the oral history of our family coming together against all odds.',
    category: 'Family',
    categoryId: 'family',
    duration: '14:20',
    durationSeconds: 860,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a7373f.mp3?filename=inspiring-cinematic-ambient-116199.mp3',
    coverImage: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?auto=format&fit=crop&w=1200&q=80',
    creator: {
      id: 'creator-marcus',
      name: 'Marcus Sterling',
      handle: '@marcus_voice',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80',
      bio: 'Documentary storyteller and audio archivist preserving family histories.',
      verified: true,
      followersCount: 1840
    },
    tokenPrice: '0.60',
    royaltyPercentage: 8.0,
    holdersCount: 39,
    totalSupply: 80,
    mintedCount: 39,
    totalVolumeSOL: '21.4',
    playsCount: 2150,
    likesCount: 310,
    createdAt: '2026-07-20',
    isTrending: false,
    isFeatured: false,
    timeline: [
      { event: 'Recorded & Archived', date: 'Jul 20, 2026', desc: 'Archived from family tape recordings' }
    ]
  },
  {
    id: 'story-6',
    title: 'Leaving Corporate Tech to Build in Web3 Audio',
    tagline: 'Why I walked away from a comfortable salary to create voice preservation tools.',
    description: 'Centralized platforms profit off personal stories while giving creators pennies. Here is why I believe voice is the most intimate form of digital heritage.',
    category: 'Career',
    categoryId: 'career',
    duration: '08:12',
    durationSeconds: 492,
    audioUrl: 'https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0a13f69d2.mp3?filename=soft-rain-ambient-111154.mp3',
    coverImage: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
    creator: {
      id: 'creator-alex',
      name: 'Alex Vance',
      handle: '@alexvance',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      bio: 'Storyteller, independent podcaster, and voice archivist sharing life wisdom.',
      verified: true,
      followersCount: 1420
    },
    tokenPrice: '0.40',
    royaltyPercentage: 5.0,
    holdersCount: 31,
    totalSupply: 100,
    mintedCount: 31,
    totalVolumeSOL: '12.4',
    playsCount: 1890,
    likesCount: 260,
    createdAt: '2026-07-15',
    isTrending: false,
    isFeatured: false,
    timeline: [
      { event: 'Recorded & Archived', date: 'Jul 15, 2026', desc: 'Recorded on Echoes Studio' }
    ]
  }
];

export const DEMO_STATS = [
  { label: 'Stories Preserved', value: '1,240', subtext: 'Recorded by real voices', icon: 'Mic' },
  { label: 'Independent Creators', value: '860', subtext: 'Building voice legacies', icon: 'Users' },
  { label: 'Story Token Trades', value: '3.8K', subtext: 'Secondary market exchanges', icon: 'Repeat' },
  { label: 'SOL Volume Traded', value: '12.4K SOL', subtext: 'Creator royalties distributed', icon: 'Coins' }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Record Your Story',
    desc: 'Speak naturally using your microphone. Share life lessons, family memoirs, or field audio without studio pressure.',
    icon: 'Mic'
  },
  {
    step: '02',
    title: 'Craft Your Archive',
    desc: 'Add a cover photograph, title, and description to create a dedicated digital page for your audio memoir.',
    icon: 'Sparkles'
  },
  {
    step: '03',
    title: 'Mint on Solana',
    desc: 'Preserve your story as a digital collectible token on Solana. Listeners can collect limited editions to support your voice.',
    icon: 'Rocket'
  },
  {
    step: '04',
    title: 'Earn Royalties',
    desc: 'Receive perpetual creator royalties whenever your story tokens are exchanged on secondary marketplaces.',
    icon: 'Coins'
  }
];

export const CURRENT_USER = {
  id: 'current-user-001',
  name: 'Samira Chen',
  handle: '@samirachen',
  avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
  coverImage: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=1200&q=80',
  bio: 'Audio enthusiast, product designer, and voice archivist documenting life stories on-chain.',
  walletAddress: '7xKX...89Fn',
  fullWalletAddress: '7xKXaP9Qz3MvL2R8W9Fn4J1T6B5C',
  balanceSOL: 14.85,
  verified: true,
  storiesCount: 3,
  collectorsCount: 128,
  totalRoyaltiesSOL: 6.42,
  totalViews: 8940,
  createdStories: [
    {
      id: 'my-story-1',
      title: 'Designing for Human Emotion in Digital Products',
      coverImage: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80',
      duration: '06:18',
      plays: 1420,
      collectors: 42,
      priceSOL: '0.40',
      royaltiesSOL: '2.10',
      status: 'Live on Solana',
      createdAt: 'Aug 12, 2026'
    },
    {
      id: 'my-story-2',
      title: 'Why Audio is the Most Intimate Social Medium',
      coverImage: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=800&q=80',
      duration: '09:05',
      plays: 2890,
      collectors: 68,
      priceSOL: '0.65',
      royaltiesSOL: '3.82',
      status: 'Live on Solana',
      createdAt: 'Jul 29, 2026'
    },
    {
      id: 'my-story-3',
      title: 'Building My First Decentralized App at 24',
      coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
      duration: '04:45',
      plays: 940,
      collectors: 18,
      priceSOL: '0.30',
      royaltiesSOL: '0.50',
      status: 'Live on Solana',
      createdAt: 'Jul 10, 2026'
    }
  ]
};

export const MOCK_WALLETS = [
  { id: 'phantom', name: 'Phantom [Demo]', icon: 'Ghost', popular: true, installed: true, desc: 'Simulated Solana Web3 wallet' },
  { id: 'solflare', name: 'Solflare [Demo]', icon: 'Flame', popular: false, installed: true, desc: 'Simulated Solana web wallet' },
  { id: 'backpack', name: 'Backpack [Demo]', icon: 'Backpack', popular: false, installed: true, desc: 'Simulated xNFT wallet' }
];
