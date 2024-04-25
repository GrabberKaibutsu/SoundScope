import React from 'react'

// work on, not working the same with the show album, similar to the song component
const AlbumSongs = ({songs}) => {
  return (
    <div className="text-slate-50">
        <ul className="grid grid-cols-2 gap-2">
            {songs && songs.map((item, index) => {
                return (
                    <li className=" flex justify-start">
                        {item?.name}
                    </li>
                );
            })}
        </ul>
    </div>
  )
}

export default AlbumSongs