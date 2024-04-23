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
            <h1 className="text-slate-50 text-4xl">{album.name}</h1>
            <Link to={`/artists/${album.artists[0].id}`}> <p className="text-zinc-500 hover:text-indigo-600">{album.artists[0].name}</p> </Link>
            <br></br>

            <div className="flex gap-10">
              <img src={album.images[1].url} />
              <br></br>
              <br></br>
              <br></br>
              <Songs songs={album.tracks.items} />
            </div>
        </div>
    )
}

export default ShowAlbum