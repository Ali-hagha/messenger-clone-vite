import PocketBase from "pocketbase";

const url = "https://messenger.alihaghayegh.ir/pb";

export const pocketbase = new PocketBase(url);

export const createPocketbase = () => {
  return new PocketBase(url);
};
