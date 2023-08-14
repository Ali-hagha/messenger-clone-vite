import PocketBase from "pocketbase";

const url = import.meta.env.VITE_POCKETBASE_URL;

export const pocketbase = new PocketBase(url);

export const createPocketbase = () => {
  return new PocketBase(url);
};
