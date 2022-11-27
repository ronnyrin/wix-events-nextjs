// this is a copy from the ambassador package till we move to the sdk

declare type Boolean = boolean;
declare type Int = number;
declare type String = string;
declare type JsonMap<T> = {
  [key: string]: T;
};
export interface BookingPolicySettings {
  maxParticipantsPerBooking?: Int;
}
export interface BookingPolicyViolations {
  bookOnlineDisabled?: Boolean;
  tooEarlyToBook?: Boolean;
  tooLateToBook?: Boolean;
}
export interface CursorPaging {
  cursor?: String;
  limit?: Int;
}
export interface Cursors {
  next?: String;
  prev?: String;
}
export interface GetScheduleAvailabilityRequest {
  scheduleId?: String;
}
export interface GetScheduleAvailabilityResponse {
  availability?: ScheduleAvailability;
  bookingPolicySettings?: BookingPolicySettings;
}
export interface GetSlotAvailabilityRequest {
  returnAllowedBookingIds?: Boolean;
  slot?: Slot;
  timezone?: String;
}
export interface GetSlotAvailabilityResponse {
  allowedBookingIds?: String[];
  availability?: SlotAvailability;
  bookingPolicySettings?: BookingPolicySettings;
}
export interface Location {
  formattedAddress?: String;
  id?: String;
  locationType?: LocationType;
  name?: String;
}
export enum LocationType {
  UNDEFINED = "UNDEFINED",
  OWNER_BUSINESS = "OWNER_BUSINESS",
  OWNER_CUSTOM = "OWNER_CUSTOM",
  CUSTOM = "CUSTOM"
}
export interface Paging {
  limit?: Int;
  offset?: Int;
}
export interface PagingMetadataV2 {
  count?: Int;
  cursors?: Cursors;
  hasNext?: Boolean;
  offset?: Int;
  tooManyToCount?: Boolean;
  total?: Int;
}
export interface QueryAvailabilityRequest {
  query?: QueryV2;
  slotsPerDay?: Int;
  timezone?: String;
}
export interface QueryAvailabilityResponse {
  availabilityEntries?: SlotAvailability[];
  pagingMetadata?: PagingMetadataV2;
}
export interface QueryV2 {
  cursorPaging?: CursorPaging;
  fields?: String[];
  fieldsets?: String[];
  filter?: JsonMap<any>;
  paging?: Paging;
  sort?: Sorting[];
}
export interface ScheduleAvailability {
  bookingPolicyViolations?: BookingPolicyViolations;
  openSpots?: Int;
  totalSpots?: Int;
}
export interface Slot {
  endDate?: String;
  location?: Location;
  resource?: SlotResource;
  scheduleId?: String;
  serviceId?: String;
  sessionId?: String;
  startDate?: String;
  timezone?: String;
}
export interface SlotAvailability {
  bookable?: Boolean;
  bookingPolicyViolations?: BookingPolicyViolations;
  locked?: Boolean;
  openSpots?: Int;
  slot?: Slot;
  totalSpots?: Int;
  waitingList?: WaitingList;
}
export interface SlotResource {
  id?: String;
  name?: String;
  scheduleId?: String;
}
export enum SortOrder {
  ASC = "ASC",
  DESC = "DESC"
}
export interface Sorting {
  fieldName?: String;
  order?: SortOrder;
}
export interface WaitingList {
  openSpots?: Int;
  totalSpots?: Int;
}
export {};
