import './page.css';
import Image from 'next/image';
import { getWixClient } from '@app/hooks/useWixClientServer';
import { events as api } from '@wix/events';
import { WixMediaImage } from '@app/components/Image/WixMediaImage';
import { getDatePart } from '@app/utils/date-formatter';

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

  const { events } = await wixClient.events.queryEventsV2({
    fieldset: [api.EventFieldset.FULL, api.EventFieldset.DETAILS],
    query: {
      paging: { limit: 10, offset: 0 },
      sort: [{ fieldName: 'start', order: api.SortOrder.ASC }],
    },
  });
  return (
    <div className="max-w-full-content mx-auto relative">
      <div className="bg-zinc-900 text-site py-20">
        <div className="px-14">
          <h1 className="uppercase text-7xl">SHOWS</h1>
          <div className="py-10 px-44">
            {events!.map((event) => (
              <div className="flex border-b items-center gap-8" key={event._id}>
                <a
                  href={`/events/${event.slug}`}
                  className="flex flex-1 items-center gap-8"
                >
                  <div className="flex gap-8 transition duration-300 hover:max-w-0 max-w-lg transition-[max-width]">
                    <div className="w-[80px] h-[80px]">
                      <WixMediaImage
                        media={event.mainImage}
                        width={80}
                        height={80}
                      />
                    </div>
                    <div className="flex gap-4 items-center">
                      <span className="text-4xl">
                        {getDatePart(
                          new Date(event.scheduling?.config?.startDate!),
                          'day',
                          event!.scheduling!.config!.timeZoneId!
                        )}
                      </span>
                      <div className="flex flex-col text-xs">
                        <span className="text-gray-600">
                          {getDatePart(
                            new Date(event.scheduling?.config?.startDate!),
                            'weekday',
                            event!.scheduling!.config!.timeZoneId!
                          )}
                        </span>
                        <span>
                          {getDatePart(
                            new Date(event.scheduling?.config?.startDate!),
                            'month',
                            event!.scheduling!.config!.timeZoneId!
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                  <span className="text-2xl grow">{event.title}</span>
                </a>
                <a
                  className="btn-main my-10 rounded-2xl"
                  href={`/events/${event.slug}`}
                >
                  Buy Tickets
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex gap-14 px-14">
        <div className="text-custom-1 text-left py-20 basis-1/2 bg-site">
          <h1 className="uppercase text-7xl text-black">Merch</h1>
          <p className="text-lg my-10 text-black">
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
