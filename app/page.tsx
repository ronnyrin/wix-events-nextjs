import './page.css';
import Image from 'next/image';
import { getWixClient } from '@app/hooks/useWixClientServer';

export default async function Home() {
  const wixClient = await getWixClient();
  const { items: collectionsItems } = await wixClient.collections
    .queryCollections()
    .ne('id', '00000000-000000-000000-000000000001')
    .limit(3)
    .find();
  const productsForCategories = await Promise.all(
    collectionsItems.map((collection) =>
      wixClient.products
        .queryProducts()
        .eq('collections.id', collection._id)
        .limit(1)
        .find()
        .then((products) => ({
          product: products.items[0],
          category: collection.name,
        }))
    )
  );
  return (
    <div className="max-w-full-content mx-auto px-14 relative">
      <div className="flex gap-14">
        <div className="text-custom-1 text-left py-20 basis-1/2">
          <h1 className="uppercase text-7xl text-black">Merch</h1>
          <p className="text-lg max-w-[60%] my-10 text-black">
            I’m a paragraph. I’m a great space to write about what makes the
            products special and explain how customers can benefit from these
            items.
          </p>
          <a
            href="/shop"
            className="btn-main rounded-2xl text-base px-8 py-2.5"
          >
            Get Merch
          </a>
          <div className="mt-[300px]">
            <a href="/shop">
              <Image
                src={
                  productsForCategories[1]!.product!.media!.mainMedia!.image!
                    .url!
                }
                width={800}
                height={0}
                alt={
                  productsForCategories[1]!.product!.media!.mainMedia!.image!
                    .altText!
                }
              />
            </a>
            <span className="font-bold text-5xl block text-center mt-[-30px] text-black">
              <a href="/shop">{productsForCategories[1].category}</a>
            </span>
          </div>
        </div>
        <div>
          <div className="mt-[220px]">
            <a href="/shop">
              <Image
                src={
                  productsForCategories[0]!.product!.media!.mainMedia!.image!
                    .url!
                }
                width={800}
                height={0}
                alt={
                  productsForCategories[0]!.product!.media!.mainMedia!.image!
                    .altText!
                }
              />
            </a>
            <span className="font-bold text-5xl block text-center mt-[-30px]">
              <a href="/shop">{productsForCategories[0].category}</a>
            </span>
          </div>
          <div className="mt-40">
            <a href="/shop">
              <Image
                src={
                  productsForCategories[2]!.product!.media!.mainMedia!.image!
                    .url!
                }
                width={800}
                height={0}
                alt={
                  productsForCategories[2]!.product!.media!.mainMedia!.image!
                    .altText!
                }
              />
            </a>
            <span className="font-bold text-5xl block text-center mt-[-30px]">
              <a href="/shop">{productsForCategories[2].category}</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
