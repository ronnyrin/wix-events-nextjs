'use client';
import { ServiceInfoViewModel } from '@model/service/service.mapper';
import { WixBookingsClientProvider } from '@app/components/Provider/WixBookingsClientProvider';
import { useEffect, useState } from 'react';
import { useAvailability } from '@app/hooks/useAvailability';
import {
  addMonths,
  endOfDay,
  startOfDay,
  startOfMonth,
  isSameDay,
  format,
} from 'date-fns';

// react-day-picker/dist/index.js incorrectly imports
import { DayPicker } from 'react-day-picker/dist/index.esm';

type CalendarDateRange = { from: string; to: string };

const getCalendarMonthRangeForDate = (date: Date): CalendarDateRange => {
  return {
    from: startOfMonth(date).toISOString(),
    to: startOfMonth(addMonths(date, 1)).toISOString(),
  };
};

const TIME_FORMAT = 'hh:mm a';

export function CalendarView({ service }: { service: ServiceInfoViewModel }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [dateRange, setDateRange] = useState<CalendarDateRange>(
    getCalendarMonthRangeForDate(selectedDate!)
  );
  const { data: rangeData } = useAvailability({
    serviceId: service.id!,
    ...dateRange,
    slotsPerDay: 1,
  });
  const { data: dayData } = useAvailability({
    serviceId: service.id!,
    from: startOfDay(selectedDate).toISOString(),
    to: endOfDay(selectedDate).toISOString(),
  });
  useEffect(() => {
    setDateRange(getCalendarMonthRangeForDate(selectedDate!));
  }, [selectedDate]);

  return (
    <div className="flex flex-wrap">
      <div className="m-6 max-w-full flex-grow">
        <div className="border-b pb-4">
          <h2 className="font-bold text-xl">Select a Date and Time</h2>
        </div>
        <div className="flex flex-wrap gap-x-6">
          <section>
            <DayPicker
              modifiers={{
                baseTheme: () => true,
                daysWithSlots: (date) =>
                  !!rangeData?.availabilityEntries?.some(({ slot }) =>
                    isSameDay(date, new Date(slot!.startDate!))
                  ),
              }}
              modifiersClassNames={{
                daysWithSlots:
                  'relative inline-block before:block before:absolute ' +
                  'before:-skew-y-3 before:bg-blue-700 before:dot-md-center',
                today: 'text-blue-700',
                selected: '!bg-blue-700 !rounded-none !text-white',
                baseTheme: '!rounded-none',
              }}
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate as any}
              onMonthChange={setSelectedDate}
              showOutsideDays
              fixedWeeks
              month={startOfMonth(selectedDate)}
            />
          </section>
          <section className="flex-1 w-60 min-w-fit max-w-full">
            <div>{format(selectedDate, 'EEEE, d MMMM')}</div>
            {dayData?.availabilityEntries?.length ? (
              <div className="grid grid-cols-auto-sm gap-2 pt-4">
                {[
                  ...new Set(
                    dayData?.availabilityEntries?.map((slotData) =>
                      format(new Date(slotData.slot!.startDate!), TIME_FORMAT)
                    )
                  ),
                ].map((formattedTime, index) => (
                  <button
                    key={index}
                    aria-label={'Select ' + formattedTime}
                    onClick={() => setSelectedTime(formattedTime)}
                  >
                    <div className="px-4 py-2 w-full border text-center">
                      {formattedTime}
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
      <section className="m-6 w-56">
        <div className="border-b pb-4">
          <h2 className="font-bold text-xl">Booking Summary</h2>
        </div>
        <div>{service.info.name}</div>
        <div>{service.payment.paymentDetails.price}</div>
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
