import React, { useEffect, useState } from "react";
import Albums from "../components/Album"

const ViewAlbums = () => {

    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/albums")
        .then((res) => {
            if (res.ok) {
            return res.json();
            }
        })
        .then((jsonRes) => setAlbums(jsonRes));
    }, []);

    // console.log(albums)

  return (
    <div>
        <h1>New Albums</h1>

        <Albums albums={albums} />
    </div>
  )
}

export default ViewAlbums