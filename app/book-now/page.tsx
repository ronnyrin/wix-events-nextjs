import {cookies} from "next/headers";
import {PagingMetadataV2} from "@model/service/types";
import {mapServiceInfo, ServiceInfoViewModel} from "@model/service/service.mapper";
import Image from "@app/components/Image";

export default async function BookNowPage() {
  const {services} = await getServices();

  return (
    <>
      <section className="container h-80 min-w-full bg-purple-400 flex justify-center items-center font-sans">
        <h1 className="text-4xl text-white">Book Now</h1>
      </section>
      <div className="my-3 container m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {services.map((service, index) => (
          <div key={service.id} className="max-w-sm rounded overflow-hidden shadow-lg">
            <Image media={service.info.media}/>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{service.info.name}</div>
              <p className="text-gray-700 text-base">{service.info.tagLine}</p>
              <p
                className="text-gray-700 text-base">{service.payment.paymentDetails.price + service.payment.paymentDetails.currency}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Book Now
              </button>
            </div>
          </div>))}
      </div>
    </>
  );
}

async function getServices(): Promise<{ services: ServiceInfoViewModel[], pagingMetadata: PagingMetadataV2 }> {
  const nextCookies = cookies();

  return fetch(
    "https://www.wixapis.com/bookings/v1/catalog/services",
    {
      method: "POST",
      headers: {
        Cookie: "svSession=" + nextCookies.get("wixSession"),
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: {
          paging: {
            offset: 0,
            limit: 100,
          }
        },
        includeDeleted: false,
        isBookOnlineAllowed: false,
      }),
    }
  ).then((res) => res.json()).then(({services, pagingMetadata}) => ({
    services: services.map(mapServiceInfo),
    pagingMetadata
  }));
}
