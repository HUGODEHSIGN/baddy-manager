import { client } from '@/client/eden';

export const socket = client.socket.subscribe();
