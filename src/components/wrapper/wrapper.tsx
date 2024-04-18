import { ReactNode } from 'react';
import Header from '../header/header';
import classNames from 'classnames';
import Footer from '../footer/footer';

type TWrapper = {
  children: ReactNode;
  extraClass?: string;
}

function Wrapper({ children, extraClass }: TWrapper): JSX.Element {
  return (
    <div className="wrapper">
      <Header />
      <main className={classNames('page-content', extraClass)}>
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default Wrapper;
