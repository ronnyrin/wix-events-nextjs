import { ProductTag } from '@app/components/Product/ProductTag/ProductTag';
import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import { createClient } from '@wix/sdk';
import { products } from '@wix/stores';
import { ProductSidebar } from '@app/components/Product/ProductSidebar/ProductSidebar';
import { usePrice } from '@app/hooks/use-price';
import { ImageGalleryClient } from '@app/components/ImageGallery/ImageGallery.client';
export default async function StoresCategoryPage({ params }: any) {
  const wixSession = useServerAuthSession();
  const client = createClient({
    modules: { products },
    headers: {
      Authorization: wixSession.apiKey,
      'wix-site-id': wixSession.siteId,
    },
  });
  const { items } = await client.products
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
    <div className="max-w-full-content mx-auto px-14">
      {product ? (
        <div className="full-w overflow-hidden max-w-7xl mx-auto text-center">
          <div className="relative overflow-x-hidden fit">
            <div className="relative px-0 pb-0 box-border flex flex-col col-span-1 fit lg:mx-0 lg:col-span-8">
              <div className="">
                <ImageGalleryClient items={product.media!.items!} />
              </div>
            </div>

            <div className="flex flex-col col-span-1 mx-auto max-w-8xl px-6 py-6 w-full h-full lg:col-span-4 lg:py-6">
              <ProductTag
                name={product.name!}
                price={`${price} ${product.price!.currency}`}
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
  const wixSession = useServerAuthSession();
  const client = createClient({
    modules: { products },
    headers: {
      Authorization: wixSession.apiKey,
      'wix-site-id': wixSession.siteId,
    },
  });
  const { items } = await client.products.queryProducts().limit(10).find();

  return items.map((product) => ({
    slug: product.slug,
  }));
}
