import {
  mapServiceInfo,
  ServiceInfoViewModel,
} from '@model/service/service.mapper';
import { PagingMetadataV2 } from '@model/service/types';

const BOOKINGS_SERVICES_API =
  'https://www.wixapis.com/bookings/v1/catalog/services';

export const getServices = (
  wixSession: string
): Promise<{
  services: ServiceInfoViewModel[];
  pagingMetadata: PagingMetadataV2;
}> =>
  fetchServices({
    input: {
      query: {
        paging: {
          offset: 0,
          limit: 100,
        },
      },
      isBookOnlineAllowed: false,
    },
    wixSession,
  }).then(({ services, pagingMetadata }) => ({
    services: services.map(mapServiceInfo),
    pagingMetadata,
  }));

export const getServiceBySlug = (
  serviceSlug: string,
  wixSession: string
): Promise<ServiceInfoViewModel | null> =>
  getServiceByFilter(
    {
      'slugs.name': serviceSlug,
    },
    wixSession
  );

export const getServiceById = (
  serviceId: string,
  wixSession: string
): Promise<ServiceInfoViewModel | null> =>
  getServiceByFilter(
    {
      'service.id': serviceId,
    },
    wixSession
  );

const getServiceByFilter = (
  filter: any,
  wixSession: string
): Promise<ServiceInfoViewModel | null> =>
  fetchServices({
    input: {
      query: {
        filter,
        paging: {
          offset: 0,
          limit: 1,
        },
      },
      includeDeleted: false,
      isBookOnlineAllowed: false,
    },
    wixSession,
  }).then(({ services: [service] }) =>
    service ? mapServiceInfo(service) : null
  );

const fetchServices = ({
  input,
  wixSession,
}: {
  input: any;
  wixSession: string;
}) => {
  return fetch(BOOKINGS_SERVICES_API, {
    method: 'POST',
    headers: {
      Cookie: 'svSession=' + wixSession,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  }).then((res) => res.json());
};
