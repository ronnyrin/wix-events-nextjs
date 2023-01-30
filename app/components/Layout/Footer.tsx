import './footer.css';
import Image from 'next/image';
import ScrollIntoView from '@app/components/ScrollIntoView/ScrollIntoView';

const Footer = () => (
  <footer className="w-fullm-h-56 bg-turquoise-100 leading-7">
    <ScrollIntoView hashName="#contact" />
    <div className="max-w-full-content mx-auto flex gap-2 pt-11 pb-20 px-10">
      <p className="font-default mb-10 text-xs">
        © 2023 BY TALI$A KIDD. CREATED ON EDITOR X.
      </p>
      {/*<div className="flex-1">*/}
      {/*  <form>*/}
      {/*    <div className="pr-9">*/}
      {/*      <div className="footer-form-field">*/}
      {/*        <label htmlFor="contact-form-name" className="footer-form-label">*/}
      {/*          Enter Your Name*/}
      {/*        </label>*/}
      {/*        <input*/}
      {/*          className="footer-form-input"*/}
      {/*          id="contact-form-name"*/}
      {/*          type="text"*/}
      {/*          name="name"*/}
      {/*          placeholder=""*/}
      {/*          aria-required="false"*/}
      {/*          maxLength={100}*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*      <div className="footer-form-field">*/}
      {/*        <label*/}
      {/*          htmlFor="contact-form-email"*/}
      {/*          className="footer-form-label"*/}
      {/*          aria-required*/}
      {/*        >*/}
      {/*          Enter Your Email*/}
      {/*        </label>*/}
      {/*        <input*/}
      {/*          className="footer-form-input"*/}
      {/*          id="contact-form-email"*/}
      {/*          type="email"*/}
      {/*          name="email"*/}
      {/*          required*/}
      {/*          aria-required="true"*/}
      {/*          pattern="^.+@.+\.[a-zA-Z]{2,63}$"*/}
      {/*          maxLength={250}*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*      <div className="footer-form-field">*/}
      {/*        <label*/}
      {/*          htmlFor="contact-form-subject"*/}
      {/*          className="footer-form-label"*/}
      {/*        >*/}
      {/*          Enter Your Subject*/}
      {/*        </label>*/}
      {/*        <input*/}
      {/*          className="footer-form-input"*/}
      {/*          id="contact-form-subject"*/}
      {/*          type="text"*/}
      {/*          name="subject"*/}
      {/*          placeholder=""*/}
      {/*          aria-required="false"*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*      <div className="footer-form-field">*/}
      {/*        <label*/}
      {/*          htmlFor="contact-form-message"*/}
      {/*          className="footer-form-label"*/}
      {/*        >*/}
      {/*          Message*/}
      {/*        </label>*/}
      {/*        <textarea*/}
      {/*          className="footer-form-input h-32"*/}
      {/*          id="contact-form-message"*/}
      {/*          name="message"*/}
      {/*          placeholder=""*/}
      {/*          aria-required="false"*/}
      {/*        />*/}
      {/*      </div>*/}
      {/*      <div aria-disabled="false" className="flex justify-end mt-4 mb-10">*/}
      {/*        <button*/}
      {/*          className="btn-main w-full p-1 w-32"*/}
      {/*          aria-disabled="false"*/}
      {/*        >*/}
      {/*          <span>Submit</span>*/}
      {/*        </button>*/}
      {/*      </div>*/}
      {/*    </div>*/}
      {/*  </form>*/}
      {/*</div>*/}
    </div>
  </footer>
);

export default Footer;
