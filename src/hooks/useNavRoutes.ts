import { useMemo } from "react";
import { RiChat1Fill, RiLogoutCircleLine, RiTeamFill } from "react-icons/ri";
import { NavigateFunction, useNavigate } from "react-router-dom";
import useChatInfo from "./useChatInfo";
import { pocketbase } from "../lib/pocketbase";
import setUserOnlineStatus from "../actions/setUserOnlineStatus";

const useNavRoutes = () => {
  const navigate = useNavigate();
  const pathname = location.pathname;
  const { chatId } = useChatInfo();

  const routes = useMemo(
    () => [
      {
        href: "/users",
        active: pathname === "/users",
        icon: RiTeamFill,
        title: "users",
      },
      {
        href: "/chats",
        active: pathname === "/chats" || chatId.length > 0,
        icon: RiChat1Fill,
        title: "chats",
      },
      {
        href: "/#",
        icon: RiLogoutCircleLine,
        title: "log out",
        onClick: () => handleLogout(navigate),
      },
    ],
    [chatId.length, navigate, pathname],
  );

  return routes;
};

const handleLogout = async (navigate: NavigateFunction) => {
  await pocketbase.collection("users").unsubscribe();
  await pocketbase.collection("messages").unsubscribe();
  await pocketbase.collection("chats").unsubscribe();

  const currentUser = pocketbase.authStore.model!;

  await setUserOnlineStatus(false, currentUser.id);

  pocketbase.authStore.clear();
  navigate("/");
};

export default useNavRoutes;
