import { UnsubscribeFunc } from "pocketbase";
import { pocketbase } from "../../lib/pocketbase";
import { PbUser } from "../../types/types";
import UserBox from "./UserBox";
import { useState, useEffect } from "react";

interface Props {
  initialUsers: PbUser[];
}
const UserListItems = ({ initialUsers }: Props) => {
  const [users, setUsers] = useState(initialUsers);

  useEffect(() => {
    let unsubscribe: UnsubscribeFunc = () => {
      return new Promise(() => {});
    };

    const subscribe = async () => {
      unsubscribe = await pocketbase
        .collection("users")
        .subscribe("*", async (action) => {
          if (action.action === "create") {
            const newUser = action.record as PbUser;

            setUsers((oldUsers) => {
              if (!oldUsers) {
                return [newUser];
              }

              if (oldUsers.some((user) => user.email === newUser.email)) {
                return oldUsers;
              }

              return [newUser, ...oldUsers];
            });
          }
        });
    };

    subscribe();

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return users.map((user) => <UserBox key={user.id} user={user} />);
};

export default UserListItems;
