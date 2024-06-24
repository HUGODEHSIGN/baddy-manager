import CourtCardGrid from '@/client/components/CourtCardGrid';
import { client } from '@/client/eden';
import AppProvider from '@/client/providers/AppProvider';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/$locationId')({
  loader: async ({ params: { locationId } }) =>
    await client.api.context({ locationId }).get(),
  component: Page,
});

export type AppDataType = NonNullable<typeof Route.types.loaderData.data>;

function Page() {
  const { data } = Route.useLoaderData();

  if (!data) {
    return;
  }

  return (
    <>
      <AppProvider initialState={data}>
        <h1>heyo</h1>
        <CourtCardGrid />
      </AppProvider>
    </>
  );
}
