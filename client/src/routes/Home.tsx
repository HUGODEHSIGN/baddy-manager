import { client } from '@/client/eden';
import type { LocationRecord } from '@/server/xata';

import { Button } from '@radix-ui/themes';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  const [locations, setLocations] = useState<LocationRecord[]>([]);

  useEffect(() => {
    async function fetchLocations() {
      const { data } = await client.api.locations.index.get();
      setLocations(data);
      console.log(data);
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
