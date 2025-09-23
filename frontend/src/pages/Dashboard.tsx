import { Button } from "@/components/ui/button";
import { Activity, GaugeCircle, Stethoscope } from "lucide-react";
import React from "react";

const Dashboard = () => {
  return (
    <section className="h-screen bg-slate-100">
      <header className="w-full bg-[#1a2c47] py-9 h-64 px-10 text-white flex flex-col justify-between items-center">
        <div className="w-full flex flex-col justify-center items-center gap-3">
          <h1 className="flex items-center space-x-2 gap-2 text-4xl font-bold">
            <Stethoscope /> MEDICAL CARE
          </h1>
          <p className="font-extralight text-lg tracking-widest">
            Medical Care Cardiac Assessment Report
          </p>
        </div>

        <div className="w-full flex justify-end">
          <p className="font-medium text-lg">
            <strong>Date of assessment : </strong> Jun 23, 2025
          </p>
        </div>
      </header>
      <main className="w-full py-8 px-10">
        <div className="w-full flex flex-col justify-center items-center">
          <h1 className="font-bold flex justify-center bg-white items-center py-4 w-72 border rounded-md text-center text-lg text-blue-950">
            Overall Health Score
          </h1>
          <div className="w-full py-14 flex justify-between items-center">
            <div className="flex flex-col gap-3 pr-10">
              <h1 className="flex gap-2 font-bold text-blue-950 text-lg">
                <GaugeCircle />
                Health Score
              </h1>
              <p>
                This score is based on the assessment you have completed.
                Offering a clear snapshot of your current health and fitness.
                Use it to track progress and target areas for improvement.
              </p>
            </div>
            <div className="bg-white min-w-72 border flex flex-col gap-3 rounded-xl px-4 py-4">
              <div className="flex items-center w-fit px-4 py-1 bg-yellow-100 opacity-85 rounded-lg">
                <span className="text-yellow-600 font-medium">Poor</span>
              </div>
              <h1 className="font-bold px-2 text-blue-950 text-3xl">17</h1>
              <div className="w-full bg-gray-300 h-2 rounded-full">
                <div className="h-2 rounded-full bg-gray-400 w-1/2"></div>
              </div>
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>Poor</span>
                <span>Fair</span>
                <span>Good</span>
                <span>Great</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500">
                <span>0</span>
                <span>25</span>
                <span>50</span>
                <span>100</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Dashboard;
