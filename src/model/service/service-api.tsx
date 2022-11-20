import {mapServiceInfo, ServiceInfoViewModel} from "@model/service/service.mapper";
import {PagingMetadataV2} from "@model/service/types";
import {cookies} from "next/headers";

const BOOKINGS_SERVICES_API = "https://www.wixapis.com/bookings/v1/catalog/services";

export const getServices = (wixSession?: string): Promise<{ services: ServiceInfoViewModel[], pagingMetadata: PagingMetadataV2 }> =>
  fetchServices({
    input: {
      query: {
        paging: {
          offset: 0,
          limit: 100,
        }
      },
      isBookOnlineAllowed: false,
    }, wixSession
  }).then(({services, pagingMetadata}) => ({
    services: services.map(mapServiceInfo),
    pagingMetadata
  }));

export const getServiceBySlug = (serviceSlug: string, wixSession?: string): Promise<ServiceInfoViewModel | null> =>
  fetchServices({
    input: {
      query: {
        filter: {
          "slugs.name": serviceSlug,
        },
        paging: {
          offset: 0,
          limit: 1,
        }
      },
      includeDeleted: false,
      isBookOnlineAllowed: false,
    }, wixSession
  }).then(({services: [service]}) => (service ? mapServiceInfo(service) : null));

const fetchServices = ({input, wixSession}: { input: any, wixSession?: string }) => {
  const svSession = wixSession ?? cookies().get("wixSession");

  return fetch(
    BOOKINGS_SERVICES_API, {
      method: "POST",
      headers: {
        Cookie: "svSession=" + svSession,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(input),
    }).then((res) => res.json());
}

