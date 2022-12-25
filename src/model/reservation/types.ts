export interface CreateReservationRequest {
  /** Tickets to reserve. */
  ticketQuantities?: TicketReservationQuantity[];
  /** Whether to ignore the available ticket limits upon reservation. */
  ignoreLimits?: boolean;
}

export interface TicketReservationQuantity {
  /** Ticket definition ID. */
  ticketDefinitionId?: string;
  /** Quantity of tickets to reserve. */
  quantity?: number;
  /** Ticket price to charge - overriding the ticket price. */
  priceOverride?: string | null;
  /**
   * Optional ticket details
   * @internal
   */
  ticketDetails?: TicketDetails[];
}

export interface TicketDetails {
  /** Unique seat id in the event venue. */
  seatId?: string | null;
  /**
   * Optional sector name.
   * @internal
   * @readonly
   */
  sectorName?: string | null;
  /**
   * Area name.
   * @internal
   * @readonly
   */
  areaName?: string | null;
  /**
   * Table name.
   * @internal
   * @readonly
   */
  tableName?: string | null;
  /**
   * Row label.
   * @internal
   * @readonly
   */
  rowNumber?: string | null;
  /**
   * Seat label in a row or table.
   * @internal
   * @readonly
   */
  seatNumber?: string | null;
  /**
   * Optional sector label.
   * @readonly
   */
  sectionLabel?: string | null;
  /**
   * Area label.
   * @readonly
   */
  areaLabel?: string | null;
  /**
   * Table label.
   * @readonly
   */
  tableLabel?: string | null;
  /**
   * Row label.
   * @readonly
   */
  rowLabel?: string | null;
  /**
   * Seat label in a row or table.
   * @readonly
   */
  seatLabel?: string | null;
  /** Number of places in the spot. If not provided - defaults to 1. */
  capacity?: number | null;
  /** Custom pricing of ticket. */
  priceOverride?: string | null;
  /** Pricing option id. */
  pricingOptionId?: string | null;
  /**
   * Pricing option name.
   * @internal
   * @readonly
   */
  pricingOptionName?: string | null;
}
