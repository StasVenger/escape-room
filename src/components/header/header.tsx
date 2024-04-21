import { AppRoute } from '@constants';
import { NavLink } from 'react-router-dom';

function Header(): JSX.Element {
  return (
    <header className="header">
      <div className="container container--size-l">
        <span className="logo header__logo">
          <svg width={134} height={52} aria-hidden="true">
            <use xlinkHref="#logo" />
          </svg>
        </span>
        <nav className="main-nav header__main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <NavLink className="link" to={AppRoute.Root}>Квесты</NavLink>
            </li>
            <li className="main-nav__item">
              <NavLink className="link" to={AppRoute.Contacts}>Контакты</NavLink>
            </li>
            <li className="main-nav__item">
              <NavLink className="link" to={AppRoute.MyQuests}>Мои бронирования</NavLink>
            </li>
          </ul>
        </nav>
        <div className="header__side-nav">
          <a className="btn btn--accent header__side-item" href="#">Выйти</a>
          <a className="link header__side-item header__phone-link" href="tel:88003335599">8 (000) 111-11-11</a>
        </div>
      </div>
    </header>
  );
}

export default Header;
