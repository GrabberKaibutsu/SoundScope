import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Genre = () => {

    const [genres, setGenres] = useState([]);

    // gets the list of genres from the backend
    useEffect(() => {
        fetch("http://localhost:3001/genre")
        .then((res) => {
            if (res.ok) {
            return res.json();
            }
        })
        .then((jsonRes) => setGenres(jsonRes));
    }, []);

    // console.log(genres)

  return (
    <div>
        Genre
        {/* goes over the list of genres to diplay on the screen*/}
        <ul>
            {genres && genres.map((item, index) => {
                return (
                    <li>
                        {/* each genre will link to a show page that will display albums, artist and tracks of the genre */}
                        <Link to={`/genres/${item}`}>
                            {item}
                        </Link>
                    </li>
                );
            })}
        </ul>
    </div>
  )
}

export default Genre