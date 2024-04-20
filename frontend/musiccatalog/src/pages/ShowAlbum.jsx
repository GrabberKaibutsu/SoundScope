import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

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

    //   console.log(album.name)

    return (
        <div>
            ShowAlbum
            <br></br>
            {album.name}
            <br></br>
            <img src={album.images[0].url} />
        </div>
    )
}

export default ShowAlbum