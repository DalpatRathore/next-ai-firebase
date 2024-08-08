import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import {
  FaArrowRightFromBracket,
  FaArrowRightToBracket,
} from "react-icons/fa6";

const Header = () => {
  return (
    <header className="flex items-center justify-between shadow-sm p-5">
      <Link href={"/"}>
        <Image src={"/logo.svg"} width={50} height={50} alt="logo"></Image>
      </Link>
      {!true ? (
        <div>
          <Button size={"lg"} className="hidden md:flex" variant={"outline"}>
            <FaArrowRightFromBracket className="mr-2" />
            Logout
          </Button>
          <Button
            size={"icon"}
            className="flex md:hidden"
            title="logout"
            variant={"outline"}
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
    </header>
  );
};

export default Header;
