// src/context-api/context.jsx

import React, { createContext, useState } from "react";

// Create the context
export const CitiesDataContext = createContext();

// Create the provider component
export const CitiesDataProvider = ({ children }) => {
  const [citiesData, setCitiesData] = useState([]);

  // Extract latitude and longitude from citiesData
  const getLatLon = () => {
    if (citiesData.length > 0) {
      const { lat, lon , name} = citiesData[0]; // Assuming you want the first city's lat/lon
      return { lat, lon ,name};
    }
    return { lat: null, lon: null , name: null};
  };

  return (
    <CitiesDataContext.Provider value={{ ...getLatLon(), setCitiesData }}>
      {children}
    </CitiesDataContext.Provider>
  );
};
