import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Artists from "../components/Artists";

const Homepage = () => {
  const [homeData, setHomeData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/home")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setHomeData(jsonRes));
  }, []);
  

  return (
    <div>
      <div>
        <h1>Top Artist</h1>
        <Artists />
      </div>

      
    </div>
  );
};

export default Homepage;
