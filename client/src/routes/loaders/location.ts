import { client } from '@/client/eden';
import type { LoaderFunctionArgs, ParamParseKey } from 'react-router-dom';

// --- One Location With Id ---
export const locationIdPath = '/:locationId';
type TypedParams = Record<ParamParseKey<typeof locationIdPath>, string>;
export default async function locationIdLoader({ params }: LoaderFunctionArgs) {
  const locationId = (params as TypedParams).locationId;
  return await client.api.locations({ locationId }).get();
}
