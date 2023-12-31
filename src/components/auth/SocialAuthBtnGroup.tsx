import { Dispatch, SetStateAction } from "react";

import { toast } from "react-hot-toast";
import SocialAuthBtn from "./SocialAuthBtn";
import { BsGithub, BsGoogle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { createPocketbase } from "../../lib/pocketbase";

interface Props {
  loadingState: [boolean, Dispatch<SetStateAction<boolean>>];
}

const SocialAuthBtnGroup = ({ loadingState }: Props) => {
  const [isLoading, setIsLoading] = loadingState;
  const navigate = useNavigate();

  const handleSocialLogin = async (provider: string) => {
    const pocketbase = createPocketbase();

    setIsLoading(true);

    pocketbase
      .collection("users")
      .authWithOAuth2({ provider: provider })
      .then((res) => {
        if (!res.record.name || !res.record.avatarUrl || !res.record.isOnline) {
          const name = res.meta?.name;
          const avatarUrl = res.meta?.avatarUrl;
          return pocketbase
            .collection("users")
            .update(res.record.id, { name, avatarUrl, isOnline: true });
        }
      })
      .then(() => {
        toast.success("Logged in.");
        navigate("users");
      })
      .catch((error) => {
        toast.error("Something went wrong. please try again later.");
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="flex flex-1 flex-col items-center justify-between gap-6 md:flex-row">
      <SocialAuthBtn
        disabled={isLoading}
        icon={BsGoogle}
        title={"Log in with Google"}
        onClick={() => handleSocialLogin("google")}
      />
      <SocialAuthBtn
        disabled={isLoading}
        icon={BsGithub}
        title={"Log in with Github"}
        onClick={() => handleSocialLogin("github")}
      />
    </div>
  );
};

export default SocialAuthBtnGroup;
