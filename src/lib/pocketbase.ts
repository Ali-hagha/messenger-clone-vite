import PocketBase from 'pocketbase';

const globalPocketbase = globalThis as unknown as {
  pocketbase: PocketBase | undefined;
};

const url = import.meta.env.VITE_POCKETBASE_URL;

export const pocketbase = globalPocketbase.pocketbase ?? new PocketBase(url);

if (process.env.NODE_ENV !== 'production')
  globalPocketbase.pocketbase = pocketbase;
