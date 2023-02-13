import { ProductTag } from '@app/components/Product/ProductTag/ProductTag';
import { ProductSidebar } from '@app/components/Product/ProductSidebar/ProductSidebar';
import { usePrice } from '@app/hooks/use-price';
import { ImageGalleryClient } from '@app/components/ImageGallery/ImageGallery.client';
import { getWixClient } from '@app/hooks/useWixClientServer';
export default async function StoresCategoryPage({ params }: any) {
  const wixClient = await getWixClient();
  const { items } = await wixClient.products
    .queryProducts()
    .eq('slug', params.slug)
    .limit(1)
    .find();
  const product = items[0];
  const price = usePrice({
    amount: product.price!.price!,
    currencyCode: product.price!.currency!,
  });
  return (
    <div className="mx-auto px-14">
      {product ? (
        <div className="full-w overflow-hidden max-w-7xl mx-auto">
          <div className="flex">
            <div className="box-border flex flex-col basis-1/2">
              <div>
                <ImageGalleryClient items={product.media!.items!} />
              </div>
            </div>

            <div className="flex flex-col py-6 w-full h-full basis-1/2 text-left">
              <ProductTag
                name={product.name!}
                price={price}
                sku={product.sku ?? undefined}
              />
              <ProductSidebar key={product._id} product={product} />
            </div>
          </div>
        </div>
      ) : (
        <div className="text-3xl w-full text-center p-9 box-border">
          No product found
        </div>
      )}
    </div>
  );
}

export async function generateStaticParams() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const wixClient = await getWixClient();
  const { items } = await wixClient.products.queryProducts().limit(10).find();

  return items.map((product) => ({
    slug: product.slug,
  }));
}
