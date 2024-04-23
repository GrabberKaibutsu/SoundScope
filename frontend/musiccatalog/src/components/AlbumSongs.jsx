import React from 'react'

// work on, not working the same with the show album, similar to the song component
const AlbumSongs = ({songs}) => {
  return (
    <div>
        <ul>
            {songs && songs.map((item, index) => {
                return (
                    <li>
                        {item.name}
                    </li>
                );
            })}
        </ul>
    </div>
  )
}

export default AlbumSongs