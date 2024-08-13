export type ItineraryItem = {
  name: string;
  details: string;
  imageUrl: string;
  geoCoordinates: [number | "N/A", number | "N/A"];
  ticketPricing: string;
  travelTime: string;
  bestTimeToVisit: string;
};

export type ItineraryDay = {
  day: number;
  schedule: ItineraryItem[];
};

type HotelOption = {
  name: string;
  address: string;
  price: string;
  imageUrl: string;
  geoCoordinates: [number, number];
  rating: number;
  descriptions: string;
};

export type CompleteTripData = {
  id: string;
  tripData: {
    itinerary: ItineraryDay[];
    hotels: HotelOption[];
  };
  userEmail: string;
  userSelection: {
    budgetType: string;
    travelWith: string;
    destination: string;
    tripDays: number;
  };
};
