import React from "react";
import { Metadata } from "next";
import { repository } from "@/lib/data/repository";
import { LocationsClient } from "@/components/locations/LocationsClient";

export const metadata: Metadata = {
  title: "Location Intelligence & Hub Comparison — GCC Fieldbook",
  description:
    "Defensible side-by-side benchmark of India's leading GCC tech hubs (Bengaluru vs Hyderabad) across commercial rents, tech talent pool, and state GCC policy subsidies.",
};

export default async function LocationsPage() {
  const [allCities, comparison] = await Promise.all([
    repository.getCities(),
    repository.getCityComparison(["bengaluru", "hyderabad"]),
  ]);

  return <LocationsClient allCities={allCities} comparison={comparison} />;
}
