import React from 'react';
import ReactDOM from 'react-dom/client';
import { ReactLenis } from '@studio-freight/react-lenis';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import './assets/css/styles.css';

const lenisOptions = {
  lerp: 0.035,
  duration: 1.8,
  smoothWheel: true,
  smoothTouch: false, 
  wheelMultiplier: 0.65,
  touchMultiplier: 1.2,
  infinite: false,
  easing: (t: number) => 1 - Math.pow(1 - t, 4), 
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <ReactLenis root options={lenisOptions}>
        <App />
      </ReactLenis>
    </HelmetProvider>
  </React.StrictMode>
);
