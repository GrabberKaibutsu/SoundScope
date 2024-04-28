import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const host = import.meta.env.VITE_BACKENDURL;

const FeaturedPlaylists = () => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        fetch(`${host}/api/featured-playlists`)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to fetch playlists');
                }
            })
            .then(data => setPlaylists(data))
            .catch(error => console.error('Error fetching playlists:', error));
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <h1 className="text-4xl text-slate-50 mb-5">Featured Playlists</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
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