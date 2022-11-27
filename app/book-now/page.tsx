import ServiceList from "@app/components/ServiceList/ServiceList";
import {getServices} from "@model/service/service-api";
import {useServerAuthSession} from "@app/hooks/useServerAuthSession";

export default async function BookNowPage({params}: any) {
  const wixSession = useServerAuthSession();
  const {services} = await getServices(wixSession);
  return (<ServiceList categoryId={params?.category} services={services}/>);
}
