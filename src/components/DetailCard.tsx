"use client";

import { CompleteTripData } from "@/types/types";
import { DirectionAwareHover } from "./ui/direction-aware-hover";
import { RiHotelFill } from "react-icons/ri";
import { FaFileInvoiceDollar } from "react-icons/fa6";
import { MdDescription } from "react-icons/md";
import { IoLocation } from "react-icons/io5";
import { FaStarHalfAlt } from "react-icons/fa";

const DetailCard = ({ tripInfo }: { tripInfo: CompleteTripData }) => {
  // console.log(tripInfo);
  const imageUrl = "/trip-banner.jpg";

  const { hotel_options, itinerary } = tripInfo.tripData;

  console.log(itinerary);
  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-10">
      {hotel_options.map((option, i) => {
        const { name, address, description, price, rating } = option;
        return (
          <div className="w-full relative border rounded-xl p-1" key={i}>
            <DirectionAwareHover imageUrl={imageUrl}>
              <p className="font-bold text-xl capitalize">{name}</p>
              <p className="font-normal text-sm capitalize">{address}</p>
            </DirectionAwareHover>
            <div className="flex flex-col space-y-3 pl-2 my-3">
              <p className="font-bold flex items-center gap-2">
                <RiHotelFill className="w-5 h-5" />
                {name}
              </p>
              <p className="text-base flex items-center gap-2">
                <FaFileInvoiceDollar className="w-5 h-5" />
                {price}
              </p>
              <p className="text-base flex items-center gap-2">
                <FaStarHalfAlt className="w-4 h-4" />
                {rating}
              </p>
              <p className="text-base flex items-center gap-2">
                <IoLocation className="w-5 h-5" />
                {address}
              </p>
              <p className="text-base flex items-center justify-start gap-2">
                <MdDescription className="w-10 h-10 -translate-y-5" />
                {description}
              </p>
            </div>
            <Map address={address}></Map>
          </div>
        );
      })}
    </div>
  );
};

export default DetailCard;

function Map({ address }: any) {
  console.log(address);
  const src = `https://maps.google.com/maps?&q=+${address}&output=embed`;

  return (
    <iframe
      width="100%"
      height="350"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      src={src}
    ></iframe>
  );
}
