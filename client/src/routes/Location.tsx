import { useParams } from 'react-router-dom';

export default function Location() {
  const { locationId } = useParams();
  return <div>{locationId}</div>;
}
