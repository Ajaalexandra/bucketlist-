import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

//import Components to be rendered here
import StartJourney from "./components/StartJourney/StartJourney.js";
import Map from "./components/Map/Map.js";
import IntMap from "./components/InteractiveMap/InteractiveMap.js";

export default (
  <BrowserRouter>
    <div>
      <Route component={StartJourney} exact path="/" />
      <Route component={Map} path="/map" />
      <Route component={IntMap} path="/int-map" />
    </div>
  </BrowserRouter>
);
