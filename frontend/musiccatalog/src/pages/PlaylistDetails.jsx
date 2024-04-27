import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const PlaylistDetails = () => {
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { id } = useParams();

    useEffect(() => {
        console.log(`Fetching data for playlist ID: ${id}`);
        fetch(`http://localhost:3001/api/playlists/${id}/tracks`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch playlist details');
                }
                return response.json();
            })
            .then(data => {
                console.log('Data received:', data);
                setTracks(data); // Assuming 'data.items' is the array of tracks
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching playlist details:', error);
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div className="text-white text-lg font-bold">Loading...</div>;
    }

    if (error) {
        return <div className="text-white text-lg">Error: {error}</div>;
    }

    if (!tracks || tracks.length === 0) {
        return <div className="text-white text-lg">No tracks available.</div>;
    }

    return (
        <div className="text-white">
            <h1 className="text-2xl font-bold mb-4">Playlist Tracks</h1>
            <ul>
                {tracks.map(track => (
                    <li key={track?.track?.id} className="mb-2">
                        <span className="mr-2">{track?.track?.name}</span> by {track?.track?.artists[0]?.name}
                        <a href={`https://open.spotify.com/track/${track?.track?.id}`} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-400 hover:underline">
                            Listen on Spotify
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};
export default PlaylistDetails;