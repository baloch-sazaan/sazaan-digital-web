import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactLenis } from '@studio-freight/react-lenis';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './assets/css/styles.css';

const lenisOptions = {
  lerp: 0.1,
  duration: 1.0,
  smoothWheel: true,
  smoothTouch: true,
  touchMultiplier: 1.5,
  wheelMultiplier: 1.2,
  infinite: false,
  easing: (t: number) => 1 - Math.pow(1 - t, 4), 
};

const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 768px)').matches;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ReactLenis root options={lenisOptions}>
        <App />
      </ReactLenis>
    </HelmetProvider>
  </React.StrictMode>
);
