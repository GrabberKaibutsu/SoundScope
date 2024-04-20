import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Homepage = () => {
<<<<<<< HEAD

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
    console.log(topArtists)
    console.log(newAlbums)
    console.log(topTracks)

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

        <h1>New Albums</h1>

        <ul>
            {newAlbums && newAlbums.map((item, index) => {
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
            {topTracks && topTracks.map((item, index) => {
                return (
                    <li>
                        {item.track.name}
                    </li>
                );
            })}
        </ul>
    </div>
=======
  return (
    <div>Homepage</div>
>>>>>>> f0bf10095b330d89b8909ef19d550b2e0286e92d
  )
}

export default Homepage