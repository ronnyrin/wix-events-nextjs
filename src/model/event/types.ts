export interface Event {
  /**
   * Event ID.
   * @readonly
   */
  id?: string;
  /** Event location. */
  location?: Location;
  /** Event scheduling. */
  scheduling?: Scheduling;
  /** Event title. */
  title?: string;
  /** Event description. */
  description?: string;
  /** Rich-text content displayed in Wix UI - "About Event" section (HTML). */
  about?: string;
  /** Main event image. */
  mainImage?: Image;
  /** Event slug URL (generated from event title). */
  slug?: string;
  /** ISO 639-1 language code of the event (used in content translations). */
  language?: string;
  /** Event creation timestamp. */
  created?: Date;
  /** Event modified timestamp. */
  modified?: Date;
  /** Event status. */
  status?: EventStatus;
  /** RSVP or ticketing registration details. */
  registration?: Registration;
  /** "Add to calendar" URLs. */
  calendarLinks?: CalendarLinks;
  /** Event page URL components. */
  eventPageUrl?: SiteUrl;
  /** Event registration form. */
  form?: Form;
  /** Event dashboard summary of RSVP / ticket sales. */
  dashboard?: Dashboard;
  /** Instance ID of the site where event is hosted. */
  instanceId?: string;
  /** Guest list configuration. */
  guestListConfig?: GuestListConfig;
  /** Event creator user ID. */
  userId?: string;
  /** Event discussion feed. For internal use. */
  feed?: Feed;
  /** Online conferencing details. */
  onlineConferencing?: OnlineConferencing;
  /** SEO settings. */
  seoSettings?: SeoSettings;
  /** Assigned contacts label key. */
  assignedContactsLabel?: string | null;
  /** Agenda details. */
  agenda?: Agenda;
  /** Categories this event is assigned to. */
  categories?: Category[];
}

export interface Location {
  /** Location name. */
  name?: string | null;
  /** Location map coordinates. */
  coordinates?: MapCoordinates;
  /** Single line address representation. */
  address?: string | null;
  /** Location type. */
  type?: LocationType;
  /**
   * Full address derived from formatted single line `address`.
   * When `full_address` is used to create or update the event, deprecated `address` and `coordinates` are ignored.
   * If provided `full_address` has empty `formatted_address` or `coordinates`, it will be auto-completed using Atlas service.
   *
   * Migration notes:
   * - `full_address.formatted_address` is equivalent to `address`.
   * - `full_address.geocode` is equivalent to `coordinates`.
   */
  fullAddress?: Address;
  /**
   * Defines event location as TBD (To Be Determined).
   * When event location is not yet defined, `name` is displayed instead of location address.
   * `coordinates`, `address`, `type` and `full_address` are not required when location is TBD.
   */
  tbd?: boolean | null;
}

export interface MapCoordinates {
  /** Latitude. */
  lat?: number;
  /** Longitude. */
  lng?: number;
}

export enum LocationType {
  VENUE = 'VENUE',
  ONLINE = 'ONLINE',
}

/** Physical address */
export interface Address extends AddressStreetOneOf {
  /** country code */
  country?: string | null;
  /** subdivision (usually state or region) code according to ISO 3166-2 */
  subdivision?: string | null;
  /** city name */
  city?: string | null;
  /** zip/postal code */
  postalCode?: string | null;
  /** Free text providing more detailed address info. Usually contains Apt, Suite, Floor */
  addressLine2?: string | null;
  /** A string containing the human-readable address of this location */
  formattedAddress?: string | null;
  /** Free text for human-to-human textual orientation aid purposes */
  hint?: string | null;
  /** coordinates of the physical address */
  geocode?: AddressLocation;
  /** country full-name */
  countryFullname?: string | null;
  /** multi-level subdivisions from top to bottom */
  subdivisions?: Subdivision[];
  /** a break down of the street to number and street name */
  streetAddress?: StreetAddress;
  /** Main address line (usually street and number) as free text */
  addressLine?: string | null;
}

/** @oneof */
export interface AddressStreetOneOf {
  /** a break down of the street to number and street name */
  streetAddress?: StreetAddress;
  /** Main address line (usually street and number) as free text */
  addressLine?: string | null;
}

export interface StreetAddress {
  /** street number */
  number?: string;
  /** street name */
  name?: string;
  /** @internal */
  apt?: string;
}

export interface AddressLocation {
  latitude?: number | null;
  longitude?: number | null;
}

export interface Subdivision {
  /** subdivision short code */
  code?: string;
  /** subdivision full-name */
  name?: string;
  /** @internal */
  type?: SubdivisionType;
  /** @internal */
  typeInfo?: string | null;
}

export enum SubdivisionType {
  UNKNOWN_SUBDIVISION_TYPE = 'UNKNOWN_SUBDIVISION_TYPE',
  /** State */
  ADMINISTRATIVE_AREA_LEVEL_1 = 'ADMINISTRATIVE_AREA_LEVEL_1',
  /** County */
  ADMINISTRATIVE_AREA_LEVEL_2 = 'ADMINISTRATIVE_AREA_LEVEL_2',
  /** City/town */
  ADMINISTRATIVE_AREA_LEVEL_3 = 'ADMINISTRATIVE_AREA_LEVEL_3',
  /** Neighborhood/quarter */
  ADMINISTRATIVE_AREA_LEVEL_4 = 'ADMINISTRATIVE_AREA_LEVEL_4',
  /** Street/block */
  ADMINISTRATIVE_AREA_LEVEL_5 = 'ADMINISTRATIVE_AREA_LEVEL_5',
  /** ADMINISTRATIVE_AREA_LEVEL_0. Indicates the national political entity, and is typically the highest order type returned by the Geocoder. */
  COUNTRY = 'COUNTRY',
}

export interface Scheduling {
  /** Schedule configuration. */
  config?: ScheduleConfig;
  /** Formatted schedule representation. */
  formatted?: string;
  /** Formatted start date of the event (empty for TBD schedules). */
  startDateFormatted?: string;
  /** Formatted start time of the event (empty for TBD schedules). */
  startTimeFormatted?: string;
}

export interface ScheduleConfig {
  /**
   * Defines event as TBD (To Be Determined) schedule.
   * When event time is not yet defined, TBD message is displayed instead of event start and end times.
   * `startDate`, `endDate` and `timeZoneId` are not required when schedule is TBD.
   */
  scheduleTbd?: boolean;
  /** TBD message. */
  scheduleTbdMessage?: string | null;
  /** Event start timestamp. */
  startDate?: Date;
  /** Event end timestamp. */
  endDate?: Date;
  /** Event time zone ID in TZ database format, e.g., `EST`, `America/Los_Angeles`. */
  timeZoneId?: string | null;
  /** Whether end date is hidden in the formatted schedule. */
  endDateHidden?: boolean;
  /** Whether time zone is displayed in formatted schedule. */
  showTimeZone?: boolean;
  /** Event recurrences. */
  recurrences?: Recurrences;
}

export interface Recurrences {
  /** Event occurrences. */
  occurrences?: Occurrence[];
  /**
   * Recurring event category ID.
   * @readonly
   */
  categoryId?: string | null;
  /**
   * Recurrence status.
   * @readonly
   */
  status?: Status;
}

export interface Occurrence {
  /** Event start timestamp. */
  startDate?: Date;
  /** Event end timestamp. */
  endDate?: Date;
  /** Event time zone ID in TZ database format, e.g., `EST`, `America/Los_Angeles`. */
  timeZoneId?: string | null;
  /** Whether time zone is displayed in formatted schedule. */
  showTimeZone?: boolean;
}

export enum Status {
  /** Event occurs only once. */
  ONE_TIME = 'ONE_TIME',
  /** Event is recurring. */
  RECURRING = 'RECURRING',
  /** Marks the next upcoming occurrence of the recurring event. */
  RECURRING_NEXT = 'RECURRING_NEXT',
  /** Marks the most recent ended occurrence of the recurring event. */
  RECURRING_LAST_ENDED = 'RECURRING_LAST_ENDED',
  /** Marks the most recent canceled occurrence of the recurring event. */
  RECURRING_LAST_CANCELED = 'RECURRING_LAST_CANCELED',
}

export interface Image {
  /** WixMedia image ID. */
  id?: string | null;
  /** Image URL. */
  url?: string;
  /** Original image height. */
  height?: number | null;
  /** Original image width. */
  width?: number | null;
  /** Image alt text. Optional. */
  altText?: string | null;
  /**
   * Image URL expiration date (when relevant). Optional
   * @internal
   */
  urlExpirationDate?: Date;
}

export enum EventStatus {
  /** Event is public and scheduled to start */
  SCHEDULED = 'SCHEDULED',
  /** Event has started */
  STARTED = 'STARTED',
  /** Event has ended */
  ENDED = 'ENDED',
  /** Event was canceled */
  CANCELED = 'CANCELED',
  /** Event is not public and needs to be published */
  DRAFT = 'DRAFT',
}

export interface Registration {
  /** Event type. */
  type?: EventType;
  /** Event registration status. */
  status?: RegistrationStatus;
  /** RSVP collection details. */
  rsvpCollection?: RsvpCollection;
  /** Ticketing details. */
  ticketing?: Ticketing;
  /** External registration details. */
  external?: ExternalEvent;
  /** Types of users allowed to register. */
  restrictedTo?: VisitorType;
  /** Initial event type which was set when creating an event. */
  initialType?: EventType;
}

export enum EventType {
  /** Type not available for this request fieldset */
  NA_EVENT_TYPE = 'NA_EVENT_TYPE',
  /** Registration via RSVP */
  RSVP = 'RSVP',
  /** Registration via ticket purchase */
  TICKETS = 'TICKETS',
  /** External registration */
  EXTERNAL = 'EXTERNAL',
  /** Registration not available */
  NO_REGISTRATION = 'NO_REGISTRATION',
}

export enum RegistrationStatus {
  /** Registration status is not applicable */
  NA_REGISTRATION_STATUS = 'NA_REGISTRATION_STATUS',
  /** Registration to event is closed */
  CLOSED = 'CLOSED',
  /** Registration to event is closed manually */
  CLOSED_MANUALLY = 'CLOSED_MANUALLY',
  /** Registration is open via RSVP */
  OPEN_RSVP = 'OPEN_RSVP',
  /** Registration to event waitlist is open via RSVP */
  OPEN_RSVP_WAITLIST = 'OPEN_RSVP_WAITLIST',
  /** Registration is open via ticket purchase */
  OPEN_TICKETS = 'OPEN_TICKETS',
  /** Registration is open via external URL */
  OPEN_EXTERNAL = 'OPEN_EXTERNAL',
  /** Registration will be open via RSVP */
  SCHEDULED_RSVP = 'SCHEDULED_RSVP',
}

export interface RsvpCollection {
  /** RSVP collection configuration. */
  config?: RsvpCollectionConfig;
}

export interface RsvpCollectionConfig {
  /** Defines the supported RSVP statuses. */
  rsvpStatusOptions?: RsvpStatusOptions;
  /**
   * Total guest limit available to register to the event.
   * Additional guests per RSVP are counted towards total guests.
   */
  limit?: number | null;
  /** Whether a waitlist is opened when total guest limit is reached, allowing guests to create RSVP with WAITING RSVP status. */
  waitlist?: boolean;
  /** Registration start timestamp. */
  startDate?: Date;
  /** Registration end timestamp. */
  endDate?: Date;
}

export enum RsvpStatusOptions {
  /** Only YES RSVP status is available for RSVP registration */
  YES_ONLY = 'YES_ONLY',
  /** YES and NO RSVP status options are available for the registration */
  YES_AND_NO = 'YES_AND_NO',
}

export interface Ticketing {
  /** Deprecated. */
  lowestPrice?: string | null;
  /** Deprecated. */
  highestPrice?: string | null;
  /** Currency used in event transactions. */
  currency?: string | null;
  /** Ticketing configuration. */
  config?: TicketingConfig;
  /**
   * Price of lowest priced ticket.
   * @readonly
   */
  lowestTicketPrice?: Money;
  /**
   * Price of highest priced ticket.
   * @readonly
   */
  highestTicketPrice?: Money;
  /**
   * Formatted price of lowest priced ticket.
   * @readonly
   */
  lowestTicketPriceFormatted?: string | null;
  /**
   * Formatted price of highest priced ticket.
   * @readonly
   */
  highestTicketPriceFormatted?: string | null;
  /**
   * Whether all tickets are sold for this event.
   * @readonly
   */
  soldOut?: boolean | null;
}

export interface TicketingConfig {
  /** Whether the form must be filled out separately for each ticket. */
  guestAssignedTickets?: boolean;
  /** Tax configuration. */
  taxConfig?: TaxConfig;
  /** Limit of tickets that can be purchased per order, default 20. */
  ticketLimitPerOrder?: number;
  /**
   * App Id for external ticket stock management.
   * By default tickets stock is defined in TicketDefinition object.
   * If defined then limitation from TicketDefinition is ignored.
   * @internal
   */
  stockManagerAppId?: string | null;
}

export interface TaxConfig {
  /** Tax application settings. */
  type?: TaxType;
  /** Tax name. */
  name?: string | null;
  /** Tax rate (e.g.,`21.55`). */
  rate?: string | null;
  /** Applies taxes for donations, default true. */
  appliesToDonations?: boolean | null;
}

export enum TaxType {
  /** Tax is included in the ticket price */
  INCLUDED = 'INCLUDED',
  /** Tax is added to the order at the checkout */
  ADDED = 'ADDED',
  /** Tax is added to the final total at the checkout */
  ADDED_AT_CHECKOUT = 'ADDED_AT_CHECKOUT',
}

export interface Money {
  /** Decimal amount representation. Deprecated, use `value` instead. */
  amount?: string;
  /** ISO 4217 format of the currency i.e. `USD`. */
  currency?: string;
  /** Monetary amount. Decimal string with a period as a decimal separator (e.g., 3.99). Optionally, a single (-), to indicate that the amount is negative. */
  value?: string | null;
}

export interface ExternalEvent {
  /** External event registration URL. */
  registration?: string;
}

export enum VisitorType {
  /** Site visitor (including member) */
  VISITOR = 'VISITOR',
  /** Site member */
  MEMBER = 'MEMBER',
  /** Site visitor or member */
  VISITOR_OR_MEMBER = 'VISITOR_OR_MEMBER',
}

export interface CalendarLinks {
  /** "Add to Google calendar" URL. */
  google?: string;
  /** "Download ICS calendar file" URL. */
  ics?: string;
}

/** Site URL components */
export interface SiteUrl {
  /**
   * Base URL. For premium sites, this will be the domain.
   * For free sites, this would be site URL (e.g `mysite.wixsite.com/mysite`)
   */
  base?: string;
  /** The path to that page - e.g `/my-events/weekly-meetup-2` */
  path?: string;
}

/**
 * The form defines which elements are rendered in the Wix UI during the registration process (RSVP or checkout).
 * It also contains customizable messages and labels.
 *
 *
 * A form is an ordered list of controls (blocks), which accept guest information into a field input.
 *
 * Each control contains one or more nested inputs. For example, `Name` control has two inputs:
 * - First Name
 * - Last Name
 *
 * By default, name and email controls are always required and are pinned to the top of the form.
 */
export interface Form {
  /** Nested fields as an ordered list. */
  controls?: InputControl[];
  /** Set of configured form messages. */
  messages?: FormMessages;
}

/**
 * A block of nested fields.
 * Used to aggregate similar inputs like First Name and Last Name.
 */
export interface InputControl {
  /** Field control type. */
  type?: InputControlType;
  /** Whether control is mandatory (such as name & email). When true, only label can be changed. */
  system?: boolean;
  /** Deprecated: Use `id`. */
  name?: string;
  /** Child inputs. */
  inputs?: Input[];
  /** Deprecated: use `inputs.label`. */
  label?: string;
  /** Field controls are sorted by this value in ascending order. */
  orderIndex?: number;
  /** Unique control ID. */
  id?: string;
}

export enum InputControlType {
  /** Single text value field. */
  INPUT = 'INPUT',
  /** Single text value field. */
  TEXTAREA = 'TEXTAREA',
  /** Single-choice field of predefined values. */
  DROPDOWN = 'DROPDOWN',
  /** Single-choice field of predefined values. */
  RADIO = 'RADIO',
  /** Multiple-choice field of predefined values. */
  CHECKBOX = 'CHECKBOX',
  /** First and last name fields. */
  NAME = 'NAME',
  /** Additional guests and respective guest names fields. */
  GUEST_CONTROL = 'GUEST_CONTROL',
  /** Single-line address field. */
  ADDRESS_SHORT = 'ADDRESS_SHORT',
  /** Full address field. */
  ADDRESS_FULL = 'ADDRESS_FULL',
  /** Year, month and day fields. */
  DATE = 'DATE',
}

/** An input of one or multiple text values */
export interface Input {
  /** Field name. */
  name?: string;
  /** Deprecated: use `ValueType.TEXT_ARRAY`. */
  array?: boolean;
  /** Main field label */
  label?: string;
  /** Additional labels for multi-valued fields such as address. */
  additionalLabels?: Record<string, string>;
  /** Predefined choice options for fields, such as dropdown. */
  options?: string[];
  /** Whether field is mandatory. */
  mandatory?: boolean;
  /** Maximum number of accepted characters (relevant for text fields). */
  maxLength?: number;
  /**
   * Type which determines field format.
   * Used to validate submitted response.
   */
  type?: ValueType;
  /**
   * A maximum accepted values for array input.
   * Only applicable for inputs of valueType: TEXT_ARRAY.
   */
  maxSize?: number | null;
  /**
   * Preselected option.
   * Currently only applicable for dropdown.
   */
  defaultOptionSelection?: OptionSelection;
  /**
   * Additional labels for multi-valued fields such as address.
   * @readonly
   */
  labels?: Label[];
}

export enum ValueType {
  TEXT = 'TEXT',
  NUMBER = 'NUMBER',
  TEXT_ARRAY = 'TEXT_ARRAY',
  DATE_TIME = 'DATE_TIME',
  ADDRESS = 'ADDRESS',
}

/**
 * Describes initially selected option when an input has multiple choices.
 * Defaults to first (0th) option if not configured.
 */
export interface OptionSelection extends OptionSelectionSelectedOptionOneOf {
  /** 0-based index from predefined `input.options` which is selected initially. */
  optionIndex?: number;
  /**
   * Placeholder hint describing expected choices (such as "Please select").
   * Considered an empty choice.
   */
  placeholderText?: string;
}

/** @oneof */
export interface OptionSelectionSelectedOptionOneOf {
  /** 0-based index from predefined `input.options` which is selected initially. */
  optionIndex?: number;
  /**
   * Placeholder hint describing expected choices (such as "Please select").
   * Considered an empty choice.
   */
  placeholderText?: string;
}

export interface Label {
  /** Field name. */
  name?: string;
  /** Field label. */
  label?: string;
}

/**
 * Defines form messages shown in UI before, during, and after registration flow.
 * It enables configuration of form titles, response labels, "thank you" messages, and call-to-action texts.
 */
export interface FormMessages {
  /** RSVP form messages. */
  rsvp?: RsvpFormMessages;
  /** Checkout form messages. */
  checkout?: CheckoutFormMessages;
  /** Messages shown when event registration is closed. */
  registrationClosed?: RegistrationClosedMessages;
  /** Messages shown when event tickets are unavailable. */
  ticketsUnavailable?: TicketsUnavailableMessages;
}

export interface RsvpFormMessages {
  /** Label text indicating RSVP `YES` response. */
  rsvpYesOption?: string;
  /** Label text indicating RSVP `NO` response. */
  rsvpNoOption?: string;
  /** Messages shown for RSVP = `YES`. */
  positiveMessages?: Positive;
  /** Messages shown for RSVP = `WAITING` (when event is full and waitlist is available). */
  waitlistMessages?: Positive;
  /** Messages shown for RSVP = `NO`. */
  negativeMessages?: Negative;
  /** "Submit form" call-to-action label text. */
  submitActionLabel?: string;
}

/** Confirmation messages shown after registration. */
export interface PositiveResponseConfirmation {
  /** Confirmation message title. */
  title?: string;
  /** Confirmation message text. */
  message?: string;
  /** "Add to calendar" call-to-action label text. */
  addToCalendarActionLabel?: string;
  /** "Share event" call-to-action label text. */
  shareActionLabel?: string;
}

/** Confirmation messages shown after registration. */
export interface ResponseConfirmation {
  /** Confirmation message title. */
  title?: string;
  /** "Share event" call-to-action label text. */
  shareActionLabel?: string;
}

/** Set of messages shown during registration when RSVP response is positive. */
export interface Positive {
  /** Main form title for positive response. */
  title?: string;
  /** Confirmation messages shown after registration. */
  confirmation?: PositiveResponseConfirmation;
}

/** A set of messages shown during registration with negative response */
export interface Negative {
  /** Main form title for negative response. */
  title?: string;
  /** Confirmation messages shown after registration. */
  confirmation?: ResponseConfirmation;
}

export interface CheckoutFormMessages {
  /** Main form title for response. */
  title?: string;
  /** Submit form call-to-action label text. */
  submitActionLabel?: string;
}

export interface RegistrationClosedMessages {
  /** Message shown when event registration is closed. */
  message?: string;
  /** "Explore other events" call-to-action label text. */
  exploreEventsActionLabel?: string;
}

export interface TicketsUnavailableMessages {
  /** Message shown when event tickets are unavailable. */
  message?: string;
  /** "Explore other events" call-to-action label text. */
  exploreEventsActionLabel?: string;
}

export interface Dashboard {
  /** Guest RSVP summary. */
  rsvpSummary?: RsvpSummary;
  /**
   * Summary of revenue and tickets sold.
   * (Archived orders are not included).
   */
  ticketingSummary?: TicketingSummary;
}

export interface RsvpSummary {
  /** Total number of RSVPs. */
  total?: number;
  /** Number of RSVPs with status `YES`. */
  yes?: number;
  /** Number of RSVPs with status `NO`. */
  no?: number;
  /** Number of RSVPs in waitlist. */
  waitlist?: number;
}

export interface TicketingSummary {
  /** Number of tickets sold. */
  tickets?: number;
  /**
   * Total revenue, excluding fees.
   * (taxes and payment provider fees are not deducted.)
   */
  revenue?: Money;
  /** Whether currency is locked and cannot be changed (generally occurs after the first order in the specified currency has been created). */
  currencyLocked?: boolean;
  /** Number of orders placed. */
  orders?: number;
  /** Total balance of confirmed transactions. */
  totalSales?: Money;
}

export interface GuestListConfig {
  /** Whether members can see other members attending the event (defaults to true). */
  publicGuestList?: boolean;
}

export interface Feed {
  /** Event discussion feed token. */
  token?: string;
}

export interface OnlineConferencing {
  config?: OnlineConferencingConfig;
  session?: OnlineConferencingSession;
  /**
   * Configured conferencing provider name.
   * @internal
   * @readonly
   */
  providerName?: string;
}

export interface OnlineConferencingConfig {
  /**
   * Whether online conferencing is enabled (not supported for TBD schedules).
   * When enabled, links to join conferencing are generated and provided to guests.
   */
  enabled?: boolean;
  /** Conferencing provider ID. */
  providerId?: string | null;
  /** Conference type */
  conferenceType?: ConferenceType;
}

export enum ConferenceType {
  /** Everyone in the meeting can publish and subscribe video and audio. */
  MEETING = 'MEETING',
  /** Guests can only subscribe to video and audio. */
  WEBINAR = 'WEBINAR',
}

export interface OnlineConferencingSession {
  /**
   * Link for event host to start the online conference session.
   * @readonly
   */
  hostLink?: string;
  /**
   * Link for guests to join the online conference session.
   * @readonly
   */
  guestLink?: string;
  /**
   * The password required to join online conferencing session (when relevant).
   * @readonly
   */
  password?: string | null;
  /**
   * Indicates that session was created successfully on providers side.
   * @readonly
   */
  sessionCreated?: boolean | null;
  /**
   * Unique session id
   * @readonly
   */
  sessionId?: string | null;
}

export interface SeoSettings {
  /** URL slug */
  slug?: string;
  /** Advanced SEO data */
  advancedSeoData?: SeoSchema;
  /**
   * Hidden from SEO Site Map
   * @readonly
   */
  hidden?: boolean | null;
}

/**
 * The SEO schema object contains data about different types of meta tags. It makes sure that the information about your page is presented properly to search engines.
 * The search engines use this information for ranking purposes, or to display snippets in the search results.
 * This data will override other sources of tags (for example patterns) and will be included in the <head> section of the HTML document, while not being displayed on the page itself.
 */
export interface SeoSchema {
  /** SEO tags information. */
  tags?: Tag[];
  /** SEO general settings. */
  settings?: Settings;
}

export interface Tag {
  /** SEO tag type. Supported values: `title`, `meta`, `script`, `link`. */
  type?: string;
  /** SEO tag attributes/properties (name, content, rel, href). */
  props?: Record<string, any> | null;
  /** Tag meta data, e.g. {height: 300, width: 240}. */
  meta?: Record<string, any> | null;
  /** Tag inner content e.g. `<title> inner content </title>`. */
  children?: string;
  /** Whether the tag is a custom tag. */
  custom?: boolean;
  /** Whether the tag is disabled. */
  disabled?: boolean;
}

export interface Settings {
  /** disable auto creation of 301 redirects on slug changes (enabled by default). */
  preventAutoRedirect?: boolean;
}

export interface Agenda {
  enabled?: boolean;
  /**
   * Agenda page URL.
   * @readonly
   */
  pageUrl?: SiteUrl;
}

export interface Category {
  /**
   * Category ID.
   * @readonly
   */
  id?: string;
  /** Category name. */
  name?: string;
  /**
   * Category creation timestamp.
   * @readonly
   */
  createdDate?: Date;
  /**
   * Assigned events count. Deleted events are excluded.
   * @readonly
   */
  assignedEventsCount?: number | null;
  /** @readonly */
  counts?: CategoryCounts;
  /**
   * Category state. Default - MANUAL.
   * WIX_EVENTS.MANAGE_AUTO_CATEGORIES permission is required to use other states.
   * Field will be ignored on update requests.
   */
  states?: State[];
  /**
   * Optionally client defined external ID.
   * @internal
   */
  externalId?: string | null;
}

export interface CategoryCounts {
  /** Assigned events count. Deleted events are excluded. */
  assignedEventsCount?: number | null;
  /** Assigned draft events count. */
  assignedDraftEventsCount?: number | null;
}

export enum State {
  /** Created manually by the user. */
  MANUAL = 'MANUAL',
  /** Created automatically. */
  AUTO = 'AUTO',
  /** Created when publishing recurring events. */
  RECURRING_EVENT = 'RECURRING_EVENT',
  /** Category is hidden. */
  HIDDEN = 'HIDDEN',
  /** Category is used to store component events. */
  COMPONENT = 'COMPONENT',
}

export enum EventFieldset {
  FULL = 'FULL',
  /** Include `description`, `mainImage` and `calendarLinks` in the response. */
  DETAILS = 'DETAILS',
  /** Include `about` event rich text in the response. */
  TEXTS = 'TEXTS',
  /** Include `registration` in the response. */
  REGISTRATION = 'REGISTRATION',
  /** Include `eventPageUrl` in the response. */
  URLS = 'URLS',
  /** Include `form` in the response. */
  FORM = 'FORM',
  /** Include `dashboard` in the response. */
  DASHBOARD = 'DASHBOARD',
  /** Include `feed` in the response. */
  FEED = 'FEED',
  /** Include `onlineConferencing` in the response. */
  ONLINE_CONFERENCING_SESSION = 'ONLINE_CONFERENCING_SESSION',
  /** Include `seoSettings` in the response. */
  SEO_SETTINGS = 'SEO_SETTINGS',
  /** Include `agendaSettings` in the response. */
  AGENDA = 'AGENDA',
  /** Include `categories` in the response. */
  CATEGORIES = 'CATEGORIES',
}

export interface FacetCounts {
  /** Facet counts aggregated per value */
  counts?: Record<string, number>;
}

export interface QueryEventsV2Request {
  query?: QueryV2;
  /**
   * Controls which event properties are returned. See [Fieldset](https://dev.wix.com/api/rest/wix-events/wix-events/fieldset#wix-events_wix-events_fieldset_event-fieldset).
   * Some fields require additional computation that affects latency.
   * Use minimum set of required fieldset for best performance.
   */
  fieldset?: EventFieldset[];
  /**
   * Filter facets to include in the response.
   * See [supported facets](https://dev.wix.com/api/rest/wix-events/wix-events/filter-and-sort#wix-events_wix-events_filter-and-sort_list-query-events).
   */
  facet?: string[];
  /**
   * Whether draft events should be returned in the response.
   * Requires WIX_EVENTS.MANAGE_EVENTS permission.
   */
  includeDrafts?: boolean;
}

export interface QueryV2 extends QueryV2PagingMethodOneOf {
  /** Filter. See [supported fields and operators](https://dev.wix.com/api/rest/wix-events/wix-events/filter-and-sort#wix-events_wix-events_filter-and-sort_list-query-events). */
  filter?: Record<string, any> | null;
  /**
   * Sort object in the form [{"fieldName":"sortField1"},{"fieldName":"sortField2","direction":"DESC"}]
   * See [supported fields](https://dev.wix.com/api/rest/wix-events/wix-events/filter-and-sort#wix-events_wix-events_filter-and-sort_list-query-events).
   */
  sort?: Sorting[];
  /**
   * Pointer to page of results using offset.
   * See [Pagination](https://dev.wix.com/api/rest/getting-started/pagination).
   */
  paging?: Paging;
}

/** @oneof */
export interface QueryV2PagingMethodOneOf {
  /**
   * Pointer to page of results using offset.
   * See [Pagination](https://dev.wix.com/api/rest/getting-started/pagination).
   */
  paging?: Paging;
}

export interface Sorting {
  /** Name of the field to sort by */
  fieldName?: string;
  /** Sort order (ASC/DESC). Defaults to ASC */
  order?: SortOrder;
}

export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface Paging {
  /** Number of items to load per page. */
  limit?: number | null;
  /** Number of items to skip in the current sort order. */
  offset?: number | null;
}

export interface QueryEventsV2Response {
  pagingMetadata?: PagingMetadataV2;
  /** Events list */
  events?: Event[];
  /** Filter facets. */
  facets?: Record<string, FacetCounts>;
}

export interface PagingMetadataV2 {
  /** Number of items returned in the response. */
  count?: number | null;
  /** Offset that was requested. */
  offset?: number | null;
  /** Total number of items that match the query. Returned if offset paging is used and the `tooManyToCount` flag is not set. */
  total?: number | null;
  /** Flag that indicates the server failed to calculate the `total` field. */
  tooManyToCount?: boolean | null;
  /** Cursors to navigate through the result pages using `next` and `prev`. Returned if cursor paging is used. */
  cursors?: Cursors;
  /**
   * Indicates if there are more results after the current page.
   * If `true`, another page of results can be retrieved.
   * If `false`, this is the last page.
   * @internal
   */
  hasNext?: boolean | null;
}

export interface Cursors {
  /** Cursor pointing to next page in the list of results. */
  next?: string | null;
  /** Cursor pointing to previous page in the list of results. */
  prev?: string | null;
}
