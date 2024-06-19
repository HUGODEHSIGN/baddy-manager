import type { App } from '@/server/index';
import { treaty } from '@elysiajs/eden';

export const client = treaty<App>('localhost:3000');
