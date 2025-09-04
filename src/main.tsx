import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ThemeProvider from './styles/ThemeProvider';
import { makeServer } from './server';

if (import.meta.env.DEV) {
  makeServer({ environment: 'development' });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
