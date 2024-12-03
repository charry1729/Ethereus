import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

// Initialize services in parallel
const initializeServices = async () => {
  const [
    { blockchainService },
    { notificationService },
  ] = await Promise.all([
    import('./services/blockchain'),
    import('./services/notification'),
  ]);

  try {
    await blockchainService.initialize();
  } catch (error) {
    console.error('Blockchain initialization error:', error);
  }
};

// Start initialization in parallel with app rendering
initializeServices();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);