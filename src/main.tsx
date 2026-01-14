import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import App from './App.tsx';

const { worker } = await import('@/mocks/browser');
await worker.start({
  onUnhandledRequest: 'bypass', // 정의되지 않은 API는 통과시킴
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
