"use client";

import { Select } from "@mantine/core";

export default function ChartChangeButton({
  handleChart,
  chart,
}: {
  handleChart: (which: string) => void;
  chart: string;
}) {
  return (
    <Select
      label="Choose your chart type"
      data={["Bar", "Line", 'Scatter']}
      value={chart}
      onChange={(_value, option) => {
        if (option) {
            handleChart(option.value)
        }
      }}
      className="w-[150px]"
    />
  );
}
