import { client } from '@/client/eden';
import { createFileRoute } from '@tanstack/react-router';

async function loader() {
  return await client.api.locations.index.get();
}

export const Route = createFileRoute('/fetchTest')({
  loader,
  component: Page,
});

function Page() {
  const { data } = Route.useLoaderData();
  return <>{data?.map(({ name, id }) => <div key={id}>{name}</div>)}</>;
}
