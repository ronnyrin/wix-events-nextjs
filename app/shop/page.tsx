import Image from 'next/image';
import { getWixClient } from '@app/hooks/useWixClientServer';

export default async function StoresCategoryPage() {
  const wixClient = await getWixClient();
  const { items } = await wixClient.products.queryProducts().limit(10).find();
  return (
    <div className="mx-auto">
      <div className="bg-black text-custom-1 text-center py-20 h-[560px]">
        <h1 className="uppercase text-6xl">Merch</h1>
        <p className="text-xl mx-auto max-w-[60%] my-10">
          I’m a paragraph. I’m a great space to write about what makes the
          products special and explain how customers can benefit from these
          items.
        </p>
      </div>
      {items.length ? (
        <div className="full-w overflow-hidden mx-auto text-center mt-[-100px] px-10">
          <ul className="grid grid-cols-3 gap-4 grid-flow-row">
            {items.map((item) => (
              <li key={item._id} className="">
                <a href={`/product-page/${item.slug}`}>
                  <Image
                    src={item.media!.mainMedia!.image!.url!}
                    width={566}
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
