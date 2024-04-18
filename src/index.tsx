import React from 'react';
import ReactDOM from 'react-dom/client';
import ContactsPage from './pages/contacts-page/contacts-page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ContactsPage />
  </React.StrictMode>
);
