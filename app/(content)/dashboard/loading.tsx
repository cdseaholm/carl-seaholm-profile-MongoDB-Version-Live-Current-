// app/dashboard/loading.tsx

import { Loader, Stack, Text } from "@mantine/core";

export default function DashboardLoading() {
  return (
    <div className="flex h-dvh w-full items-center justify-center bg-slate-900/70">
      <Stack align="center">
        <Loader size="lg" />
        <Text c="white" fw={600}>
          Loading dashboard...
        </Text>
      </Stack>
    </div>
  );
}