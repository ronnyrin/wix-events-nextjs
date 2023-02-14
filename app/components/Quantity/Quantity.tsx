import React, { FC } from 'react';
export interface QuantityProps {
  value: number;
  increase: () => any;
  decrease: () => any;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  max?: number;
}

export const Quantity: FC<QuantityProps> = ({
  value,
  increase,
  decrease,
  handleChange,
  max = 9999,
}) => {
  return (
    <div className="flex flex-row h-9 relative w-16">
      <label className="w-full border-gray-300 border">
        <input
          className="bg-white px-4 w-full h-full border-0 focus:outline-none select-none pointer-events-auto"
          onChange={(e) =>
            Number(e.target.value) < max + 1 ? handleChange(e) : () => {}
          }
          pattern="[0-9]*"
          aria-label="Quantity"
          value={value}
          type="number"
          max={max}
          min="1"
        />
      </label>
      <div className="absolute right-1 top-[3px]">
        <button
          type="button"
          onClick={increase}
          className="flex p-0.5 items-center justify-center text-black disabled:text-gray-300"
          disabled={value < 1 || value >= max}
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 15.75l7.5-7.5 7.5 7.5"
            ></path>
          </svg>
        </button>
        <button
          type="button"
          onClick={decrease}
          className="flex p-0.5 items-center justify-center text-black disabled:text-gray-500"
          disabled={value <= 1}
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
