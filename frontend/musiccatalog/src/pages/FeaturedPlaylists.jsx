import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const FeaturedPlaylists = () => {
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/featured-playlists')//added api
            .then(response => response.json())
            .then(data => setPlaylists(data))
            .catch(error => console.error('Error fetching playlists:', error));
    }, []);

//     return (
//         <div style={{ color: 'white' }}> 
//             <h1>Featured Playlists</h1>
//             <ul>
//                 {playlists.map(playlist => (
//                     <li key={playlist.id}>
//                           <Link to={`/playlist/${playlist.id}`}>
//                         {playlist.name} - {playlist.description}
//                         </Link>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

return (
   
    <div className="playlist-container">
         
        <h1>Featured Playlists</h1>
        <div className="grid">
            {playlists.map(playlist => (
                <div key={playlist.id} className="playlist-card">
                    {playlist.images && playlist.images[0] && (
                        <img src={playlist.images[0].url} alt={playlist.name} className="playlist-image" />
                    )}
                    <div className="playlist-info">
                        <h2>{playlist.name}</h2>
                        <p>{playlist.description}</p>
                    </div>
                </div>
            ))}
        </div>
    </div>
);
};

export default FeaturedPlaylists;

