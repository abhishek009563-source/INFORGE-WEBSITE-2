import React, { createContext, useContext, useState } from 'react';
import { useToast } from './ToastContext';
import { CURRENT_USER } from '../data/mockData';

const WalletContext = createContext();

export const WalletProvider = ({ children }) => {
  const { showToast } = useToast();
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [walletName, setWalletName] = useState(null);
  const [walletAddress, setWalletAddress] = useState(null);
  const [balanceSOL, setBalanceSOL] = useState(CURRENT_USER.balanceSOL);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

  const connectWallet = (name = 'Phantom') => {
    setIsWalletConnected(true);
    setWalletName(name);
    setWalletAddress(CURRENT_USER.walletAddress);
    setIsWalletModalOpen(false);
    showToast(`Demo wallet connected via ${name} (${CURRENT_USER.walletAddress})`, 'success');
  };

  const disconnectWallet = () => {
    setIsWalletConnected(false);
    setWalletName(null);
    setWalletAddress(null);
    showToast('Demo wallet disconnected', 'info');
  };

  const openWalletModal = () => setIsWalletModalOpen(true);
  const closeWalletModal = () => setIsWalletModalOpen(false);

  return (
    <WalletContext.Provider
      value={{
        isWalletConnected,
        walletName,
        walletAddress,
        balanceSOL,
        isWalletModalOpen,
        connectWallet,
        disconnectWallet,
        openWalletModal,
        closeWalletModal,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
