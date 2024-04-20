import React from 'react'

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