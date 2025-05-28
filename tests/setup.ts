import '@testing-library/jest-dom';

// Mock the service worker registration
vi.mock('virtual:pwa-register', () => {
  return {
    registerSW: () => ({
      onNeedRefresh: vi.fn(),
      onOfflineReady: vi.fn(),
      updateServiceWorker: vi.fn(),
    }),
  };
});