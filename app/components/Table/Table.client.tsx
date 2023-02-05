'use client';
import { Counter } from '../Counter/Counter';
import { useEffect, useState } from 'react';
import { formatCurrency } from '@app/utils/price-formtter';
import { Price } from '@app/components/Price/Price';
import { WIX_SERVICE_FEE } from '@app/constants';
import {
  ticketDefinitions as api,
  events as eventsApi,
  checkout as checkoutApi,
} from '@wix/events';
import { useWixClient } from '@app/hooks/useWixClient';
import { Badge } from 'flowbite-react';
import { formatDate, formatDateWithTime } from '@app/utils/date-formatter';

export function TicketsTable({
  tickets,
  event,
}: {
  tickets: api.TicketDefinition[];
  event: eventsApi.Event;
}) {
  const wixClient = useWixClient();
  const [selectedTickets, setSelectedTickets] = useState<
    Record<string, { quantity: number; price: number }>
  >({});
  const [serviceFee, setServiceFee] = useState(0);
  const [tax, setTax] = useState(0);
  const [subTotals, setSubTotals] = useState(0);
  const [expendPricingOptions, setExpendPricingOptions] = useState(
    {} as Record<string, boolean>
  );
  const [expendTicketDescription, setExpendTicketDescription] = useState(
    {} as Record<string, boolean>
  );

  const setExpendPricingOptionsForTicket = (ticketId: string) => {
    setExpendPricingOptions({
      ...expendPricingOptions,
      [ticketId]: !expendPricingOptions[ticketId],
    });
  };

  const setExpendTicketDescriptionForTicket = (ticketId: string) => {
    setExpendTicketDescription({
      ...expendTicketDescription,
      [ticketId]: !expendTicketDescription[ticketId],
    });
  };

  const setTickets = (
    ticket: Record<string, { quantity: number; price: number }>
  ) => {
    const [ticketId, { quantity }] = Object.entries(ticket)[0];
    if (quantity === 0) {
      delete selectedTickets[ticketId];
      setSelectedTickets({ ...selectedTickets });
      return;
    }
    setSelectedTickets({ ...selectedTickets, ...ticket });
  };

  const findTicketAndMaybeOption = (key: string) => {
    const [ticketId, optionId] = key.split('|');
    const ticket = tickets.find((t) => t._id === ticketId);
    if (!optionId) {
      return { ticket };
    }
    const option = ticket!.pricing!.pricingOptions!.options!.find(
      (o) => o._id === optionId
    );
    return { ticket, option };
  };

  useEffect(() => {
    setServiceFee(
      Object.keys(selectedTickets).reduce((acc, key) => {
        const { ticket, option } = findTicketAndMaybeOption(key);
        const tax =
          (Number.parseFloat(option?.price?.value || ticket?.price?.value!) *
            Number.parseFloat(
              event.registration?.ticketing?.config?.taxConfig?.rate || '0'
            )) /
          100;
        const price = selectedTickets[key].price + tax;
        const priceWithTax =
          ticket!.wixFeeConfig!.type === api.FeeType.FEE_ADDED_AT_CHECKOUT
            ? Number(price * WIX_SERVICE_FEE) / 100
            : 0;
        return acc + selectedTickets[key].quantity * priceWithTax;
      }, 0)
    );

    setSubTotals(
      Object.keys(selectedTickets).reduce(
        (acc, key) =>
          acc + selectedTickets[key].quantity * selectedTickets[key].price,
        0
      )
    );

    if (
      event.registration?.ticketing?.config?.taxConfig?.type ===
      eventsApi.TaxType.ADDED_AT_CHECKOUT
    ) {
      setTax(
        Object.keys(selectedTickets).reduce(
          (acc, key) =>
            acc +
            (selectedTickets[key].quantity *
              selectedTickets[key].price *
              Number.parseFloat(
                event.registration?.ticketing?.config?.taxConfig?.rate!
              )) /
              100,
          0
        )
      );
    }
  }, [selectedTickets]);

  const createReservation = async () => {
    const ticketsGrouped = Object.keys(selectedTickets).reduce(
      (acc: Record<string, any>, key: string) => {
        const [ticketId, optionId] = key.split('|');
        if (!optionId) {
          acc[ticketId] = selectedTickets[ticketId];
        } else {
          acc[ticketId] = {
            ...acc[ticketId],
            quantity:
              (acc[ticketId]?.quantity ?? 0) + selectedTickets[key].quantity,
            ticketDetails: [
              ...(acc[ticketId]?.ticketDetails ?? []),
              {
                pricingOptionId: optionId,
                capacity: selectedTickets[key].quantity,
              },
            ],
          };
        }
        return acc;
      },
      {}
    );

    const ticketQuantities: checkoutApi.TicketReservationQuantity[] =
      Object.keys(ticketsGrouped).map((key) => {
        const [ticketId] = key.split('|');
        return {
          ticketDefinitionId: ticketId,
          quantity: ticketsGrouped[ticketId].quantity,
          ...(ticketsGrouped[ticketId].ticketDetails && {
            ticketDetails: ticketsGrouped[ticketId].ticketDetails,
          }),
          ...(ticketsGrouped[ticketId].price && {
            priceOverride: ticketsGrouped[ticketId].price.toString(),
          }),
        };
      });
    const { _id: id } = await wixClient.checkout.createReservation(event._id!, {
      ticketQuantities,
    });

    if (id) {
      window.location.replace(
        `https://ronnyr34.editorx.io/events-headless/event-details/${event.slug}/ticket-form?reservationId=${id}`
      );
    }
  };

  return (
    <>
      <div className="flex full-w flex-col">
        {tickets.map((ticket: api.TicketDefinition) => (
          <>
            <div
              className="dark:bg-gray-800 flex mt-6 border p-6"
              key={ticket._id}
            >
              <div className="basis-1/2 border-r-2">
                <span className="block text-[12px] mb-1">Ticket type</span>
                {ticket.name}
                {ticket.salePeriod &&
                  new Date(ticket.salePeriod.endDate!) > new Date() &&
                  new Date(ticket.salePeriod.startDate!) < new Date() && (
                    <div className="mt-2 text-xs">
                      <p>Sale ends</p>
                      <p>
                        {formatDateWithTime(
                          new Date(ticket.salePeriod.endDate!),
                          event.scheduling?.config?.timeZoneId!
                        )}
                      </p>
                    </div>
                  )}
                {expendTicketDescription[ticket._id!] && (
                  <p className="text-xs">{ticket.description}</p>
                )}
                {ticket.description && (
                  <div className="whitespace-nowrap mt-2">
                    <div className="flex justify-between">
                      <button
                        className="text-xs text-purple-400 underline"
                        onClick={() =>
                          setExpendTicketDescriptionForTicket(ticket._id!)
                        }
                      >
                        {expendTicketDescription[ticket._id!] ? 'Less' : 'More'}{' '}
                        info
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <div
                className={`basis-1/2 pl-4 ${
                  ticket.pricing?.pricingOptions?.options?.length ? '' : 'flex'
                }`}
              >
                <div className="basis-1/2">
                  <Price
                    selectedTickets={selectedTickets}
                    ticket={ticket}
                    setTickets={setTickets}
                    event={event}
                    disabled={
                      event.registration?.status !==
                      eventsApi.RegistrationStatus.OPEN_TICKETS
                    }
                  />
                </div>
                {!ticket.pricing?.pricingOptions?.options?.length && (
                  <div className="ml-auto">
                    {ticket.limitPerCheckout! > 0 &&
                      (!ticket.salePeriod ||
                        (new Date(ticket.salePeriod.endDate!) > new Date() &&
                          new Date(ticket.salePeriod.startDate!) <
                            new Date())) && (
                        <>
                          <span className="block text-[12px] mb-1">
                            Quantity
                          </span>

                          <Counter
                            onChange={setTickets}
                            ticketId={ticket._id!}
                            limit={ticket.limitPerCheckout!}
                            initialCount={
                              selectedTickets[ticket._id!]?.quantity ?? 0
                            }
                            price={
                              selectedTickets[ticket._id!]?.price ||
                              Number.parseFloat(ticket.price?.value!)
                            }
                          />
                        </>
                      )}
                    {ticket.limitPerCheckout! === 0 && (
                      <Badge color="gray">Sold Out</Badge>
                    )}
                    {ticket.salePeriod &&
                      new Date(ticket.salePeriod.startDate!) > new Date() && (
                        <div className="mt-2 text-sm">
                          <p>Goes on sale</p>
                          <p>
                            {formatDateWithTime(
                              new Date(ticket.salePeriod.startDate!),
                              event.scheduling?.config?.timeZoneId!
                            )}
                          </p>
                        </div>
                      )}
                    {ticket.salePeriod &&
                      new Date(ticket.salePeriod.endDate!) < new Date() && (
                        <Badge color="gray">Sale ended</Badge>
                      )}
                  </div>
                )}
                {ticket.pricing?.pricingOptions?.options
                  ?.slice(
                    0,
                    expendPricingOptions[ticket._id!]
                      ? ticket.pricing?.pricingOptions?.options?.length
                      : 3
                  )
                  .map((option) => (
                    <div
                      className="dark:bg-gray-800 flex mt-4 border-t-2 pt-4"
                      key={option._id}
                    >
                      <div className="basis-1/2">
                        <span className="whitespace-nowrap block text-12">
                          {option.name}
                        </span>
                        <span className="block">
                          <Price
                            selectedTickets={selectedTickets}
                            ticket={ticket}
                            setTickets={setTickets}
                            event={event}
                            option={option}
                            disabled={
                              event.registration?.status !==
                              eventsApi.RegistrationStatus.OPEN_TICKETS
                            }
                          />
                        </span>
                      </div>
                      <div className="ml-auto">
                        {ticket.limitPerCheckout! > 0 ? (
                          <>
                            <span className="block text-[12px] mb-1">
                              Quantity
                            </span>
                            <Counter
                              onChange={setTickets}
                              ticketId={ticket._id!}
                              optionId={option._id!}
                              limit={ticket.limitPerCheckout!}
                              initialCount={
                                selectedTickets[`${ticket._id!}|${option._id}`]
                                  ?.quantity ?? 0
                              }
                              price={
                                selectedTickets[`${ticket._id!}|${option._id}`]
                                  ?.price ||
                                Number.parseFloat(option.price?.value!)
                              }
                            />
                          </>
                        ) : (
                          <Badge color="gray">Sold Out</Badge>
                        )}
                      </div>
                    </div>
                  ))}
                {ticket.pricing?.pricingOptions?.options!.length! > 3 && (
                  <div className="whitespace-nowrap mt-6">
                    <div className="flex justify-between">
                      <button
                        className="text-sm text-purple-400 underline"
                        onClick={() =>
                          setExpendPricingOptionsForTicket(ticket._id!)
                        }
                      >
                        View{' '}
                        {expendPricingOptions[ticket._id!] ? 'less' : 'more'}{' '}
                        price options
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        ))}
      </div>
      <div className="w-[35%] ml-auto mt-10">
        {Object.keys(selectedTickets).length && subTotals ? (
          <div
            className="dark:border-gray-700 dark:bg-gray-800 flex"
            key="subtotal"
          >
            <span className="whitespace-nowrap font-medium ">Subtotal</span>
            <span className="whitespace-nowrap font-medium text-right ml-auto">
              {formatCurrency(subTotals, tickets[0]!.price!.currency)}
            </span>
          </div>
        ) : null}
        {tax ? (
          <div
            className="dark:border-gray-700 dark:bg-gray-800 flex mt-2"
            key="tax"
          >
            <div className="whitespace-nowrap font-medium ">
              {event.registration?.ticketing?.config?.taxConfig?.name}
            </div>
            <div className="text-right ml-auto">
              {formatCurrency(tax, tickets[0]!.price!.currency)}
            </div>
          </div>
        ) : null}
        {serviceFee ? (
          <div
            className="dark:border-gray-700 dark:bg-gray-800 flex mt-2"
            key="fee"
          >
            <span className="whitespace-nowrap font-medium">Service fee</span>
            <span className="text-right ml-auto">
              {formatCurrency(
                serviceFee.toString(),
                tickets[0]!.price!.currency
              )}
            </span>
          </div>
        ) : null}
        <div
          className="dark:border-gray-700 dark:bg-gray-800 border-t flex mt-2 pt-2"
          key="total"
        >
          <span className="whitespace-nowrap font-medium">Total</span>
          <span className="whitespace-nowrap font-medium text-right ml-auto">
            {formatCurrency(
              tax +
                serviceFee +
                Object.keys(selectedTickets).reduce(
                  (acc, key) =>
                    acc +
                    selectedTickets[key].quantity * selectedTickets[key].price,
                  0
                ),
              event.registration?.ticketing?.currency!
            )}
          </span>
        </div>
        <div
          className="dark:border-gray-700 dark:bg-gray-800 mt-6"
          key="checkout"
        >
          <div className="whitespace-nowrap font-medium">
            <button
              onClick={createReservation}
              disabled={Object.keys(selectedTickets).length === 0}
              className="btn-main w-full disabled:text-gray-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 hover:border-white"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
