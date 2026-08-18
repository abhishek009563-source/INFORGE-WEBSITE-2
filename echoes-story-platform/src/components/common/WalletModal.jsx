import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Wallet, ArrowRight, ExternalLink } from 'lucide-react';
import { useWallet } from '../../context/WalletContext';
import { MOCK_WALLETS } from '../../data/mockData';
import DemoBadge from './DemoBadge';

const WalletModal = () => {
  const { isWalletModalOpen, closeWalletModal, connectWallet, isWalletConnected, walletAddress, disconnectWallet } = useWallet();

  if (!isWalletModalOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={closeWalletModal}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-md bg-dark-800 border border-brand-purple/30 rounded-2xl p-6 sm:p-8 shadow-2xl shadow-brand-purple/20 z-10 glass-panel overflow-hidden"
        >
          {/* Top Glow Accent */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-brand-purple/30 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={closeWalletModal}
            className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-lg bg-dark-700/50 hover:bg-dark-600 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-brand-purple/20 border border-brand-purple/40 flex items-center justify-center text-brand-purple">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-white">Connect Solana Wallet</h3>
              <p className="text-xs text-slate-400">Select your preferred Solana wallet</p>
            </div>
          </div>

          {/* Demo Disclaimer Badge */}
          <div className="mb-6 p-3 rounded-xl bg-brand-purple/10 border border-brand-purple/20 flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <DemoBadge text="Demo Wallet Connection" size="xs" />
              <span className="text-[10px] text-slate-400">Solana Devnet / Demo</span>
            </div>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">
              This is a prototype demonstration. Connecting a wallet simulates Web3 authentication without requiring real SOL transactions.
            </p>
          </div>

          {/* Connected State View */}
          {isWalletConnected ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-dark-700/60 border border-slate-700 flex flex-col gap-2">
                <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Active Connected Address</span>
                <span className="font-mono text-sm text-brand-teal font-semibold break-all bg-dark-900/60 p-2.5 rounded-lg border border-slate-800">
                  {walletAddress}
                </span>
                <div className="flex items-center justify-between text-xs text-slate-300 pt-2 border-t border-slate-700/50">
                  <span>Demo SOL Balance:</span>
                  <span className="font-bold text-white">14.85 SOL</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={disconnectWallet}
                  className="flex-1 py-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 hover:bg-rose-500/20 text-sm font-semibold transition-colors"
                >
                  Disconnect Wallet
                </button>
                <button
                  onClick={closeWalletModal}
                  className="flex-1 py-3 rounded-xl bg-brand-purple text-white hover:bg-brand-purple/90 text-sm font-semibold transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : (
            /* Wallet Selection List */
            <div className="space-y-3">
              {MOCK_WALLETS.map((w) => (
                <button
                  key={w.id}
                  onClick={() => connectWallet(w.name)}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-dark-700/50 hover:bg-dark-700 border border-slate-800 hover:border-brand-purple/40 transition-all duration-200 group text-left"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-dark-900 border border-slate-700 flex items-center justify-center text-brand-purple group-hover:border-brand-purple/60 group-hover:scale-105 transition-all">
                      <ShieldCheck className="w-5 h-5 text-brand-purple" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-white text-sm group-hover:text-brand-purple transition-colors">
                          {w.name}
                        </span>
                        {w.popular && (
                          <span className="text-[10px] bg-brand-purple/20 text-brand-purple font-medium px-2 py-0.5 rounded-full border border-brand-purple/30">
                            Popular
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 block">{w.desc}</span>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                </button>
              ))}
            </div>
          )}

          {/* Footer Security Note */}
          <div className="mt-6 pt-4 border-t border-slate-800 text-center">
            <p className="text-[11px] text-slate-400">
              Echoes never stores your private keys. Powered by Solana architecture.
            </p>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default WalletModal;
