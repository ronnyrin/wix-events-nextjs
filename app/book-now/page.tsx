import ServiceList from "@app/components/ServiceList/ServiceList";
import {getServices} from "@model/service/service-api";

export default async function BookNowPage({params}: any) {
  const {services} = await getServices();
  return (<ServiceList categoryId={params?.category} services={services}/>);
}
