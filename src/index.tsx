import React from 'react';
import ReactDOM from 'react-dom/client';
import BookingPage from './pages/booking-page/booking-page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BookingPage />
  </React.StrictMode>
);
