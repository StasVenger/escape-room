import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/main-page/main-page';
import { AppRoute } from './constants';
import LoginPage from './pages/login-page/login-page';
import QuestPage from './pages/quest-page/quest-page';
import MyQuestsPage from './pages/my-quests-page/my-quests-page';
import ContactsPage from './pages/contacts-page/contacts-page';
import NotFoundPage from './pages/not-found-page/not-found-page';
import BookingPage from './pages/booking-page/booking-page';
import { useAppDispatch } from './hooks';
import { getToken } from '@services/token';
import { checkAuthAction } from '@store/thunks/auth';
import { fetchQuestsAction } from '@store/thunks/quests';
import { useEffect } from 'react';
import ProtectedRoute from '@components/protected-route/protected-route';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const token = getToken();

  useEffect(() => {
    if (token) {
      dispatch(checkAuthAction());
    }
    dispatch(fetchQuestsAction());
  }, [dispatch, token]);

  return (
    <Routes>
      <Route
        path={AppRoute.Root}
        element={<MainPage />}
      />
      <Route
        path={AppRoute.Login}
        element={<ProtectedRoute onlyUnAuth><LoginPage /></ProtectedRoute>}
      />
      <Route
        path={AppRoute.MyQuests}
        element={<ProtectedRoute><MyQuestsPage /></ProtectedRoute>}
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
        element={<ProtectedRoute><BookingPage /></ProtectedRoute>}
      />
      <Route
        path='*'
        element={<NotFoundPage />}
      />
    </Routes>
  );
}

export default App;
