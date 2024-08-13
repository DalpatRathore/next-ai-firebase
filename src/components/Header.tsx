"use client";
import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  FaArrowRightFromBracket,
  FaArrowRightToBracket,
} from "react-icons/fa6";
import ThemeToggle from "./ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MdViewDay } from "react-icons/md";
import { PlusIcon } from "@radix-ui/react-icons";
import useCheckUser from "@/hooks/useCheckUser";
import useGoogleAuth from "@/hooks/useGoogleAuth";

const Header = () => {
  const { user, logout } = useCheckUser();
  const { login } = useGoogleAuth();

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
              title="Create Trip"
              variant={"outline"}
              asChild
            >
              <Link href={"/create-trip"}>
                <PlusIcon />
              </Link>
            </Button>
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
            <Button
              size={"lg"}
              className="hidden md:flex"
              onClick={() => login()}
            >
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
