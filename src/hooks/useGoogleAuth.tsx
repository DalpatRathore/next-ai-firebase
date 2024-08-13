import { useState } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import { toast } from "react-hot-toast";
import axios from "axios";

const useGoogleAuth = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  const getUserInfo = async (tokenInfo: any) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      );
      const userInfo = {
        name: response.data.name,
        email: response.data.email,
        picture: response.data.picture,
        userId: response.data.sub,
        accessToken: tokenInfo.access_token,
      };

      localStorage.setItem("Guser", JSON.stringify(userInfo));
      toast.success("Login successfully!");
      window.location.reload();
    } catch (error) {
      toast.error("Failed to fetch user info.");
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
  };

  const login = useGoogleLogin({
    onSuccess: tokenResponse => {
      getUserInfo(tokenResponse);
    },
    onError: err => {
      console.log(err);
      toast.error("Login failed.");
    },
  });

  const openLoginDialog = () => {
    setOpenDialog(true);
  };

  return { login, openDialog, openLoginDialog, loading };
};

export default useGoogleAuth;
