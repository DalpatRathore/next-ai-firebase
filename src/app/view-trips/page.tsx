import React from "react";
import { db } from "@/service/firebase-config";
import { collection, getDocs } from "firebase/firestore";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { CompleteTripData } from "@/types/types";
import {
  FaCalendarDays,
  FaEnvelope,
  FaHotel,
  FaMoneyCheckDollar,
  FaPersonHiking,
  FaPersonWalkingLuggage,
} from "react-icons/fa6";
import { GiCommercialAirplane } from "react-icons/gi";
import { Separator } from "@/components/ui/separator";

const ViewTripsPage = async () => {
  const collectionRef = collection(db, "tripsAi");

  const tripsCollectionSnapshot = await getDocs(collectionRef);
  const tripsList: CompleteTripData[] = tripsCollectionSnapshot.docs.map(
    doc => {
      const data = doc.data() as CompleteTripData;
      return {
        ...data,
        id: doc.id,
      };
    }
  );
  // console.log(tripsList);
  return (
    <main className="min-h-screen px-5 py-10 space-y-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {tripsList.map((trip, i) => {
          const { budgetType, destination, travelWith, tripDays } =
            trip.userSelection;
          const { userEmail } = trip;
          const { hotel_options } = trip.tripData;
          const { itinerary } = trip.tripData;
          return (
            <Card className="w-full max-w-lg" key={i}>
              <CardHeader>
                <CardTitle className="flex items-center justify-end gap-1 italic">
                  <FaEnvelope />
                  {userEmail}
                </CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className=" flex items-center justify-between space-x-4 rounded-md border p-4 border-l-4 border-l-indigo-500">
                  <p className="text-xl font-medium leading-none">
                    {destination}
                  </p>
                  <GiCommercialAirplane />
                </div>
                <div className="space-y-5 mt-5">
                  <div className="flex items-start justify-start gap-2">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <FaCalendarDays />
                    <p className="text-base font-medium leading-none capitalize flex">
                      {tripDays} - days
                    </p>
                  </div>
                  <div className="flex items-start justify-start gap-2">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <FaMoneyCheckDollar />

                    <p className="text-base font-medium leading-none capitalize">
                      {budgetType} - budget
                    </p>
                  </div>
                  <div className="flex items-start justify-start gap-2">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />

                    <FaPersonWalkingLuggage />

                    <p className="text-base font-medium leading-none capitalize">
                      {travelWith} - type
                    </p>
                  </div>
                </div>
                <Separator></Separator>
                <div className="space-y-5 mt-5">
                  <div className="flex items-start justify-start gap-2">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <FaHotel />
                    <p className="text-base font-medium leading-none capitalize flex">
                      hotels for reseravation - {hotel_options.length}
                    </p>
                  </div>

                  <div className="flex items-start justify-start gap-2">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <FaPersonHiking />
                    <p className="text-base font-medium leading-none capitalize">
                      Places to Visit - {itinerary.length}
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" asChild>
                  <Link href={`/view-trips/${trip.id}`}>View Trip Details</Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </main>
  );
};

export default ViewTripsPage;
