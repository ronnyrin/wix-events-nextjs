import './footer.css';
import Image from 'next/image';
import ScrollIntoView from '@app/components/ScrollIntoView/ScrollIntoView';

const Footer = () => (
  <footer className="w-fullm-h-56 bg-turquoise-100 leading-7">
    <ScrollIntoView hashName="#contact" />
    <div className="bg-black text-white text-center py-6">
      <h2 className="text-4xl font-bold">FOR BOOKING REQUIREMENTS</h2>
      <p className="mt-10">INFO@MYSITE.COM | PHONE: 123-456-7890</p>
    </div>
    <div className="max-w-full-content mx-auto flex gap-16 pt-11 pb-20 px-14 text-xs">
      <p className="font-default mb-10 flex-1">
        © 2023 BY TALI$A KIDD. CREATED ON EDITOR X.
      </p>
      <a href="/terms">TERMS & CONDITIONS</a>
      <a href="/shipping">SHIPPING & RETURNS</a>
      <a href="/faq">FAQ'S</a>
    </div>
  </footer>
);

export default Footer;
