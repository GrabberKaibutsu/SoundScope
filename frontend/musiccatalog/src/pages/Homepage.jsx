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
  let newAlbums = homeData[1];
  let topTracks = homeData[2];
  console.log(newAlbums);
  console.log(topTracks);

  return (
    <div>
      <div>
        <h1>Top Artist</h1>
        <Artists />
      </div>

      <h1>New Albums</h1>

      <ul>
        {newAlbums &&
          newAlbums.map((item, index) => {
            return (
              <li>
                {item.name}
                <br></br>
                <img src={item.images[1].url} />
              </li>
            );
          })}
      </ul>

      <h1>Top Songs</h1>

      <ul>
        {topTracks &&
          topTracks.map((item, index) => {
            return <li>{item.track.name}</li>;
          })}
      </ul>
    </div>
  );
};

export default Homepage;
