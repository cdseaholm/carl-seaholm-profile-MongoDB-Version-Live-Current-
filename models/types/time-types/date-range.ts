import { DateValue } from "@mantine/dates";

export type DateRangeType = {
  type: 'range' | 'day' | 'month' | 'year',
  range: [DateValue | null, DateValue | null]
};