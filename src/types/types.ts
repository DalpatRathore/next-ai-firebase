export type Itinerary = {
  name: string;
  geoCoordinates: [number, number];
  travelTime: string;
  ticketPricing: string;
  details: string;
  bestTimeToVisit: string;
  imageUrl: string;
};

type HotelOption = {
  name: string;
  address: string;
  price: string;
  imageUrl: string;
  geoCoordinates: [number, number];
  rating: number;
  description: string;
};

export type CompleteTripData = {
  id: string;
  tripData: {
    itinerary: Itinerary[];
    hotel_options: HotelOption[];
  };
  userEmail: string;
  userSelection: {
    budgetType: string;
    travelWith: string;
    destination: string;
    tripDays: number;
  };
};
