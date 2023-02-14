'use client';
import { FC, useEffect, useState } from 'react';
import { products } from '@wix/stores';
import { ProductOptions } from '../ProductOptions/ProductOptions';
import { Accordion } from 'flowbite-react';
import {
  getProductVariant,
  selectDefaultOptionFromProduct,
} from '../ProductOptions/helpers';
import { useUI } from '@app/components/Provider/context';
import { useAddItemToCart } from '@app/hooks/useAddItemToCart';
import { HiArrowDown } from 'react-icons/hi';
import { Quantity } from '@app/components/Quantity/Quantity';

interface ProductSidebarProps {
  product: products.Product;
  className?: string;
}

export const ProductSidebar: FC<ProductSidebarProps> = ({ product }) => {
  const addItem = useAddItemToCart();
  const { openSidebar } = useUI();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState<number>(1);
  const [selectedOptions, setSelectedOptions] = useState<any>({});

  useEffect(() => {
    selectDefaultOptionFromProduct(product, setSelectedOptions);
  }, [product]);

  const variant = getProductVariant(product, selectedOptions);
  const addToCart = async () => {
    setLoading(true);
    try {
      await addItem({
        quantity: 1,
        catalogReference: {
          catalogItemId: product._id!,
          appId: '1380b703-ce81-ff05-f115-39571d94dfcd',
          options: { options: selectedOptions },
        },
      });
      openSidebar();
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mt-2">
        <ProductOptions
          options={product.productOptions!}
          selectedOptions={selectedOptions}
          setSelectedOptions={setSelectedOptions}
        />
      </div>
      <div className="mb-6">
        <span className="text-xs tracking-wide">Quantity</span>
        <div className="mt-2">
          <Quantity
            value={quantity}
            handleChange={(e) => setQuantity(Number(e.target.value))}
            increase={() => setQuantity(1 + quantity)}
            decrease={() => setQuantity(quantity - 1)}
          />
        </div>
      </div>
      <div>
        <button
          aria-label="Add to Cart"
          className="btn-main w-full my-1 rounded-2xl"
          type="button"
          onClick={addToCart}
          disabled={loading}
        >
          {!variant ? 'Not Available' : 'Add To Cart'}
        </button>
      </div>
      <p className="pb-4 break-words w-full max-w-xl mt-6">
        {product.description}
      </p>
      <div className="mt-6">
        <Accordion flush={true} arrowIcon={HiArrowDown}>
          {product.additionalInfoSections!.map((info) => (
            <Accordion.Panel key={info.title}>
              <Accordion.Title>
                <span className="text-sm">{info.title}</span>
              </Accordion.Title>
              <Accordion.Content>
                <span className="text-sm">{info.description}</span>
              </Accordion.Content>
            </Accordion.Panel>
          ))}
        </Accordion>
      </div>
    </>
  );
};
