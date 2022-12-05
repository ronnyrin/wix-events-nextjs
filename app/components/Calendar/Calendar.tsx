'use client';
import { ServiceInfoViewModel } from '@model/service/service.mapper';
import { WixBookingsClientProvider } from '@app/components/Provider/WixBookingsClientProvider';
import { useCallback, useEffect, useState } from 'react';
import { useAvailability } from '@app/hooks/useAvailability';
import {
  addMonths,
  endOfDay,
  startOfDay,
  startOfMonth,
  isSameDay,
  format,
  formatISO,
} from 'date-fns';

// react-day-picker/dist/index.js incorrectly uses "require"
import { DayPicker } from 'react-day-picker/dist/index.esm';
import { useServiceFormattedPrice } from '@app/hooks/useServiceFormattedPrice';
import {
  useFormattedTimezone,
  useUserTimezone,
} from '@app/hooks/useFormattedTimezone';
import { SlotAvailability } from '@model/availability/types';
import { Spinner } from 'flowbite-react';
import JSURL from 'jsurl';

type CalendarDateRange = { from: string; to: string };

const getCalendarMonthRangeForDate = (date: Date): CalendarDateRange => {
  return {
    from: formatISO(startOfMonth(date)),
    to: formatISO(startOfMonth(addMonths(date, 1))),
  };
};

const TIME_FORMAT = 'hh:mm a';

export function CalendarView({ service }: { service: ServiceInfoViewModel }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<
    SlotAvailability | undefined
  >();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [dateRange, setDateRange] = useState<CalendarDateRange>(
    getCalendarMonthRangeForDate(selectedDate!)
  );
  const formattedPrice = useServiceFormattedPrice(
    service!.payment!.paymentDetails
  );
  const { data: rangeData } = useAvailability({
    serviceId: service.id!,
    ...dateRange,
    slotsPerDay: 1,
  });
  const { data: dayData, isLoading: isDayDataLoading } = useAvailability({
    serviceId: service.id!,
    from: formatISO(startOfDay(selectedDate)),
    to: formatISO(endOfDay(selectedDate)),
  });
  const timezone = useUserTimezone();
  const timezoneStr = useFormattedTimezone(timezone);
  useEffect(() => {
    // re-fetching existing range is cached
    setDateRange(getCalendarMonthRangeForDate(selectedDate!));
    setSelectedTime('');
  }, [selectedDate]);
  useEffect(() => {
    setSelectedSlot(
      dayData?.availabilityEntries?.find(
        (availableEntry) =>
          format(new Date(availableEntry.slot!.startDate!), TIME_FORMAT) ===
          selectedTime
      )
    );
  }, [selectedTime, dayData]);
  const goToCheckout = useCallback(() => {
    const checkoutUrl = new URL(process.env.NEXT_PUBLIC_BOOKINGS_CHECKOUT_URL!);
    const slotData = JSURL.stringify({
      serviceId: service.id,
      slot: { slot: selectedSlot?.slot },
      timezone,
    });
    checkoutUrl.searchParams.set('selectedSlot', slotData);

    // TODO: USE PR VERSION TILL BOOKINGS EXPOSE A FORMAL API FOR DEEP LINK
    checkoutUrl.searchParams.set(
      'bookings-form-widget-override',
      '8f195c0a4352e33353b8a8e7dbe2e2d17025ddc023572140c14eba1f'
    );

    window.location.href = checkoutUrl.toString();
  }, [selectedSlot?.slot, service?.id, timezone]);

  return (
    <div className="flex flex-wrap">
      <div className="m-6 max-w-full flex-grow">
        <div className="border-b pb-2 flex flex-wrap gap-4 items-baseline justify-between">
          <h2 className="text-lg">Select a Date and Time</h2>
          <span className="text-gray-500 text-xs">Timezone: {timezoneStr}</span>
        </div>
        <div className="flex flex-wrap gap-x-6">
          <section className="mt-2">
            <DayPicker
              modifiers={{
                daysWithSlots: (date) =>
                  !!rangeData?.availabilityEntries?.some(({ slot }) =>
                    isSameDay(date, new Date(slot!.startDate!))
                  ),
              }}
              modifiersClassNames={{
                daysWithSlots:
                  'relative inline-block before:block before:absolute ' +
                  'before:-skew-y-3 before:bg-gray-700 before:dot-md-center',
              }}
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              onMonthChange={setSelectedDate}
              showOutsideDays
              fixedWeeks
              month={startOfMonth(selectedDate)}
            />
          </section>
          <section className="flex-1 w-60 min-w-fit max-w-full">
            <div className="mt-4">{format(selectedDate, 'EEEE, d MMMM')}</div>
            {isDayDataLoading ? (
              <div className="w-full h-36 flex items-center justify-center">
                <Spinner color="gray" />
              </div>
            ) : dayData?.availabilityEntries?.length ? (
              <div className="grid grid-cols-auto-sm gap-2 pt-4">
                {[
                  ...new Set(
                    dayData?.availabilityEntries
                      ?.sort(
                        (dayDataA, dayDataB) =>
                          new Date(dayDataA.slot?.startDate ?? 0).getTime() -
                          new Date(dayDataB.slot?.startDate ?? 0).getTime()
                      )
                      .map((slotData) =>
                        format(new Date(slotData.slot!.startDate!), TIME_FORMAT)
                      )
                  ),
                ].map((formattedTime, index) => (
                  <button
                    key={index}
                    aria-label={'Select ' + formattedTime}
                    onClick={() => setSelectedTime(formattedTime)}
                  >
                    <div
                      className={`px-3 py-1.5 w-full border-2 text-center ${
                        formattedTime === selectedTime
                          ? 'border-gray-700 bg-gray-100'
                          : 'hover:border-gray-600'
                      }`}
                    >
                      <span className="text-sm">{formattedTime}</span>
                    </div>
                  </button>
                ))}
              </div>
            ) : (
              <div className="pt-4">No availability</div>
            )}
          </section>
        </div>
      </div>
      <section className="m-6 w-56 flex-grow">
        <div className="border-b pb-2">
          <h2 className="text-lg">Booking Summary</h2>
        </div>
        <section className="mt-4">
          <div>{service.info.name}</div>
          <div>
            {format(selectedDate, 'd MMMM yyyy')}
            {selectedTime ? ' at ' + selectedTime : ''}
          </div>
          <section className="text-xs mt-1">
            <div>{formattedPrice.userFormattedPrice}</div>
            {selectedSlot && (
              <>
                <div>{selectedSlot.slot?.resource?.name}</div>
              </>
            )}
          </section>
          <div className="mt-7">
            <button
              disabled={!selectedSlot}
              className="btn-main w-full"
              onClick={goToCheckout}
            >
              Next
            </button>
          </div>
        </section>
      </section>
    </div>
  );
}

export default function Calendar({
  service,
  wixSession,
}: {
  service: ServiceInfoViewModel;
  wixSession: string;
}) {
  return (
    <WixBookingsClientProvider wixSession={wixSession}>
      <CalendarView service={service} />
    </WixBookingsClientProvider>
  );
}
