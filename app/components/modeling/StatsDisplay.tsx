"use client";

import React, { useState, useEffect } from 'react';

interface StatItem {
  label: string;
  value: string;
  hoverLabel?: string;
  hoverValue?: string;
  isAge?: boolean;
}

const calculateAge = (birthDateString: string): string => {
  const parts = birthDateString.split('-');
  if (parts.length === 3) {
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);
    const birthDate = new Date(year, month, day);

    if (isNaN(birthDate.getTime())) {
      return "Invalid Date";
    }

    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age.toString();
  } else {
    return "Invalid Format";
  }
};

const statsData: StatItem[] = [
  { label: "Name", value: "Melisa Onder" },
  { label: "Age", value: "2004-08-09", isAge: true },
  { label: "Height", value: "5' 8\"" },
  { label: "Breasts", value: "32D", hoverLabel: "Tiddies", hoverValue: "Fat" },
  { label: "Waist", value: "? inches" },
  { label: "Hips", value: "? inches" },
  { label: "Shoe Size", value: "X US" },
  { label: "Hair Color", value: "Brunette" },
  { label: "Eye Color", value: "Brown" },
  { label: "Title", value: "MILF In Training" },
];

const StatsDisplay: React.FC = () => {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);
  const [currentStats, setCurrentStats] = useState<StatItem[]>(statsData);

  useEffect(() => {
    setCurrentStats(prevStats =>
      prevStats.map(stat => {
        if (stat.isAge && stat.value && stat.value.includes('-')) {
          return { ...stat, value: calculateAge(stat.value) };
        }
        return stat;
      })
    );
  }, []);

  return (
    <div className="fixed top-1/4 left-4 w-64 p-4 bg-white text-black shadow-lg rounded-md border border-gray-300 z-50">
      <h3 className="text-lg font-semibold mb-3 border-b border-gray-300 pb-2">Model Stats</h3>
      <ul className="space-y-1 text-sm">
        {currentStats.map((stat) => (
          <li 
            key={stat.label}
            className="flex justify-between"
            onMouseEnter={() => (stat.hoverValue || stat.hoverLabel) && setHoveredLabel(stat.label)}
            onMouseLeave={() => (stat.hoverValue || stat.hoverLabel) && setHoveredLabel(null)}
          >
            <span className="font-medium">
              {(stat.hoverLabel && hoveredLabel === stat.label) 
                ? stat.hoverLabel 
                : stat.label}
              :
            </span>
            <span>
              {(stat.hoverValue && hoveredLabel === stat.label) 
                ? stat.hoverValue 
                : stat.value}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StatsDisplay; 