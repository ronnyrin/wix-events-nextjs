import {
  mapServiceInfo,
  ServiceInfoViewModel,
} from '@model/service/service.mapper';
import { PagingMetadataV2 } from '@model/service/types';
import { WixSession } from '../../auth';

const BOOKINGS_SERVICES_API =
  'https://www.wixapis.com/bookings/v1/catalog/services';

export type GetServicesResponse = {
  services: ServiceInfoViewModel[];
  pagingMetadata: PagingMetadataV2;
};

export const getServices = (
  { limit = 100 },
  wixSession: WixSession
): Promise<GetServicesResponse> =>
  fetchServices({
    input: {
      query: {
        paging: {
          offset: 0,
          limit,
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
  wixSession: WixSession
): Promise<ServiceInfoViewModel | null> =>
  getServiceByFilter(
    {
      'slugs.name': serviceSlug,
    },
    wixSession
  );

export const getServiceById = (
  serviceId: string,
  wixSession: WixSession
): Promise<ServiceInfoViewModel | null> =>
  getServiceByFilter(
    {
      'service.id': serviceId,
    },
    wixSession
  );

const getServiceByFilter = (
  filter: any,
  wixSession: WixSession
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
      isBookOnlineAllowed: true,
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
  wixSession: WixSession;
}) => {
  return fetch(BOOKINGS_SERVICES_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: wixSession.apiKey,
      'wix-site-id': wixSession.siteId,
    },
    body: JSON.stringify(input),
  }).then((res) => res.json());
};
