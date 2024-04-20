import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Albums from "../components/HomeAlbum"
import Songs from "../components/SongsAlbum"

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

    let topArtists = homeData[0]
    let newAlbums = homeData[1]
    let topTracks = homeData[2]
    // console.log(topArtists)
    // console.log(newAlbums)
    // console.log(topTracks)

  return (
    <div>
        <h1>Top Artist</h1>

        <ul>
            {topArtists && topArtists.map((item, index) => {
                return (
                    <li>
                        {item.name}
                        <br></br>
                        <img src={item.images[2].url} />
                    </li>
                );
            })}
        </ul>

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
  )
}

export default Homepage