import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const host = import.meta.env.BACKENDURL
const FeaturedPlaylists = ({ }) => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        fetch(`${host}/api/featured-playlists`)//added api
            .then(response => response.json())
            .then(data => setPlaylists(data))
            .catch(error => console.error('Error fetching playlists:', error));
    }, []);

return (
    <div className="px-10 py-5">
      <h1 className="text-4xl text-slate-50 mb-5">Featured Playlists</h1>
      <div className="grid grid-cols-3 gap-5">
        {playlists.map(playlist => (
          <Link key={playlist.id} to={`/playlists/${playlist.id}`} className="bg-gray-800 hover:bg-gray-700 rounded-lg overflow-hidden shadow-lg transition duration-200 ease-in-out block">
            <img src={playlist.images[0]?.url} alt={playlist.name} className="w-full h-64 object-cover" />
            <div className="p-4">
              <h3 className="text-xl text-slate-50">{playlist.name}</h3>
              <p className="text-gray-400">{playlist.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};


export default FeaturedPlaylists;

