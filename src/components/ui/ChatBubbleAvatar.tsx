import clsx from "clsx";
import { useState } from "react";
import { PbUser } from "../../types/types";
import { Skeleton } from "./skeleton";

interface Props {
  user: PbUser;
}

const ChatBubbleAvatar = ({ user }: Props) => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <div className="relative flex items-center">
      <div
        className={clsx(
          `h-10 w-10 overflow-hidden rounded-full bg-sky-100 transition`,
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
    </div>
  );
};

export default ChatBubbleAvatar;
