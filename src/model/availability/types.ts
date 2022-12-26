import { Money } from '@model/event/types';

export interface ListAvailableTicketsRequest {
  /** Event ID. If not provided, available tickets for all events in the site will be returned. */
  eventId?: string;
  /** Offset. */
  offset?: number;
  /** Limit. */
  limit?: number;
  /**
   * Sort order, defaults to "created:asc".
   * See [supported fields](https://dev.wix.com/api/rest/wix-events/wix-events/filter-and-sort#wix-events_wix-events_filter-and-sort_list-query-available-tickets).
   */
  sort?: string;
}

export interface ListAvailableTicketsResponse {
  /** Ticket definitions meta data. */
  metaData?: ResponseMetaData;
  /** Ticket definitions. */
  definitions?: TicketDefinition[];
}

export interface ResponseMetaData {
  /** Number of items in the response. */
  count?: number;
  /** Offset of items. */
  offset?: number;
  /** Total number of matching items. */
  total?: number;
}

export interface TicketDefinition {
  /** Ticket definition ID. */
  id?: string;
  /** Ticket price. */
  price?: Money;
  /** Whether the ticket is free (read only). */
  free?: boolean;
  /** Ticket name. */
  name?: string;
  /** Ticket description. */
  description?: string;
  /**
   * Limit of tickets that can be purchased per checkout.
   * Set to 20 for unlimited ticket definition.
   */
  limitPerCheckout?: number;
  /** Custom sort index. */
  orderIndex?: number;
  /** Policy information plain text block, as printed on the ticket. */
  policy?: string;
  /** Sensitive dashboard data. */
  dashboard?: Dashboard;
  /** Event ID associated with the ticket. */
  eventId?: string;
  /**
   * Whether the fixed-rate service fee is applied at checkout to each ticket sold.
   * @readonly
   */
  wixFeeConfig?: WixFeeConfig;
  /** Ticket sale period. */
  salePeriod?: TicketSalePeriod;
  /**
   * Ticket sale status.
   * @readonly
   */
  saleStatus?: TicketSaleStatus;
  /** Ticket state. */
  state?: any;
  /**
   * Ticket pricing.
   * @internal
   */
  pricing?: TicketPricing;
}

export interface TicketPricing extends TicketPricingPriceOneOf {
  /**
   * Ticket pricing type.
   * @internal
   * @readonly
   */
  pricingType?: Type;
  /** Ticket price which is read only. */
  fixedPrice?: Money;
  /** Min price per ticket, customizable. */
  minPrice?: Money;
  /** Ticket pricing options. */
  pricingOptions?: PricingOptions;
}

/** @oneof */
export interface TicketPricingPriceOneOf {
  /** Ticket price which is read only. */
  fixedPrice?: Money;
  /** Min price per ticket, customizable. */
  minPrice?: Money;
  /** Ticket pricing options. */
  pricingOptions?: PricingOptions;
}

export interface PricingOptions {
  /** Multiple ticket pricing options. */
  options?: PricingOption[];
}

export interface PricingOption {
  /** Ticket pricing option ID. */
  id?: string | null;
  /** Ticket pricing option name. */
  name?: string | null;
  /** Ticket pricing option price. */
  price?: Money;
}

export interface ExtendedTicketDefinition extends TicketDefinition {
  wixFeeForTicket?: number;
  tax?: number;
}

export interface Dashboard {
  /** Whether ticket is hidden and cannot be sold. */
  hidden?: boolean;
  /** Number of tickets sold and reserved. */
  sold?: number;
  /** Whether the ticket has limited quantity. */
  limited?: boolean;
  /** Ticket limit (NULL for unlimited ticket definition). */
  quantity?: number | null;
  /** Number of unsold tickets (NULL for unlimited ticket definition). */
  unsold?: number | null;
  /** Number of tickets sold. */
  ticketsSold?: number;
  /** Number of tickets reserved. */
  ticketsReserved?: number;
}

export interface WixFeeConfig {
  /** Fee calculation method. */
  type?: FeeType;
}

export interface TicketSalePeriod {
  /** Ticket sale start timestamp. */
  startDate?: Date;
  /** Ticket sale end timestamp. */
  endDate?: Date;
  /** Whether to hide this ticket if it's not on sale */
  hideNotOnSale?: boolean;
}

export enum FeeType {
  /** Fee is added to the ticket price at checkout */
  FEE_ADDED = 'FEE_ADDED',
  /** Seller absorbs the fee. It is deducted from the ticket price */
  FEE_INCLUDED = 'FEE_INCLUDED',
  /** Fee is added to the ticket price at checkout */
  FEE_ADDED_AT_CHECKOUT = 'FEE_ADDED_AT_CHECKOUT',
}

export enum TicketSaleStatus {
  /** Ticket sale is scheduled to start */
  SALE_SCHEDULED = 'SALE_SCHEDULED',
  /** Ticket sale has started */
  SALE_STARTED = 'SALE_STARTED',
  /** Ticket sale has ended */
  SALE_ENDED = 'SALE_ENDED',
}

export enum Type {
  STANDARD = 'STANDARD',
  DONATION = 'DONATION',
}
