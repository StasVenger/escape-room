import { Location, Navigate, useLocation } from 'react-router-dom';
import { AppRoute } from '@constants';
import { useAppSelector } from '@hooks/index';
import { authSelectors } from '@store/slices/auth';

type TProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: JSX.Element;
}

type LocationState = {
  from?: Location;
}


function ProtectedRoute(props: TProtectedRouteProps): JSX.Element {
  const { onlyUnAuth, children } = props;
  const user = useAppSelector(authSelectors.selectUserData);
  const location = useLocation();

  if (user && onlyUnAuth) {
    const from = (location.state as LocationState)?.from || { pathname: AppRoute.Root };
    return <Navigate to={from} />;
  }

  if (!user && !onlyUnAuth) {
    return <Navigate to={AppRoute.Login} state={{ from: location }}/>;
  }

  return children;
}

export default ProtectedRoute;
