import Image from "@app/components/Image";
import {getServiceBySlug} from "@model/service/service-api";

// export async function generateStaticParams() {
//   const wixSession = await createWixVisitorSession();
//   const {services} = await getServices(wixSession);
//
//   return services.map(({slug}) => ({ slug, services }));
// }

export default async function ServicePage({params}: any) {
  const service = await getServiceBySlug(params.slug);

  return (
    <>
      <section className="container h-80 min-w-full bg-purple-400 flex justify-center items-center font-sans">
        <h1 className="text-4xl text-white">Book Now</h1>
      </section>
      {service ?
        <div className="my-3 container m-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div key={service.id} className="max-w-sm rounded overflow-hidden shadow-lg">
            <Image media={service.info.media}/>
            <div className="px-6 py-4">
              <div className="font-bold text-xl mb-2">{service.info.name}</div>
              <p className="text-gray-700 text-base">{service.info.tagLine}</p>
              <p
                className="text-gray-700 text-base">{service.payment.paymentDetails.price + service.payment.paymentDetails.currency}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <a
                href={`/service/${service.slug}`}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                Go To Calendar
              </a>
            </div>
          </div>
        </div> :
        <div className="text-3xl w-full text-center p-9 box-border">The service was not found</div>
      }
    </>
  );
}
