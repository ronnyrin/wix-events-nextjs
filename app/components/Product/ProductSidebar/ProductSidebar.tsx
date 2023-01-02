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

interface ProductSidebarProps {
  product: products.Product;
  className?: string;
}

export const ProductSidebar: FC<ProductSidebarProps> = ({ product }) => {
  const addItem = useAddItemToCart();
  const { openSidebar } = useUI();
  const [loading, setLoading] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<any>({});
  console.log(selectedOptions);
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
      <ProductOptions
        options={product.productOptions!}
        selectedOptions={selectedOptions}
        setSelectedOptions={setSelectedOptions}
      />
      <p className="pb-4 break-words w-full max-w-xl">{product.description}</p>
      <div>
        <button
          aria-label="Add to Cart"
          className="btn-main"
          type="button"
          onClick={addToCart}
          // disabled={variant?.availableForSale === false}
        >
          {!variant ? 'Not Available' : 'Add To Cart'}
        </button>
      </div>
      <div className="mt-6">
        <Accordion>
          {product.additionalInfoSections!.map((info) => (
            <Accordion.Panel key={info.title}>
              <Accordion.Title className="text-blue-900">
                {info.title}
              </Accordion.Title>
              <Accordion.Content>{info.description}</Accordion.Content>
            </Accordion.Panel>
          ))}
        </Accordion>
      </div>
    </>
  );
};
