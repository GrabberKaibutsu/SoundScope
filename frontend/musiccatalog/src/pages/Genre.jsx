import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Genre = () => {

    const [genres, setGenres] = useState([]);

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
        <ul>
            {genres && genres.map((item, index) => {
                return (
                    <li>
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