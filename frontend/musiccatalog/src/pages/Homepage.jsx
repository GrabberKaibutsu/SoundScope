import React, { useEffect, useState } from "react";
import Artists from "../components/Artists";
import Albums from "../components/Album"
import Songs from "../components/Songs"
import { Link } from "react-router-dom";

const Homepage = () => {
  const [homeData, setHomeData] = useState([]);

  // gets the list of top 5 artists, albums and tracks to display on the home page
  useEffect(() => {
    fetch("http://localhost:3001/home")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((jsonRes) => setHomeData(jsonRes));
  }, []);

  // displays the top 5 for albums and tracks
  let newAlbums = homeData[1];
  let topTracks = homeData[2];
  // console.log(newAlbums);
  // console.log(topTracks);

  return (
    <div>
      <div>
        <h1>Top Artist</h1>
        <Artists />
      </div>

      <div>
        <div>
            <h1>New Albums</h1>
            {/* if the user wants to view more albums, they will be sent to a page that will display the top 20 new released albums */}
            <Link to={`/albums`}>View More Albums</Link>
        </div>
        {/* components that will fomat the list of albums */}
        <Albums albums={newAlbums} />
      </div>

      <div>
        <div>
            <h1>Top Songs</h1>
            {/* if the user wants to view more songs, they will be sent to a page that will display the top 20 songs */}
            <input type="button" value="View More Songs" />
        </div>
        {/* components that will fomat the list of songs */}
        <Songs songs={topTracks} />
      </div>
      
    </div>
  );
};

export default Homepage;
