import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

//import Components to be rendered here
import StartJourney from "./components/StartJourney/StartJourney.js";
import Map from "./components/Map/Map.js";
import IntMap from "./components/InteractiveMap/InteractiveMap.js";
import MyBucketList from "./components/MyBucketList/MyBucketList.js";
import Memories from "./components/Memories/Memories.js";

export default (
  <BrowserRouter>
    <div>
      <Route component={StartJourney} exact path="/" />
      <Route component={Map} path="/map" />
      <Route component={IntMap} path="/int-map" />
      <Route component={MyBucketList} path="/bucketlist" />
      <Route component={Memories} path="/memories" />
    </div>
  </BrowserRouter>
);
