import React from 'react';
import ReactDOM from 'react-dom/client';
import QuestPage from './pages/quest-page/quest-page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <QuestPage />
  </React.StrictMode>
);
