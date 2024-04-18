import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/main-page/main-page';
import { AppRoute } from './constants';
import LoginPage from './pages/login-page/login-page';
import QuestPage from './pages/quest-page/quest-page';
import MyQuestsPage from './pages/my-quests-page/my-quests-page';
import ContactsPage from './pages/contacts-page/contacts-page';
import NotFoundPage from './pages/not-found-page/not-found-page';
import BookingPage from './pages/booking-page/booking-page';

function App() {
  return (
    <Routes>
      <Route
        path={AppRoute.Root}
        element={<MainPage />}
      />
      <Route
        path={AppRoute.Login}
        element={<LoginPage />}
      />
      <Route
        path={AppRoute.MyQuests}
        element={<MyQuestsPage />}
      />
      <Route
        path={AppRoute.Contacts}
        element={<ContactsPage />}
      />
      <Route
        path={`${AppRoute.Quest}/:questId`}
        element={<QuestPage />}
      />
      <Route
        path={`${AppRoute.Quest}/:questId/booking`}
        element={<BookingPage />}
      />
      <Route
        path='*'
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default App;
