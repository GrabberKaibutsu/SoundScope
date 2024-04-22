import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ShowGenre = () => {

    const { genre } = useParams();
    const [genreData, setGenreData] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/genre/${genre}`)
        .then((res) => {
            if (res.ok) {
            return res.json();
            }
        })
        .then((jsonRes) => setGenreData(jsonRes));
    }, [genre]);

    console.log(genreData)

    return (
        <div>
            Show Genre Data
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

      <div>
        <div>
            <h1>Top Songs</h1>
            <input type="button" value="View More Songs" />
        </div>
        <Songs songs={topTracks} />
      </div>
        </div>
    )
}

export default ShowGenre