type Itinerary = {
    time: string;
    travel_time: string;
    details: string;
    geo_coordinates: [number, number];
    place: string;
    image_url: string;
    ticket_pricing: string;
  };
  
  type DayPlan = {
    morning?: Itinerary;
    afternoon?: Itinerary;
    evening?: Itinerary;
  };
  
  type HotelOption = {
    image_url: string;
    rating: number;
    geo_coordinates: [number, number];
    description: string;
    price: string;
    address: string;
    name: string;
  };
  
  export type CompleteTripData = {
    id: string;
    tripData: {
      itinerary: {
        [day: string]: DayPlan;
      };
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