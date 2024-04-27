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
                setTracks(data.items); // Assuming 'data.items' is the array of tracks
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching playlist details:', error);
                setError(error.message);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!tracks || tracks.length === 0) {
        return <div>No tracks available.</div>;
    }

    return (
        
        <div>
            <h1>Playlist Tracks</h1>
            <ul>
                {tracks.map(track => (
                    <li key={track.id}>
                        {track.name} by {(track.artists || []).map(artist => artist.name).join(", ")}
                        <a href={`https://open.spotify.com/track/${track.id}`} target="_blank" rel="noopener noreferrer">
                            Listen on Spotify
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlaylistDetails;




