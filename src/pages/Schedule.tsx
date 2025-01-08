import React from "react";
import MedicationSchedule from "../components/MedicationSchedule";

const Schedule: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Cycle Schedule</h1>
      <MedicationSchedule />
    </div>
  );
};

export default Schedule;
