"use client";
import React, { useState } from "react";
import { MultiStepLoader } from "./ui/multi-step-loader";

const loadingStates = [
  {
    text: "Fetching travel destinations...",
  },
  {
    text: "Preparing your itinerary...",
  },

  {
    text: "Finding the best restaurants...",
  },
  {
    text: "Mapping out scenic routes...",
  },
  {
    text: "Curating local experiences...",
  },
  {
    text: "Ensuring a smooth journey...",
  },
];

type TripLoaderProps = {
  loading: boolean;
};

const TripLoader = ({ loading }: TripLoaderProps) => {
  return (
    <div className="w-full h-[60vh] flex items-center justify-center">
      <MultiStepLoader
        loadingStates={loadingStates}
        loading={loading}
        duration={5000}
      />
    </div>
  );
};

export default TripLoader;
