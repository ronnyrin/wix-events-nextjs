'use client';
import { Table } from 'flowbite-react';
import {
  ExtendedTicketDefinition,
  FeeType,
  Type,
} from '@model/availability/types';
import { Event, TaxType } from '@model/event/types';
import { Counter } from '../Counter/Counter';
import { useEffect, useState } from 'react';
import { createReservation as api } from '@model/reservation/reservation-api';
import { TicketReservationQuantity } from '@model/reservation/types';
import { WixSession } from '../../../src/auth';
import { formatCurrency } from '@app/utils/price-formtter';
import { Price } from '@app/components/Price';

export function TicketsTable({
  tickets,
  event,
  wixSession,
}: {
  tickets: ExtendedTicketDefinition[];
  event: Event;
  wixSession: WixSession;
}) {
  const [selectedTickets, setSelectedTickets] = useState<
    Record<string, { quantity: number; price: number }>
  >({});
  const [serviceFee, setServiceFee] = useState(0);
  const [tax, setTax] = useState(0);
  const [subTotals, setSubTotals] = useState(0);

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

  useEffect(() => {
    setServiceFee(
      Object.keys(selectedTickets).reduce(
        (acc, key) =>
          acc +
          selectedTickets[key].quantity *
            (tickets.find((t) => t.id === key)!.wixFeeConfig!.type ===
            FeeType.FEE_ADDED_AT_CHECKOUT
              ? tickets.find((t) => t.id === key)!.pricing?.pricingType ===
                Type.DONATION
                ? (selectedTickets[key].price * 2.5) / 100
                : tickets.find((t) => t.id === key)!.wixFeeForTicket!
              : 0),
        0
      )
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
      TaxType.ADDED_AT_CHECKOUT
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
    const ticketQuantities: TicketReservationQuantity[] = Object.keys(
      selectedTickets
    ).map((id) => {
      return {
        ticketDefinitionId: id,
        quantity: selectedTickets[id].quantity,
        priceOverride: selectedTickets[id].price.toString(),
      };
    });
    const id = await api({
      input: { ticketQuantities },
      wixSession,
      eventId: event.id!,
    });
    if (id) {
      window.location.replace(
        `https://ronnyr34.wixsite.com/my-site-178/events/${event.slug}/ticket-form?reservationId=${id}`
      );
    }
  };

  return (
    <Table className="mt-10">
      <Table.Head className="bg-transparent text-white">
        <Table.HeadCell className="text-3xl">Tickets</Table.HeadCell>
        <Table.HeadCell>Price</Table.HeadCell>
        <Table.HeadCell>Quantity</Table.HeadCell>
        <Table.HeadCell className="text-right">Total</Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {tickets.map((ticket: ExtendedTicketDefinition) => (
          <Table.Row className="dark:bg-gray-800" key={ticket.id}>
            <Table.Cell className="whitespace-nowrap text-white">
              {ticket.name}
            </Table.Cell>
            <Table.Cell className="text-white">
              <Price
                selectedTickets={selectedTickets}
                ticket={ticket}
                setTickets={setTickets}
                event={event}
              />
            </Table.Cell>
            <Table.Cell>
              {!ticket.pricing?.pricingOptions?.options?.length && (
                <Counter
                  onChange={setTickets}
                  ticketId={ticket.id!}
                  initialCount={selectedTickets[ticket.id!]?.quantity ?? 0}
                  price={
                    selectedTickets[ticket.id!]?.price ||
                    Number.parseFloat(ticket.price?.value!)
                  }
                />
              )}
            </Table.Cell>
            <Table.Cell className="text-white text-right">
              {!ticket.pricing?.pricingOptions?.options?.length &&
                formatCurrency(
                  (
                    (selectedTickets[ticket.id!]?.price ?? 0) *
                    (selectedTickets[ticket.id!]?.quantity ?? 0)
                  ).toString(),
                  ticket.price!.currency
                )}
            </Table.Cell>
          </Table.Row>
        ))}
        {Object.keys(selectedTickets).length && subTotals ? (
          <Table.Row
            className="dark:border-gray-700 dark:bg-gray-800"
            key="subtotal"
          >
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-white">
              Subtotal
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-white text-right">
              {formatCurrency(subTotals, tickets[0]!.price!.currency)}
            </Table.Cell>
          </Table.Row>
        ) : null}
        {tax ? (
          <Table.Row
            className="dark:border-gray-700 dark:bg-gray-800"
            key="tax"
          >
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-white">
              {event.registration?.ticketing?.config?.taxConfig?.name}
            </Table.Cell>
            <Table.Cell className="text-white text-right">
              {formatCurrency(tax, tickets[0]!.price!.currency)}
            </Table.Cell>
          </Table.Row>
        ) : null}
        {serviceFee ? (
          <Table.Row
            className="dark:border-gray-700 dark:bg-gray-800"
            key="fee"
          >
            <Table.Cell></Table.Cell>
            <Table.Cell></Table.Cell>
            <Table.Cell className="whitespace-nowrap font-medium text-white">
              Service fee
            </Table.Cell>
            <Table.Cell className="text-white text-right">
              {formatCurrency(
                serviceFee.toString(),
                tickets[0]!.price!.currency
              )}
            </Table.Cell>
          </Table.Row>
        ) : null}
        <Table.Row
          className="dark:border-gray-700 dark:bg-gray-800 border-t"
          key="total"
        >
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell className="whitespace-nowrap font-medium text-white">
            Total
          </Table.Cell>
          <Table.Cell className="whitespace-nowrap font-medium text-white text-right">
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
          </Table.Cell>
        </Table.Row>
        <Table.Row
          className="dark:border-gray-700 dark:bg-gray-800"
          key="checkout"
        >
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell
            className="whitespace-nowrap font-medium text-white"
            colSpan={2}
          >
            <button
              onClick={createReservation}
              disabled={Object.keys(selectedTickets).length === 0}
              className="border-2 w-full py-2 disabled:text-gray-500 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:hover:text-gray-500 border-white hover:text-black hover:border-white"
            >
              Checkout
            </button>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
