import React from "react";
import { Button } from "./ui/button";
import { FaPaperPlane } from "react-icons/fa6";
import { BsArrowUpRightSquareFill } from "react-icons/bs";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="w-full relative bg-[url(/hero-bg.jpg)] bg-cover bg-center bg-no-repeat rounded-md">
      <div className="absolute inset-0 bg-gray-900/75 sm:bg-transparent sm:from-gray-900/95 sm:to-gray-900/25 sm:bg-gradient-to-r t-to-l rounded-md"></div>

      <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
        <div className="max-w-3xl text-center sm:text-left">
          <h1 className="text-2xl font-extrabold text-white sm:text-4xl">
            Discover Your Next Adventure
            <strong className="block font-extrabold text-orange-500 mt-3">
              Personalized Itineraries Powered by Ai
            </strong>
          </h1>

          <p className="mt-4 max-w-lg text-white">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt
            illo tenetur fuga ducimus numquam ea!
          </p>

          <div className="mt-8 flex flex-wrap gap-4 text-center">
            <Button variant={"outline"} size={"lg"} asChild>
              <Link href={"/create-trip"}>
                Get Started
                <FaPaperPlane className="ml-2" />
              </Link>
            </Button>
            <Button variant={"default"} size={"lg"} asChild>
              <Link href={"/learn-more"}>
                Learn More
                <BsArrowUpRightSquareFill className="ml-2 w-5 h-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
