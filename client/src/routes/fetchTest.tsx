import { client } from '@/client/eden';
import { Link, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/fetchTest')({
  loader: async () => await client.api.fetchTest.index.get(),
  component: Page,
});

function Page() {
  const { data } = Route.useLoaderData();
  return (
    <div>
      {data?.map(({ xata_id: locationId, name }) => (
        <Link
          to="/$locationId"
          params={{ locationId }}>
          {name}
        </Link>
      ))}
    </div>
  );
}
