import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Songs from "../components/AlbumSongs"

const ShowAlbum = () => {

    const { id } = useParams();
    const [album, setalbum] = useState(null);
    const [favorited, setFavorited] = useState(false);

    useEffect(() => {
        fetch(`http://localhost:3001/albums/${id}`)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
          })
          .then((jsonRes) => setalbum(jsonRes));
    }, [id]);

    useEffect(() => {
      fetch(`http://localhost:3001/albums/favorited/${id}`)
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
        })
        .then((jsonRes) => setFavorited(jsonRes));
  });

    return (
        <div>
          <div className="flex justify-center gap-28">
            <h1 className="text-slate-50 text-4xl">{album?.name}</h1>

            <input type="button" value="Favorite" className="bg-red-600 hover:bg-red-500 text-slate-50 p-2 m-0"/>
          </div>

          <Link to={`/artist/${album?.artists[0]?.id}`}> <p className="text-zinc-500 hover:text-indigo-600">{album?.artists[0]?.name}</p> </Link>

          <br></br>

          <div className="flex gap-10">
            <img src={album?.images[1]?.url} className="max-w-64 max-h-64" />
            <br></br>
            <br></br>
            <br></br>
            <Songs songs={album?.tracks.items} />
          </div>

          <br></br>
          <br></br>

          <div className="flex gap-2">
            <label className="text-slate-50">Review: &nbsp;&nbsp;</label>
            <input type="text" placeholder="Write A Review about this Album" className="rounded w-3/4"/>
            <input type="button" value="Submit" className="bg-lime-600 hover:bg-lime-500 p-2"/>
          </div>



        </div>
    )
}

export default ShowAlbum