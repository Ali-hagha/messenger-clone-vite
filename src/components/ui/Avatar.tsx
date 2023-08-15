import clsx from "clsx";
import { useState, useEffect } from "react";
import { PbUser } from "../../types/types";
import { Skeleton } from "./skeleton";
import { pocketbase } from "../../lib/pocketbase";
import { UnsubscribeFunc } from "pocketbase";

interface Props {
  user: PbUser;
  onClick?: () => void;
}

const Avatar = ({ onClick, user }: Props) => {
  const [isActive, setIsActive] = useState(user.isOnline);
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    let unsubscribe: UnsubscribeFunc = () => {
      return new Promise(() => {});
    };

    const subscribe = async () => {
      unsubscribe = await pocketbase
        .collection("users")
        .subscribe("*", async (action) => {
          if (action.action === "update") {
            const updatedUser = action.record as PbUser;
            if (updatedUser.id === user.id) {
              setIsActive(updatedUser.isOnline);
            }
          }
        });
    };

    subscribe();

    return () => {
      unsubscribe();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative flex items-center">
      <div
        className={clsx(
          `h-10 w-10 overflow-hidden rounded-full bg-sky-100 transition`,
          onClick
            ? "cursor-pointer ring-2 ring-gray-200 ring-offset-2 hover:ring-4 hover:ring-gray-300 active:ring-gray-400 active:ring-offset-4"
            : "cursor-default",
        )}
      >
        <img
          className={clsx(`h-10 w-10`, isImageLoading ? "hidden" : null)}
          src={
            user?.avatarUrl ||
            `https://api.dicebear.com/6.x/pixel-art/svg?seed=${user.email}`
          }
          alt="avatar"
          height={40}
          width={40}
          onLoad={() => setIsImageLoading(false)}
        />
        {isImageLoading && <Skeleton className="h-10 w-10 bg-gray-100" />}
      </div>

      {isActive && (
        <div
          className={clsx(
            `absolute bottom-0.5 right-0.5 h-2 w-2 rounded-full bg-green-400 ring-1 ring-white ring-offset-1`,
          )}
        ></div>
      )}
    </div>
  );
};

export default Avatar;
