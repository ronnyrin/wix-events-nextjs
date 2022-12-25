'use client';
import { Table } from 'flowbite-react';
import { TicketDefinition } from '@model/availability/types';
import { Event } from '@model/event/types';
import { Counter } from '../Counter/Counter';
import { useState } from 'react';
import { createReservation as api } from '@model/reservation/reservation-api';
import { TicketReservationQuantity } from '@model/reservation/types';
import { WixSession } from '../../../src/auth';
import { formatCurrency } from '@app/utils/price-formtter';

export function TicketsTable({
  tickets,
  event,
  wixSession,
}: {
  tickets: TicketDefinition[];
  event: Event;
  wixSession: WixSession;
}) {
  const [selectedTickets, setSelectedTickets] = useState<
    Record<string, number>
  >({});

  const setTickets = (ticket: Record<string, number>) => {
    setSelectedTickets({ ...selectedTickets, ...ticket });
  };

  const createReservation = async () => {
    const ticketQuantities: TicketReservationQuantity[] = Object.keys(
      selectedTickets
    ).map((id) => {
      return {
        ticketDefinitionId: id,
        quantity: selectedTickets[id],
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
    <Table>
      <Table.Head className="bg-transparent text-white">
        <Table.HeadCell>Tickets</Table.HeadCell>
        <Table.HeadCell>Price</Table.HeadCell>
        <Table.HeadCell>Quantity</Table.HeadCell>
        <Table.HeadCell className="text-right">Total</Table.HeadCell>
      </Table.Head>
      <Table.Body>
        {tickets.map((ticket: TicketDefinition) => (
          <Table.Row className="dark:bg-gray-800" key={ticket.id}>
            <Table.Cell className="whitespace-nowrap font-medium text-white">
              {ticket.name}
            </Table.Cell>
            <Table.Cell className="text-white">
              {formatCurrency(ticket.price!.value!, ticket.price!.currency)}
            </Table.Cell>
            <Table.Cell>
              <Counter onChange={setTickets} ticketId={ticket.id!} />
            </Table.Cell>
            <Table.Cell className="text-white text-right">
              {formatCurrency(
                (
                  Number.parseInt(ticket.price!.value!) *
                  (selectedTickets[ticket.id!] || 0)
                ).toString(),
                ticket.price!.currency
              )}
            </Table.Cell>
          </Table.Row>
        ))}
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
            {formatCurrency(
              Object.keys(selectedTickets)
                .reduce(
                  (acc, key) =>
                    acc +
                    selectedTickets[key] *
                      Number.parseInt(
                        tickets.find((t) => t.id === key)!.price!.value!
                      ),
                  0
                )
                .toString(),
              tickets[0]!.price!.currency
            )}
          </Table.Cell>
        </Table.Row>
        <Table.Row className="dark:border-gray-700 dark:bg-gray-800" key="fee">
          <Table.Cell></Table.Cell>
          <Table.Cell></Table.Cell>
          <Table.Cell className="whitespace-nowrap font-medium text-white">
            Service fee
          </Table.Cell>
          <Table.Cell className="text-white text-right">1$</Table.Cell>
        </Table.Row>
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
              Object.keys(selectedTickets)
                .reduce(
                  (acc, key) =>
                    acc +
                    selectedTickets[key] *
                      Number.parseInt(
                        tickets.find((t) => t.id === key)!.price!.value!
                      ),
                  0
                )
                .toString(),
              tickets[0].price!.currency
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
              className="border-2 w-full py-2"
            >
              Checkout
            </button>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}
