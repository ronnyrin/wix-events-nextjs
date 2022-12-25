import './page.css';
import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import ScrollIntoView from '@app/components/ScrollIntoView/ScrollIntoView';

export default function Home() {
  const wixSession = useServerAuthSession();
  return (
    <div>
      <div className="text-center w-full min-h-screen relative">
        <video autoPlay muted loop className="video-background">
          <source
            src="https://video.wixstatic.com/video/ac4509_e2e9678a88e04202ab38da85e5fca299/1080p/mp4/file.mp4"
            type="video/mp4"
          />
        </video>
        <div className="text-center">
          <div className="font-sans font-bold uppercase tracking-widest pt-16">
            EXPERIENCE
          </div>
          <div className="font-sans font-bold uppercase tracking-widest pt-16">
            Movement
          </div>
          <div className="text-xl pt-6 tracking-wider">Music.Love.</div>
          <div className="pt-7">
            <a className="btn-main" href="/book-now">
              Book Now
            </a>
          </div>
        </div>
      </div>

      <div className="mt-[-175px]">
        <ScrollIntoView hashName="#about" offset="-128px" />
        <div className="w-full bg-white h-full relative">
          <div className="max-w-full-content mx-auto h-full">
            <div className="pl-5 pr-24 py-2 w-2/4">
              <div className="header-line my-8"></div>
              <h2 className="mb-7 mt-10 tracking-tighter max-w-xs title">
                About me
              </h2>
              <p className="text-sm flex-1 leading-7">
                I&apos;m a paragraph. Lorem ipsum dolor sit amet, consectetur
                adipiscing elit. Phasellus in felis in sem iaculis elementum
                vitae a tortor. Duis mattis, nisi vitae ornare imperdiet, arcu
                erat consectetur diam, sed mattis ligula est non metus.
                Vestibulum interdum in ex sit amet vestibulum. Donec tellus.
              </p>
              <p>&nbsp;</p>
              <p className="text-sm flex-1 leading-7">
                This is a great space to write long text about your company and
                your services. You can use this space to go into a little more
                detail about your company. Talk about your team and what
                services you provide.
              </p>
              <div className="mt-11 mb-20">
                <a href="#" className="btn-main">
                  Read More
                </a>
              </div>
            </div>
          </div>
          <div className="absolute top-0 left-2/4 w-2/4 h-full">
            <div className="bg-[url('/about-me.jpeg')] w-full h-full bg-cover"></div>
          </div>
        </div>
      </div>
      <div className="parallax-background">
        <div className="max-w-full-content mx-auto bg-transparent p-5">
          <div className="header-line my-8"></div>
          <h2 className="mb-7 mt-10 tracking-tighter title max-w-xs">
            How I Can Help You
          </h2>
          <div className="flex my-8 justify-center">
            <a className="btn-main" href="/book-now">
              More Services
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
