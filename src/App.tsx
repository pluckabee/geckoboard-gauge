import React from "react";
import { useRouteLoaderData } from "react-router-dom";
import { Gauge } from "./components/Gauge/Gauge";
import { GaugeData } from "./types";
import "./App.css";

function App() {
  const gaugeData = useRouteLoaderData("app") as GaugeData;

  return (
    <div className="App">
      <Gauge {...gaugeData} />
    </div>
  );
}

export default App;
