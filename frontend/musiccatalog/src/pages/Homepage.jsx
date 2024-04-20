import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Artists from "../components/Artists";
import Albums from "../components/Album"
import Songs from "../components/Songs"

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

        <div>
            <h1>New Albums</h1>
            <input type="button" value="View More Albums" />
        </div>

        <Albums albums={newAlbums} />

        <div>
            <h1>Top Songs</h1>
            <input type="button" value="View More Songs" />
        </div>

        <Songs songs={topTracks} />
    </div>
  );
};

export default Homepage;
