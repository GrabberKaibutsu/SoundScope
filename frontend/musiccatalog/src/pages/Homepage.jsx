import React, { useEffect, useState } from "react";
import Artists from "../components/HomeArtists";
import Albums from "../components/HomeAlbums"
import Songs from "../components/HomeSongs"
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

  // displays the top 5 for artists, albums, and tracks
  let topArtists = homeData[0];
  let newAlbums = homeData[1];
  let topTracks = homeData[2];

  return (
    <div>
      <div>
        <div className="flex gap-96">
          <h1 className="text-slate-50 text-4xl">Top Artist</h1>
          <Link to={`/artists`} className="text-slate-50 hover:text-indigo-600" >View More Artists</Link>
        </div>
        <br></br>
        <Artists artists={topArtists}/>
      </div>

      <br></br>

      <div>
        <div className="flex gap-96">
            <h1 className="text-slate-50 text-4xl">New Albums</h1>
            {/* if the user wants to view more albums, they will be sent to a page that will display the top 20 new released albums */}
            <Link to={`/albums`} className="text-slate-50 hover:text-indigo-600" >View More Albums</Link>
        </div>
        <br></br>
        {/* components that will fomat the list of albums */}
        <div>
          <Albums albums={newAlbums} />
        </div>
      </div>

    <br></br>

      <div>
        <div className="flex gap-96">
            <h1 className="text-slate-50 text-4xl">Top Songs</h1>
            {/* if the user wants to view more songs, they will be sent to a page that will display the top 20 songs */}
            <input type="button" value="View More Songs" className="text-white hover:text-indigo-600" />
        </div>
        <br></br>
        {/* components that will fomat the list of songs */}
        <Songs songs={topTracks} />
      </div>
      
    </div>
  );
};

export default Homepage;
