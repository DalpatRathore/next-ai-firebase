"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type UserInfoProps = {
  name: string;
  picture: string;
  email: string;
  emailVerified: boolean;
};

const useCheckUser = () => {
  const [user, setUser] = useState<UserInfoProps | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUserfromLocalStorage = () => {
      const userInfo = localStorage.getItem("Guser");
      if (userInfo) {
        const parsedUser: UserInfoProps = JSON.parse(userInfo);
        setUser(parsedUser);
      } else {
        setUser(null);
        router.push("/");
      }
    };

    if (typeof localStorage !== "undefined") {
      getUserfromLocalStorage();
    }
  }, [router]);

  const logout = () => {
    localStorage.removeItem("Guser");
    router.refresh();
    window.location.reload();
  };

  return { user, logout };
};

export default useCheckUser;
