import React from 'react'

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