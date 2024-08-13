import { CompleteTripData } from "@/types/types";
import React from "react";
import { Badge } from "./ui/badge";
import { FaCalendarDay } from "react-icons/fa6";

const ItineraryCard = ({ tripInfo }: { tripInfo: CompleteTripData }) => {
  const { itinerary } = tripInfo.tripData;

  return (
    <div className="space-y-6">
      {itinerary.map((dayPlan, dayIndex) => (
        <div key={dayIndex}>
          <h2 className="text-xl font-semibold mb-4 flex items-center justify-start gap-1">
            🛞 Day {dayPlan.day}
          </h2>
          <div className="grid grid-col-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
            {dayPlan.schedule.map((plan, i) => (
              <div className="rounded-lg border p-8 shadow-sm" key={i}>
                <div className="flex-1 space-y-3">
                  <h3 className="text-lg font-medium border-b pb-2">
                    {plan.name}
                  </h3>
                  <p>
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
                  <p className="text-base">
                    <Badge className="mr-2" variant="outline">
                      Travel Time:
                    </Badge>
                    {plan.travelTime}
                  </p>
                  <p className="text-base">
                    <Badge className="mr-2" variant="outline">
                      Ticket Pricing:
                    </Badge>
                    {plan.ticketPricing}
                  </p>
                  <p className="text-base">
                    <Badge className="mr-2" variant="outline">
                      Geo-Coordinates:
                    </Badge>
                    {Array.isArray(plan.geoCoordinates) &&
                    plan.geoCoordinates.length > 0
                      ? plan.geoCoordinates.join(", ")
                      : "N/A"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItineraryCard;
