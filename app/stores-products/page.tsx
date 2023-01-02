import { useServerAuthSession } from '@app/hooks/useServerAuthSession';
import { createClient } from '@wix/sdk';
import { products } from '@wix/stores';
import Image from 'next/image';

export default async function StoresCategoryPage() {
  const wixSession = useServerAuthSession();
  const client = createClient({
    modules: { products },
    headers: {
      Authorization: wixSession.apiKey,
      'wix-site-id': wixSession.siteId,
    },
  });
  const { items } = await client.products.queryProducts().limit(10).find();
  return (
    <div className="max-w-full-content mx-auto px-14">
      {items.length ? (
        <div className="full-w overflow-hidden max-w-7xl mx-auto text-center">
          <ul className="grid grid-cols-3 gap-4 grid-flow-row">
            {items.map((item) => (
              <li key={item._id} className="bg-blue-800">
                <a href={`/stores-product/${item.slug}`}>
                  <Image
                    src={item.media!.mainMedia!.image!.url!}
                    width={300}
                    height={0}
                    alt={item.media!.mainMedia!.image!.altText!}
                  />
                  <div className="p-2 text-left">
                    <span>{item.name}</span>
                    <br />
                    <span className="text-xs">
                      {item.price!.formatted!.price}
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="text-3xl w-full text-center p-9 box-border">
          No products found
        </div>
      )}
    </div>
  );
}
