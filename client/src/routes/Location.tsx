import locationIdLoader from '@/client/routes/loaders/location';
import { useLoaderData } from 'react-router-dom';

export default function Location() {
  const data = useLoaderData<typeof locationIdLoader>();
  console.log(data);
  return <div>test</div>;
}
