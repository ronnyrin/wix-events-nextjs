'use client'
import {ServiceInfoViewModel} from "@model/service/service.mapper";
import {WixBookingsClientProvider} from "@app/components/Provider/WixBookingsClientProvider";
import {useState} from "react";
import {useAvailability} from "@app/hooks/useAvailability";


type CalendarDateRange = { from: string; to: string; };

const getCalendarDateRangeForDate = (date: Date): CalendarDateRange => {
  const fullYear = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(fullYear, month, 1);
  const lastDay = new Date(fullYear, month + 1, 0);
  return {
    from: firstDay.toISOString(),
    to: lastDay.toISOString(),
  }
}

export function CalendarView({service}: { service: ServiceInfoViewModel }) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [dateRange, setDateRange] = useState<CalendarDateRange>(getCalendarDateRangeForDate(selectedDate));
  const {data, isError} = useAvailability({
    serviceId: service.id!,
    ...dateRange,
  })

  return (
    <div>
      Got Slots. Errors: {isError} from: {dateRange.from} to: {dateRange.to} results: {data?.availabilityEntries?.length}
    </div>
  )
}

export default function Calendar({service, wixSession}: { service: ServiceInfoViewModel, wixSession: string }) {
  return (
    <WixBookingsClientProvider wixSession={wixSession}>
      <CalendarView service={service}/>
    </WixBookingsClientProvider>
  )
}
