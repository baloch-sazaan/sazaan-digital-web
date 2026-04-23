import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './assets/css/styles.css';

const injectFavicon = () => {
  const faviconUrl = `/favicon.png?v=${Date.now()}`;
  
  // Standard Icon
  const link = (document.querySelector("link[rel*='icon']") as HTMLLinkElement) || document.createElement('link');
  link.type = 'image/png';
  link.rel = 'icon';
  link.href = faviconUrl;
  document.getElementsByTagName('head')[0].appendChild(link);

  // Apple Apple Touch Icon
  const apple = (document.querySelector("link[rel*='apple-touch-icon']") as HTMLLinkElement) || document.createElement('link');
  apple.rel = 'apple-touch-icon';
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
