import { Link, NavLink } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '@constants';
import { useAppDispatch, useAppSelector } from '@hooks/index';
import { authSelectors } from '@store/slices/auth';
import { logoutAction } from '@store/thunks/auth';
import Logo from '@components/logo/logo';

type THeaderProps = {
  isLogoLink?: boolean;
}

function Header({ isLogoLink }: THeaderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(authSelectors.selectAuthorizarionStatus);

  return (
    <header className="header">
      <div className="container container--size-l">
        <Logo isLogoLink={isLogoLink}/>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <NavLink className="link" to={AppRoute.Root}>Квесты</NavLink>
            </li>
            <li className="main-nav__item">
              <NavLink className="link" to={AppRoute.Contacts}>Контакты</NavLink>
            </li>
            <li className="main-nav__item">
              { authorizationStatus === AuthorizationStatus.Auth && <NavLink className="link" to={AppRoute.MyQuests}>Мои бронирования</NavLink>}
            </li>
          </ul>
        </nav>
        <div className="header__side-nav">
          {authorizationStatus === AuthorizationStatus.Auth ?
            <Link
              className="btn btn--accent header__side-item"
              to="#"
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(logoutAction());
              }}
            >Выйти
            </Link> :
            <Link className="btn header__side-item header__login-btn" to={AppRoute.Login}>Вход</Link>}
          <a className="link header__side-item header__phone-link" href="tel:88003335599">8 (000) 111-11-11</a>
        </div>
      </div>
    </header>
  );
}

export default Header;
