import {
  ExtendedTicketDefinition,
  FeeType,
  Type,
} from '@model/availability/types';
import { formatCurrency } from '@app/utils/price-formtter';
import { Flowbite, Label, TextInput } from 'flowbite-react';
import { TaxType } from '@model/event/types';
import { Event } from '@model/event/types';
import React from 'react';

export function Price({
  ticket,
  setTickets,
  event,
  selectedTickets,
}: {
  ticket: ExtendedTicketDefinition;
  setTickets: Function;
  event: Event;
  selectedTickets: Record<string, { quantity: number; price: number }>;
}) {
  const onPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number.parseFloat(e.target.value);
    if (
      val &&
      val >= Number.parseFloat(ticket.pricing?.minPrice?.value ?? '0')
    ) {
      setTickets({
        [ticket.id!]: {
          quantity: 1,
          price: Number.parseFloat(e.target.value),
        },
      });
    } else {
      setTickets({
        [ticket.id!]: {
          quantity: 0,
          price: 0,
        },
      });
    }
  };

  const fee =
    ticket.pricing?.pricingType === Type.DONATION
      ? Number((selectedTickets[ticket.id!]?.price * 2.5) / 100 || 0)
      : ticket.wixFeeForTicket;

  const tax =
    ticket.pricing?.pricingType === Type.DONATION
      ? Number(
          (selectedTickets[ticket.id!]?.price *
            Number.parseFloat(
              event.registration?.ticketing?.config?.taxConfig?.rate || '0'
            )) /
            100 || 0
        )
      : ticket.tax;

  return (
    <>
      {ticket.pricing?.pricingType === Type.STANDARD &&
        formatCurrency(ticket.price!.value!, ticket.price!.currency)}
      {ticket.pricing?.pricingType === Type.DONATION && (
        <>
          <Label
            htmlFor={`price-${ticket.id}`}
            className="text-white uppercase"
            value={
              Number.parseFloat(ticket.pricing?.minPrice?.value!) > 0
                ? `Write a price more than ${formatCurrency(
                    ticket.pricing.minPrice?.value!,
                    ticket.price?.currency
                  )}`
                : 'Write a price'
            }
          />
          <Flowbite
            theme={{
              theme: {
                textInput: {
                  field: {
                    input: {
                      base: 'bg-transparent text-white rounded-none',
                    },
                  },
                },
              },
            }}
          >
            <TextInput
              type="number"
              id={`price-${ticket.id}`}
              className="bg-transparent mt-1"
              sizing="sm"
              addon="$"
              min={ticket.pricing?.minPrice?.value ?? 0}
              onChange={onPriceChange}
            />
          </Flowbite>
        </>
      )}
      {event.registration?.ticketing?.config?.taxConfig?.type ===
        TaxType.ADDED_AT_CHECKOUT &&
        !ticket.free &&
        (ticket.pricing?.pricingType === Type.STANDARD ||
          event.registration?.ticketing?.config.taxConfig
            .appliesToDonations) && (
          <>
            <br />
            <span className="text-xs text-black">
              {' '}
              +
              {tax
                ? formatCurrency(tax, ticket.price?.currency)
                : `${event.registration?.ticketing?.config?.taxConfig.rate}%`}{' '}
              {event.registration?.ticketing?.config?.taxConfig?.name}
            </span>
          </>
        )}
      {ticket.wixFeeConfig?.type === FeeType.FEE_ADDED_AT_CHECKOUT &&
        !ticket.free && (
          <>
            <br />
            <span className="text-xs text-black">
              +{fee ? formatCurrency(fee, ticket.price?.currency) + ' ' : ''}
              Service fee
            </span>
          </>
        )}
    </>
  );
}
