import CreateTripForm from "@/components/CreateTripForm";
import React from "react";

const CreateTripPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-5 py-10 space-y-10">
      <div className="mx-auto max-w-lg text-center space-y-5">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Kickstart Travel Plan with Ai
        </h2>

        <p className="text-muted-foreground">
          Just provide some basic information, and our trip planner will
          generate a customized itinerary based on your preferences.
        </p>
      </div>
      <CreateTripForm></CreateTripForm>
    </main>
  );
};

export default CreateTripPage;
