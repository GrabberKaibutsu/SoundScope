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
      const fetchFavoritedStatus = async () => {
        try {
          // Retrieve the authentication token from localStorage or wherever it's stored
          const token = localStorage.getItem('token');

          if (!token) {
            console.error('Authentication token not found');
            return;
          }

          const response = await fetch(`http://localhost:3001/albums/favorited/${user.id}/${album?.id}`, {
          headers: {
          'Authorization': `Bearer ${token}`,
          },
          })
          if (response.ok) {
            const data = await response.json();
            setFavorited(data.isFavorited); // Assuming the backend returns { isFavorited: boolean }
          } else {
            throw new Error('Failed to fetch favorited status');
          }
        } catch (error) {
          console.error('Error fetching favorited status:', error);
        }
      };
    
      fetchFavoritedStatus();
    }, [user.id, album?.id]);

    const handleToggleFavorite = async () => {

      try {
        setLoading(true);
    
        const response = await fetch(`http://localhost:3001/albums/favorited/${user.id}/${album?.id}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }
        });
    
        if (response.ok) {
          // Toggle favorite status in the UI after successful response
          setFavorited(prevFavorited => !prevFavorited);
        } else {
          console.error('Error toggling favorite status:', response.statusText);
        }
      } catch (error) {
        console.error('Error toggling favorite status:', error);
      } finally {
        setLoading(false);
      }
    }

console.log(favorited)

    return (
        <div className="">
          <h1 className="text-slate-50 text-base md:text-2xl lg:text-4xl">{album?.name}</h1>
          
          <br></br>

          <Link to={`/artist/${album?.artists[0]?.id}`}> <p className="text-zinc-500 hover:text-indigo-600">{album?.artists[0]?.name}</p> </Link>

          <br></br>

          <div className="flex flex-col md:flex-row">
            <div className="flex gap-10">
              <div className="md:w-1/2 mb-4">
                <img src={album?.images[1]?.url} className="w-full h-auto" />

                <br></br>
                <br></br>

                <button type="button" value="Favorite"
                onClick={handleToggleFavorite} className={`text-slate-50 px-4 py-2 rounded ${favorited ? 'bg-red-600 hover:bg-red-700': 'bg-blue-500 hover:bg-blue-600' }`}>
                  {favorited ? 'Unfavorite' : 'Favorite'}
                </button>
              </div>

              <br></br>
              <br></br>
              <br></br>
              <div className="md:w-1/2 md:pl-4">
                <Songs songs={album?.tracks.items} />
              </div>
            </div>
          </div>
        </div>
    )
}

export default ShowAlbum