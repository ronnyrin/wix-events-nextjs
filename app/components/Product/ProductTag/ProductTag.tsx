interface ProductTagProps {
  className?: string;
  name: string;
  price: string;
  fontSize?: number;
}

export const ProductTag: React.FC<ProductTagProps> = ({ name, price }) => {
  return (
    <>
      <h3 className="max-w-full w-full leading-extra-loose text-3xl tracking-wide leading-8 px-8 py-2">
        {name}
      </h3>
      <p className="text-sm font-semibold inline-block tracking-wide px-8 py-2">
        {price}
      </p>
    </>
  );
};
