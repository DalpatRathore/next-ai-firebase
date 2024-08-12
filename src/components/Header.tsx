"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  FaArrowRightFromBracket,
  FaArrowRightToBracket,
} from "react-icons/fa6";
import ThemeToggle from "./ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRouter } from "next/navigation";
import { MdViewDay } from "react-icons/md";

type UserInfoProps = {
  name: string;
  picture: string;
  email: string;
  emailVerified: boolean;
};

const Header = () => {
  const [user, setUser] = useState<UserInfoProps | null>(null);
  const router = useRouter();

  const getUserfromLocalstorage = () => {
    const userInfo = localStorage.getItem("Guser");
    if (userInfo) {
      const parsedUser: UserInfoProps = JSON.parse(userInfo);
      setUser(parsedUser);
    } else {
      setUser(null);
    }
  };

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      getUserfromLocalstorage();
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("Guser");
    router.refresh();
  };
  return (
    <header className="w-full flex items-center justify-between shadow-sm border-b p-5">
      <Link href={"/"}>
        <Image src={"/logo.svg"} width={50} height={50} alt="logo"></Image>
      </Link>
      <div className="flex items-center justify-center gap-5">
        {user ? (
          <div className="flex items-center justify-center gap-5">
            <div className="flex items-center justify-center gap-5">
              <div className="">
                <p className="text-base">
                  Welcome, <span className="font-bold">{user.name}</span>{" "}
                </p>
                <p className="text-sm">{user.email}</p>
              </div>
              <Avatar>
                <AvatarImage src={user.picture} />
                <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
              </Avatar>
            </div>
            <Button
              size={"icon"}
              title="View Trips"
              variant={"outline"}
              asChild
            >
              <Link href={"/view-trips"}>
                <MdViewDay />
              </Link>
            </Button>
            <Button
              size={"icon"}
              title="logout"
              variant={"outline"}
              onClick={logout}
            >
              <FaArrowRightFromBracket />
            </Button>
          </div>
        ) : (
          <div>
            <Button size={"lg"} className="hidden md:flex">
              <FaArrowRightToBracket className="mr-2" />
              Login
            </Button>
            <Button size={"icon"} className="flex md:hidden" title="login">
              <FaArrowRightToBracket />
            </Button>
          </div>
        )}
        <ThemeToggle></ThemeToggle>
      </div>
    </header>
  );
};

export default Header;
