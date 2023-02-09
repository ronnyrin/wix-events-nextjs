import { CartBag } from '@app/components/CartBag/CartBag';
import { NavBar } from '@app/components/Layout/NavBar/NavBar';

const Header = () => (
  <>
    <header className="h-header z-40 w-full">
      <div className="flex px-14 max-w-full-content h-header items-center gap-8">
        <h2 className="flex-1">
          <a href="/">TALI$A KIDD</a>
        </h2>
        <div>
          <CartBag />
        </div>
        <div>
          <NavBar />
        </div>
      </div>
    </header>
  </>
);

export default Header;
