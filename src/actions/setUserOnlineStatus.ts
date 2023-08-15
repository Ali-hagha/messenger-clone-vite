import { pocketbase } from "../lib/pocketbase";

const setUserOnlineStatus = async (status: boolean, userId: string) => {
  try {
    await pocketbase.collection("users").update(userId, { isOnline: status });
  } catch (error) {
    console.log(error);
  }
};

export default setUserOnlineStatus;
