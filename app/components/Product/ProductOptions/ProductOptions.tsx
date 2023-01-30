'use client';
import Swatch from '@app/components/Product/Swatch/Swatch';
import { products } from '@wix/stores';

interface ProductOptionsProps {
  options: products.ProductOption[];
  selectedOptions: any;
  setSelectedOptions: React.Dispatch<React.SetStateAction<any>>;
}

export const ProductOptions: React.FC<ProductOptionsProps> = ({
  options,
  selectedOptions,
  setSelectedOptions,
}) => {
  return (
    <>
      {options.map((opt) => (
        <div className="mb-4" key={opt.name}>
          <span className="text-sm tracking-wide">{opt.name}</span>
          <div role="listbox" className="flex flex-row gap-2 my-3">
            {opt.choices!.map((v, i: number) => {
              const active = selectedOptions[opt.name!];
              return (
                <Swatch
                  key={`${v}-${i}`}
                  active={v.description === active}
                  variant={v.description}
                  color={opt.optionType === 'color' ? v.value : ''}
                  label={v.description}
                  onClick={() => {
                    setSelectedOptions((selectedOptions: any) => {
                      return {
                        ...selectedOptions,
                        [opt.name!]: v.description,
                      };
                    });
                  }}
                />
              );
            })}
          </div>
        </div>
      ))}
    </>
  );
};
