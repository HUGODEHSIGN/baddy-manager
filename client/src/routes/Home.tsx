import { client } from '@/eden';
import { LocationRecord } from '@/server/xata';
import { Button } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [locations, setLocations] = useState<LocationRecord[]>([]);

  useEffect(() => {
    async function fetchLocations() {
      const { data }: { data: LocationRecord[] } =
        await client.api.locations.get();
      setLocations(data);
    }
    fetchLocations();
  }, []);

  return (
    <>
      {/* <ThemePanel /> */}
      {locations.map(({ name, id }) => (
        <Button
          key={id}
          asChild>
          <Link to={`/${id}`}>{name}</Link>
        </Button>
      ))}
    </>
  );
}
