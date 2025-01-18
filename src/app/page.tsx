'use client'
import React, { useState } from "react";
import { Caveat, Satisfy } from "next/font/google";

const dan = Caveat({
  subsets: ["latin"],
  weight: ["400", "700"],
})

const sat = Satisfy({
  subsets: ["latin"],
  weight: ["400"],
})

const CommuteApp: React.FC = () => {
  const [activeTab, setActiveTab] = useState("book");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedShift, setSelectedShift] = useState("");

  const shifts = [
    { label: "9:30 AM", value: "09:30" },
    { label: "11:00 AM", value: "11:00" },
    { label: "6:05 PM", value: "18:05" },
  ];

  const bookBeforeHours = 30; // Fixed hours to book before
  const cancelBeforeHours = {
    morning: 20, // Hours to cancel morning shifts before
    evening: 6,  // Hours to cancel evening shifts before
  };

  const calculateTime = (hours: number): Date | null => {
    if (!selectedDate || !selectedShift) return null;

    // Combine selected date and shift to create a valid Date object
    const selectedDateTime = new Date(`${selectedDate}T${selectedShift}`);
    if (isNaN(selectedDateTime.getTime())) return null; // Check for invalid date

    // Subtract the specified hours
    return new Date(selectedDateTime.getTime() - hours * 60 * 60 * 1000);
  };

  const formatTime = (date: Date | null): string => {
    if (!date) return "Please select a date and shift.";

    // Format the date and time in dd/mm/yyyy format with the day
    const formattedDate = date.toLocaleDateString("en-GB", {
      weekday: "long", // Include the day
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const formattedTime = date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    return `${formattedDate} at ${formattedTime}`;

  };

  const getCancelBeforeHours = (): number => {
    if (!selectedShift) return 0;

    const hour = parseInt(selectedShift.split(":")[0], 10);
    return hour < 12 ? cancelBeforeHours.morning : cancelBeforeHours.evening;
  };

  const getTimeDifference = (date: Date | null): number | null => {
    if (!date) return null;

    const now = new Date();
    const diffInMs = date.getTime() - now.getTime();
    return diffInMs / (1000 * 60 * 60); // Convert to hours
  };


  return (
    <div className="flex flex-col lg:min-h-screen min-h-[calc(100vh-56px)]  bg-blue-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md text-center text-xl font-bold">
        CheckBook.com
      </header>

      {/* Main Section */}
      <main className="flex-grow container mx-auto p-6 md:max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Tabs */}
          <div className="flex justify-center mb-4">
            <button
              className={`px-4 py-2 font-semibold border-b-2 ${activeTab === "book"
                ? "border-green-600 text-green-600"
                : "border-transparent text-gray-600"
                }`}
              onClick={() => setActiveTab("book")}
            >
              Book Before
            </button>
            <button
              className={`ml-4 px-4 py-2 font-semibold border-b-2 ${activeTab === "cancel"
                ? "border-red-600 text-red-600"
                : "border-transparent text-gray-600"
                }`}
              onClick={() => setActiveTab("cancel")}
            >
              Cancel Before
            </button>
          </div>

          {/* Content */}
          <div className="text-center">
            <label className="block text-gray-700 mb-2">Select Date</label>
            <input
              type="date"
              className="border p-2 rounded w-full mb-4"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]} // Disable past dates
              placeholder="select a date"
            />

            <label className="block text-gray-700 mb-2">Select Shift</label>
            <select
              className="border p-2 rounded w-full mb-4"
              value={selectedShift}
              onChange={(e) => setSelectedShift(e.target.value)}
            >
              <option value="">-- Select a Shift --</option>
              {shifts.map((shift) => (
                <option key={shift.value} value={shift.value}>
                  {shift.label}
                </option>
              ))}
            </select>

            <div className="mt-4 p-4 bg-blue-100 rounded text-blue-800 text-center">
              <p>
                {activeTab === "book"
                  ? `--- You should book before ---`
                  : `--- You should cancel before ---`}
              </p>
              <p className="font-extrabold ">
                {activeTab === "book"
                  ? `${formatTime(calculateTime(bookBeforeHours))}`
                  : `${formatTime(calculateTime(getCancelBeforeHours()))}`
                }
              </p>
            </div>

            {/* Decision Time Check */}
            {(() => {
              const decisionTime =
                activeTab === "book"
                  ? calculateTime(bookBeforeHours)
                  : calculateTime(getCancelBeforeHours());

              // if (!decisionTime) {
              //   return (
              //     <div className="mt-4 p-4 bg-yellow-100 rounded text-yellow-800">
              //       Please select a valid date and shift to see the status
              //     </div>
              //   );
              // }

              const timeDiff = getTimeDifference(decisionTime);

              if (timeDiff !== null) {
                if (timeDiff > 0) {
                  return (
                    <div className="mt-4 p-4 bg-green-100 rounded text-green-800">
                      🎉Yayy.. Still {Math.ceil(timeDiff)} hours left😃!
                    </div>
                  );
                } else {
                  return (
                    <div className="mt-4 p-4 bg-red-100 rounded text-red-800">
                      🙆Oops.. you can't do it now🥺!
                    </div>
                  );
                }
              }

              return null;
            })()}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-600 text-white text-center p-3 mt-6">
        {/* &copy; 2025 CheckBook.com. All rights reserved. */}
        <a href="https://github.com/UdaykiranReddy-1" target="_blank" className={`${sat.className} underline underline-offset-2`}>Made with ❤️ by Uday</a>
      </footer>
    </div>
  );
};

export default CommuteApp;
