import React from 'react'

// wil go over the list of songs and display them on the screen, gets the data from the homepage and the showalbum page
const SongsAlbum = ({songs}) => {
  return (
    <div>
        <ul>
            {songs && songs.map((item, index) => {
                return (
                    <li>
                        {item.track.name}
                    </li>
                );
            })}
        </ul>
    </div>
  )
}

export default SongsAlbum