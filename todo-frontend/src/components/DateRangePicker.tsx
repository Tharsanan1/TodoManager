import React, { useState } from "react";
import { DateRangePicker, Range } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

interface DateRangePickerProps {
  startDate: Date;
  endDate: Date;
  handleDateRangeChange: (startDate: Date, endDate: Date) => void;
}

const DateRangePickerComponent: React.FC<DateRangePickerProps> = (
  props: DateRangePickerProps
) => {
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: props.startDate,
      endDate: props.endDate,
      key: "selection",
    },
  ]);

  const handleChange = (range: Range) => {
    const startDate = range.startDate || props.startDate;
    const endDate = range.endDate || props.endDate;
    props.handleDateRangeChange(startDate, endDate);
  }

  return (
    <div>
      <DateRangePicker
        ranges={dateRange}
        onChange={(item) => {
          setDateRange([item.selection])
          handleChange(item.selection)
        }}
      />
    </div>
  );
};

export default DateRangePickerComponent;
