import React from 'react';
import ReactDOM from 'react-dom/client';
import MyQuestsPage from './pages/my-quests-page/my-quests-page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <MyQuestsPage />
  </React.StrictMode>
);
