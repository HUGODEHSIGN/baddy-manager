import type { App } from '@/server/index';
import { treaty } from '@elysiajs/eden';

const isProduction = import.meta.env.PROD;

const url = isProduction ? 'baddy-manager.fly.dev' : 'localhost:3000';

export const client = treaty<App>(url);
