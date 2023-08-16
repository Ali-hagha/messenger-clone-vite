import PocketBase from "pocketbase";

const url = "https://messenger-clone.iran.liara.run";

export const pocketbase = new PocketBase(url);

export const createPocketbase = () => {
  return new PocketBase(url);
};
