import { AppRoute } from '@constants';
import { Link } from 'react-router-dom';

type TLogoProps = {
  isLogoLink?: boolean;
}

function Logo({ isLogoLink = true }: TLogoProps): JSX.Element {
  return isLogoLink ?
    <Link className="logo header__logo" to={AppRoute.Root} aria-label="Перейти на Главную">
      <svg width={134} height={52} aria-hidden="true">
        <use xlinkHref="#logo" />
      </svg>
    </Link> :
    <span className="logo header__logo">
      <svg width={134} height={52} aria-hidden="true">
        <use xlinkHref="#logo" />
      </svg>
    </span>;
}

export default Logo;
