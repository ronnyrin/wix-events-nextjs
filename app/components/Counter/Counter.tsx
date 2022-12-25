import { useState } from 'react';

export function Counter({
  onChange,
  ticketId,
}: {
  onChange: Function;
  ticketId: string;
}) {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
    onChange({ [ticketId]: count + 1 });
  };

  const decrement = () => {
    setCount(count - 1);
    onChange({ [ticketId]: count - 1 });
  };
  return (
    <div className="custom-number-input h-10 w-32">
      <div className="flex flex-row h-10 w-full relative bg-transparent mt-1">
        <button
          data-action="decrement"
          onClick={decrement}
          className="text-white h-full w-20 cursor-pointer outline-none border-white border"
        >
          <span className="m-auto text-2xl font-thin">−</span>
        </button>
        <input
          type="number"
          className="outline-none focus:outline-none border-white border-t border-b text-center w-full bg-transparent font-semibold text-md focus:text-black md:text-basecursor-default flex items-center text-white"
          name="custom-input-number"
          value={count}
        ></input>
        <button
          data-action="increment"
          onClick={increment}
          className="text-white h-full w-20 cursor-pointer border-white border"
        >
          <span className="m-auto text-2xl font-thin">+</span>
        </button>
      </div>
    </div>
  );
}