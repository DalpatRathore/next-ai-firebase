import DetailCard from "@/components/DetailCard";
import { db } from "@/service/firebase-config";
import { CompleteTripData } from "@/types/types";
import { doc, getDoc } from "firebase/firestore";
import React from "react";
import { GiCommercialAirplane } from "react-icons/gi";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  FaCalendarDays,
  FaEnvelope,
  FaMoneyCheckDollar,
  FaPersonWalkingLuggage,
} from "react-icons/fa6";
import { Separator } from "@/components/ui/separator";
import NoTrip from "@/components/NoTrip";
import ItineraryCard from "@/components/ItineraryCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type TripDetailPageProps = {
  params: { tripId: string };
};

let tripInfo: CompleteTripData;
const TripDetailPage = async ({ params }: TripDetailPageProps) => {
  const docRef = doc(db, "tripsAi", params.tripId);

  const docSnapshot = await getDoc(docRef);

  if (docSnapshot.exists()) {
    const tripData = docSnapshot.data() as CompleteTripData;
    tripInfo = tripData;
    // console.log("Trip data:", tripData);
  } else {
    console.log("No such document!");
  }
  // console.log(tripInfo);
  if (!tripInfo) {
    return <NoTrip></NoTrip>;
  }
  const { budgetType, destination, travelWith, tripDays } =
    tripInfo.userSelection;
  const { userEmail } = tripInfo;

  return (
    <main className="min-h-screen px-5 py-10 space-y-10">
      <div className="flex items-center justify-center gap-5">
        <Card className="w-full max-w-lg">
          <CardHeader>
            <CardTitle className="flex items-center justify-end gap-1 italic">
              <FaEnvelope />
              {userEmail}
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className=" flex items-center justify-between space-x-4 rounded-md border p-4 border-l-4 border-l-indigo-500">
              <p className="text-xl font-medium leading-none">{destination}</p>
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
          </CardContent>
        </Card>
        <div className="hidden md:block w-full border"></div>
      </div>
      <Separator></Separator>
      <div className="w-full">
        <h2 className="text-3xl font-bold mb-5 md:mb-10">
          🏨 Hotels for Reservation
        </h2>
        <DetailCard tripInfo={tripInfo}></DetailCard>
      </div>
      <Separator></Separator>
      <div className="w-full">
        <h2 className="text-3xl font-bold mb-5 md:mb-10">
          🧳Itinerary Information
        </h2>
        <ItineraryCard tripInfo={tripInfo}></ItineraryCard>
      </div>
      <Separator></Separator>
      <div className="flex items-center justify-center">
        <Button asChild variant={"default"}>
          <Link href={"/view-trips"}>Back to Trips</Link>
        </Button>
      </div>
    </main>
  );
};

export default TripDetailPage;

// import DetailCard from "@/components/DetailCard";
// import { db } from "@/service/firebase-config";
// import { collection, getDocs } from "firebase/firestore";
// import React from "react";
// type TripDetailPageProps = {
//   params: { tripId: string };
// };
// const TripDetailPage = async ({ params }: TripDetailPageProps) => {
//   //   console.log(params.tripId);

//   const collectionRef = collection(db, "tripsAi");

//   const tripsCollectionSnapshot = await getDocs(collectionRef);
//   const tripsList = tripsCollectionSnapshot.docs.map(doc => ({
//     ...doc.data(),
//     id: doc.id,
//   }));
//   console.log(tripsList);

//   return (
//     <main className="min-h-screen px-5 py-10 space-y-10">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//         <DetailCard></DetailCard>
//         <DetailCard></DetailCard>
//         <DetailCard></DetailCard>
//         <DetailCard></DetailCard>
//       </div>
//     </main>
//   );
// };

// export default TripDetailPage;
