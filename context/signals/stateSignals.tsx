import { signal } from '@preact/signals-react';

export const urlToUse = signal(process.env.NODE_ENV === 'development' && process.env.NEXT_PUBLIC_BASE_URL !== undefined && process.env.NEXT_PUBLIC_BASE_URL !== '' && process.env.NEXT_PUBLIC_BASE_URL !== null ? process.env.NEXT_PUBLIC_BASE_URL
: 
process.env.NODE_ENV === 'production' && process.env. NEXT_PUBLIC_BASE_LIVEURL !== null && process.env.NEXT_PUBLIC_BASE_LIVEURL !== '' && process.env.NEXT_PUBLIC_BASE_LIVEURL !== undefined ? process.env.NEXT_PUBLIC_BASE_LIVEURL 
: '');

export const userID = signal(process.env.NEXT_PUBLIC_ADMIN_USERNAME);

