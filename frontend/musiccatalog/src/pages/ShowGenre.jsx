import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const ShowGenre = () => {

    const { genre } = useParams();
    const [genreData, setGenreData] = useState(null);

    // will grab a list of top 5 artists, albums and tracks of that genre
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
            {/* will show the top 5 artists of that genre */}
            <div>
                <h1>Artist</h1>
                {/* links to a page that will show more artists of that genre */}
                <Link to={`/albums`}>View More Artists</Link>
            </div>

            <div>
                {/* will show the top 5 albums of that genre */}
                <div>
                    <h1>Albums</h1>
                    {/* links to a page that will show more albums of that genre */}
                    <Link to={`/albums`}>View More Albums</Link>
                </div>
            </div>

            <div>
                {/* will show the top 5 songs of that genre */}
                <div>
                    <h1>Songs</h1>
                    {/* links to a page that will show more songs of that genre */}
                    <input type="button" value="View More Songs" />
                </div>
            </div>
        </div>
    )
}

export default ShowGenre