import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Songs from "../components/AlbumSongs"

const ShowAlbum = ({user}) => {

    const { id } = useParams();
    const [album, setalbum] = useState(null);
    const [favorited, setFavorited] = useState(false);
    const [loading, setLoading] = useState(true);

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
      // Retrieve the authentication token from localStorage or wherever it's stored
      const token = localStorage.getItem('token');

      // Check if the token exists before making the fetch request
      if (token) {
        fetch(`http://localhost:3001/albums/favorited/${user.id}/${album?.id}`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header   
          },
        })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            throw new Error('Failed to fetch favorited albums');
          }
        })
        .then((jsonRes) => setFavorited(jsonRes))
        .catch((error) => {
          console.error('Error fetching favorited albums:', error);
        });
      }else {
        console.error('Authentication token not found');
      }
    }, [user.id, album?.id]);

  const handleToggleFavorite = async () => {

    // const token = localStorage.getItem("token");

    try {
      setLoading(true);

      await fetch(`http://localhost:3001/albums/favorited/${user.id}/${album?.id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Authorization: `Bearer ${token}`,
        }
      })
      .then((res) => {
        if (res.ok) {
          setFavorited(!favorited); // Toggle favorite status in the UI
        }
      })
    }catch (error) {
      console.error('Error toggling favorite status:', error);
    } finally {
      setLoading(false);
    }
  }

    return (
        <div>
          <div className="flex justify-center gap-28">
            <h1 className="text-slate-50 text-4xl">{album?.name}</h1>

            <button type="button" value="Favorite"
            onClick={handleToggleFavorite} className={`text-slate-50 px-4 py-2 rounded ${favorited ? 'bg-red-600 hover:bg-red-700' : 'bg-blue-500 hover:bg-blue-600'}`}>
              {favorited ? 'Unfavorite' : 'Favorite'}
            </button>
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