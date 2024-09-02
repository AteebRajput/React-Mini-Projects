// src/App.js
import React from "react";
import Search from './components/search/search';
import WeatherApp from './components/weatherApp/WeatherApp';
import { CitiesDataProvider } from './context-api/context';
import './App.css';

function App() {
  return (
    <CitiesDataProvider>
      <WeatherApp />
      
    </CitiesDataProvider>
  );
}

export default App;
