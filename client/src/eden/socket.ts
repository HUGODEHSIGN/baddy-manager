import { client } from '@/eden';

export const socket = client.socket.subscribe();
