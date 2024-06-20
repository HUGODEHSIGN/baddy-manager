import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/fetchTest')({
  component: Page,
});

function Page() {
  return <div>Hello /fetchTest!</div>;
}
