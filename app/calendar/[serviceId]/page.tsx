import Image from "@app/components/Image/Image";
import {getServiceById} from "@model/service/service-api";
import Calendar from "@app/components/Calendar/Calendar";
import {useServerAuthSession} from "@app/hooks/useServerAuthSession";

// export async function generateStaticParams() {
//   const wixSession = await createWixVisitorSession();
//   const {services} = await getServices(wixSession);
//
//   return services.map(({slug}) => ({ slug, services }));
// }

export default async function ServicePage({params}: any) {
  const wixSession = useServerAuthSession();
  const service = await getServiceById(params.serviceId, wixSession);

  return (
    <>
      {service ?
        <div key={service.id} className="full-w rounded overflow-hidden shadow-lg max-w-7xl mx-auto">
          {service.info.media.coverMedia && <section className="max-h-96 overflow-hidden">
            <Image media={service.info.media.coverMedia}/>
          </section>}
          <Calendar service={service} wixSession={wixSession}/>
        </div> :
        <div className="text-3xl w-full text-center p-9 box-border">The service was not found</div>
      }
    </>
  );
}
