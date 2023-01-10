import {
  TicketDefinition,
  FeeType,
  PricingOption,
  Type,
} from '@model/availability/types';
import { formatCurrency } from '@app/utils/price-formtter';
import { Flowbite, Label, TextInput } from 'flowbite-react';
import { TaxType } from '@model/event/types';
import { Event } from '@model/event/types';
import React from 'react';
import { WIX_SERVICE_FEE } from '@app/constants';

export function Price({
  ticket,
  setTickets,
  event,
  selectedTickets,
  disabled,
  option,
}: {
  ticket: TicketDefinition;
  setTickets: Function;
  event: Event;
  disabled: boolean;
  option?: PricingOption;
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

  const defaultPrice: number = option
    ? Number.parseFloat(option.price!.value!)
    : selectedTickets[ticket.id!]?.price ||
      Number.parseFloat(ticket.price!.value!);

  const tax = Number(
    (defaultPrice *
      Number.parseFloat(
        event.registration?.ticketing?.config?.taxConfig?.rate || '0'
      )) /
      100 || 0
  );

  const defaultPriceWithTax =
    defaultPrice +
    ((event.registration?.ticketing?.config?.taxConfig?.type ===
    TaxType.ADDED_AT_CHECKOUT
      ? tax
      : 0) || 0);

  const fee = Number((defaultPriceWithTax * WIX_SERVICE_FEE) / 100 || 0);

  const getSelectedPricingOptionsRange = (
    pricingOptions: PricingOption[]
  ): { min: { value: number }; max: { value: number } } =>
    pricingOptions.reduce(
      (range, { price }) => {
        const amount = Number(price!.value);
        if (range.min === undefined || Number(range.min.value) > amount) {
          range.min = price!;
        }
        if (range.max === undefined || Number(range.max.value) < amount) {
          range.max = price!;
        }
        return range;
      },
      { min: undefined, max: undefined } as any
    );

  if (ticket.pricing?.pricingOptions?.options?.length && !option) {
    const range = getSelectedPricingOptionsRange(
      ticket.pricing?.pricingOptions.options
    );
    return (
      <>
        {`From ${formatCurrency(
          range.min!.value,
          ticket.pricing?.minPrice?.currency
        )} to ${formatCurrency(
          range.max.value,
          ticket.pricing?.minPrice?.currency
        )}`}
      </>
    );
  }

  const donationText = disabled
    ? 'You set the price'
    : `WRITE A PRICE ${
        Number.parseFloat(ticket.pricing?.minPrice?.value!) > 0
          ? `MORE THAN ${formatCurrency(
              ticket.pricing?.minPrice?.value!,
              ticket.price?.currency
            )}`
          : ''
      }`;

  let price;
  if (option || ticket.pricing?.pricingType === Type.STANDARD) {
    price = <>{formatCurrency(defaultPrice, ticket.price!.currency)}</>;
  } else if (ticket.pricing?.pricingType === Type.DONATION) {
    price = (
      <>
        <Label
          htmlFor={`price-${ticket.id}`}
          className="text-white"
          value={donationText}
        />
        {!disabled && (
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
        )}
      </>
    );
  }

  return (
    <>
      {price}
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
