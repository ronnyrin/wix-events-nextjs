import React from 'react';

export const SidebarLayout = ({
  children,
  handleBack,
  handleClose,
}: {
  children: React.ReactNode;
  handleClose: () => any;
  handleBack?: never;
}) => {
  return (
    <div className="relative h-full flex flex-col">
      <header className="sticky top-0 pl-4 py-4 pr-6 flex items-center justify-between box-border w-full z-10">
        {handleClose && (
          <button
            onClick={handleClose}
            aria-label="Close"
            className="hover:text-accent-5 transition ease-in-out duration-150 flex items-center focus:outline-none mr-6"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
            <span className="ml-2 text-accent-7 text-sm ">Close</span>
          </button>
        )}
        {handleBack && (
          <button
            onClick={handleBack}
            aria-label="Go back"
            className="hover:text-accent-5 transition ease-in-out duration-150 flex items-center focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
            <span className="ml-2 text-accent-7 text-xs">Back</span>
          </button>
        )}

        {/*<UserNav />*/}
      </header>
      <div className="flex flex-col flex-1 box-border">{children}</div>
    </div>
  );
};
