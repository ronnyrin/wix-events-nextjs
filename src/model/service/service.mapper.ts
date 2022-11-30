import { mapServiceOfferedAsDto } from './service-offered-as.mapper';
import { mapServicePricingPlansDto } from './service-pricing-plans.mapper';
import { mapServicePaymentDto } from './service-payment.mapper';
import { ServiceType } from '@model/service/service-types.internal';
import {
  CommonImage,
  GetServiceResponse,
  Schedule,
  ScheduleStatus,
} from '@model/service/types';

export function mapServiceType(schedule: Schedule): ServiceType {
  return schedule.tags
    ? (schedule.tags.find(
        (tag) =>
          tag === ServiceType.COURSE ||
          tag === ServiceType.GROUP ||
          tag === ServiceType.INDIVIDUAL
      ) as ServiceType) || ServiceType.INDIVIDUAL
    : ServiceType.INDIVIDUAL;
}

export type ServiceInfoViewModel = ReturnType<typeof mapServiceInfo>;

export type ServiceImage = CommonImage;

export function mapServiceInfo(serviceResponse: GetServiceResponse) {
  const schedule = serviceResponse.schedules?.find(
    (serviceSchedule) => serviceSchedule.status === ScheduleStatus.CREATED
  );

  const { info } = serviceResponse.service!;
  let mainMedia = info?.media?.mainMedia?.image ?? info?.images?.[0];
  let coverMedia = info?.media?.coverMedia?.image ?? info?.images?.[0];
  let otherMediaItems =
    (info?.media?.items
      ?.filter((item) => !!item?.image)
      .map(({ image }) => image) as CommonImage[] | undefined) ?? info?.images;
  const { name, description, tagLine } = serviceResponse.service!.info!;

  return {
    id: serviceResponse?.service?.id,
    scheduleId: schedule!.id,
    info: {
      name,
      description,
      tagLine,
      media: {
        mainMedia,
        otherMediaItems,
        coverMedia,
      },
    },
    slug: serviceResponse.slugs?.[0].name,
    type: mapServiceType(schedule!),
    categoryId: serviceResponse!.category!.id!,
    categoryName: serviceResponse!.category!.name!,
    payment: mapServicePayment(serviceResponse),
    staffMembers: mapStaffMembers(serviceResponse),
  };
}

export function mapServicePayment(serviceResponse: GetServiceResponse) {
  return {
    offeredAs: mapServiceOfferedAsDto(serviceResponse),
    pricingPlanInfo: mapServicePricingPlansDto(serviceResponse, {
      onlyActive: true,
    }),
    paymentDetails: mapServicePaymentDto(serviceResponse),
  };
}

function mapStaffMembers(serviceResponse: GetServiceResponse) {
  const { resources } = serviceResponse;
  return resources?.map((resource) => {
    return {
      id: resource.id,
      name: resource.name,
    };
  });
}

function extractServiceVideoConferenceProvider(
  schedule: Schedule
): string | undefined {
  return schedule?.conferenceProvider?.providerId;
}
