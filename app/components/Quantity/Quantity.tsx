import React, { FC } from 'react';
export interface QuantityProps {
  value: number;
  increase: () => any;
  decrease: () => any;
  handleRemove: React.MouseEventHandler<HTMLButtonElement>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  max?: number;
}

export const Quantity: FC<QuantityProps> = ({
  value,
  increase,
  decrease,
  handleChange,
  handleRemove,
  max = 6,
}) => {
  return (
    <div className="flex flex-row h-9">
      <button
        className="flex p-1 border-accent-2 border items-center justify-center"
        onClick={handleRemove}
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
      </button>
      <label className="w-full border-accent-2 border ml-2">
        <input
          className="bg-transparent px-4 w-full h-full focus:outline-none select-none pointer-events-auto"
          onChange={(e) =>
            Number(e.target.value) < max + 1 ? handleChange(e) : () => {}
          }
          value={value}
          type="number"
          max={max}
          min="0"
          readOnly
        />
      </label>
      <button
        type="button"
        onClick={decrease}
        className="flex p-1 border-accent-2 border items-center justify-center"
        style={{ marginLeft: '-1px' }}
        disabled={value <= 1}
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
            d="M20 12H4"
          ></path>
        </svg>
      </button>
      <button
        type="button"
        onClick={increase}
        className="flex p-1 border-accent-2 border items-center justify-center"
        style={{ marginLeft: '-1px' }}
        disabled={value < 1 || value >= max}
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
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          ></path>
        </svg>
      </button>
    </div>
  );
};
