export function Counter({
  onChange,
  ticketId,
  optionId,
  price,
  initialCount,
  disabled,
}: {
  onChange: Function;
  ticketId: string;
  optionId?: string;
  price: number;
  initialCount: number;
  disabled: boolean;
}) {
  const increment = () => {
    onChange({
      [`${ticketId}${optionId ? `|${optionId}` : ''}`]: {
        quantity: initialCount + 1,
        price,
      },
    });
  };

  const decrement = () => {
    if (initialCount === 0) return;
    onChange({
      [`${ticketId}${optionId ? `|${optionId}` : ''}`]: {
        quantity: initialCount - 1,
        price,
      },
    });
  };

  return (
    <div
      className="custom-number-input h-10 w-24"
      key={`${ticketId}|${optionId}-counter`}
    >
      <div className="flex flex-row h-10 w-full relative bg-transparent mt-1">
        <button
          data-action="decrement"
          onClick={decrement}
          disabled={disabled}
          className="h-full w-16 cursor-pointer disabled:text-gray-400 border-black border-y border-l disabled:border-gray-400"
        >
          <span className="m-auto text-xl font-thin text-inherit">−</span>
        </button>
        <input
          type="number"
          className="outline-none focus:outline-none disabled:text-gray-400 border-black disabled:border-gray-400 border-y border-l-0 border-r-0 text-center w-full bg-transparent font-semibold text-md focus:text-black md:text-basecursor-default flex items-center"
          name="custom-input-number"
          disabled={disabled}
          value={initialCount}
          min={0}
        ></input>
        <button
          data-action="increment"
          onClick={increment}
          disabled={disabled}
          className="h-full w-16 cursor-pointer disabled:text-gray-400 border-black border-y border-r disabled:border-gray-400"
        >
          <span className="m-auto text-xl font-thin text-inherit">+</span>
        </button>
      </div>
    </div>
  );
}
