import React, { useEffect, useState } from "react";
import Artists from "../components/Artists";
import Albums from "../components/Album"
import Songs from "../components/Songs"
import { Link } from "react-router-dom";

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
        <div>
            <h1>New Albums</h1>
            <Link to={`/albums`}>View More Albums</Link>
        </div>
        <Albums albums={newAlbums} />
      </div>
      <<<<<<< HEAD

      <div>
        <div>
            <h1>Top Songs</h1>
            <input type="button" value="View More Songs" />
        </div>
        <Songs songs={topTracks} />
      </div>
      =======
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

>>>>>>> ba710d609eab69ca19e686a6c73e41721699ad5e

    </div>
  );
};

export default Homepage;
