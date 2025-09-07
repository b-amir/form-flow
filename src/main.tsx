import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ThemeProvider from './styles/ThemeProvider';
import { makeServer } from './server';

const shouldUseMirage = import.meta.env.VITE_USE_MIRAGE !== 'false';
const environment = import.meta.env.MODE || 'development';

if (shouldUseMirage) {
  makeServer({ environment });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>
);
