import { NavBar } from '@app/components/Layout/NavBar/NavBar';
import { CartBag } from '@app/components/CartBag/CartBag';

const Header = () => (
  <>
    <header className="fixed h-header z-40 w-full bg-blue-100">
      <div className="flex justify-center max-w-full-content mx-auto gap-8 h-header items-center">
        <div className="flex-grow pb-5 pr-5">
          <NavBar />
        </div>
        <div>
          <CartBag />
        </div>
      </div>
    </header>
    <div className="h-header"></div>
  </>
);

export default Header;
