import { CartBag } from '@app/components/CartBag/CartBag';

const Header = () => (
  <>
    <header className="h-header z-40 w-full">
      <div className="flex px-10 max-w-full-content gap-8 h-header items-center">
        <h2 className="flex-1">
          <a href="/">TALI$A KIDD</a>
        </h2>
        <div>
          <CartBag />
        </div>
      </div>
    </header>
  </>
);

export default Header;
