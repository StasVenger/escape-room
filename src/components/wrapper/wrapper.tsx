import { ReactNode } from 'react';
import Header from '../header/header';
import classNames from 'classnames';
import Footer from '../footer/footer';

type TWrapper = {
  children: ReactNode;
  mainClass: string;
  extraClass?: string;
  isLogoLink?: boolean;
}

function Wrapper({ children, mainClass, extraClass, isLogoLink }: TWrapper): JSX.Element {
  return (
    <div className="wrapper">
      <Header isLogoLink={isLogoLink} />
      <main className={classNames(mainClass, extraClass)}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Wrapper;
