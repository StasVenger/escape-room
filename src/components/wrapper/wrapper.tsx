import { ReactNode } from 'react';
import Header from '../header/header';
import classNames from 'classnames';
import Footer from '../footer/footer';

type TWrapper = {
  children: ReactNode;
  mainClass: string;
  extraClass?: string;
}

function Wrapper({ children, mainClass, extraClass }: TWrapper): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className={classNames(mainClass, extraClass)}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Wrapper;
