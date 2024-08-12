import { CompleteTripData, Itinerary } from "@/types/types";
import React from "react";
import { Badge } from "./ui/badge";

const ItineraryCard = ({ tripInfo }: { tripInfo: CompleteTripData }) => {
  const { itinerary } = tripInfo.tripData;
  console.log(itinerary);

  return (
    <div className="grid grid-col-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
      {itinerary.map((plan, i) => (
        <div className="rounded-lg border p-8 shadow-sm" key={i}>
          <div className="flex-1 space-y-3">
            <h3 className="text-lg font-medium border-b pb-2">{plan.name}</h3>
            <p className="">
              <Badge className="mr-2" variant="outline">
                Details:
              </Badge>
              {plan.details}
            </p>
            <p className="text-base">
              <Badge className="mr-2" variant="outline">
                Best Time to Visit:
              </Badge>
              {plan.bestTimeToVisit}
            </p>
            <p className="text-base ">
              <Badge className="mr-2" variant="outline">
                Travel Time:
              </Badge>
              {plan.travelTime}
            </p>
            <p className="text-base ">
              <Badge className="mr-2" variant="outline">
                Ticket Pricing:
              </Badge>
              {plan.ticketPricing}
            </p>
            <p className="text-base ">
              <Badge className="mr-2" variant="outline">
                Geo-Coordinates:
              </Badge>
              {plan.geoCoordinates.join(", ")}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryCard;
