import React from 'react';
import ReactDOM from 'react-dom/client';
import ExactGimbalVisualizer from './components/ExactGimbalVisualizer';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <ExactGimbalVisualizer />
  </React.StrictMode>
);
