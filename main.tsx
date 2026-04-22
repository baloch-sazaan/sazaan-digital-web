import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/css/styles.css';

const injectFavicon = () => {
  const faviconUrl = `/favicon.webp?v=${Date.now()}`;
  
  // Standard Icon
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  // @ts-ignore
  link.type = 'image/webp';
  // @ts-ignore
  link.rel = 'icon';
  // @ts-ignore
  link.href = faviconUrl;
  document.getElementsByTagName('head')[0].appendChild(link);

  // Apple Apple Touch Icon
  const apple = document.querySelector("link[rel*='apple-touch-icon']") || document.createElement('link');
  // @ts-ignore
  apple.rel = 'apple-touch-icon';
  // @ts-ignore
  apple.href = faviconUrl;
  document.getElementsByTagName('head')[0].appendChild(apple);
};

// Fire immediately
injectFavicon();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
