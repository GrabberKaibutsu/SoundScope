import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Songs from "../components/AlbumSongs"

const ShowAlbum = () => {

    const { id } = useParams();
    const [album, setalbum] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3001/albums/${id}`)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .then((jsonRes) => setalbum(jsonRes));
      }, [id]);

      console.log(album)

    return (
        <div>
            ShowAlbum
            <br></br>

            <img src={album.images[1].url} />
            {album.name}
            <br></br>
            {album.artists[0].name}
            <br></br>
            <br></br>
            <Songs songs={album.tracks.items} />
        </div>
    )
}

export default ShowAlbum