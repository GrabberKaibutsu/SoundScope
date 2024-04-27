import React from 'react'

// work on, not working the same with the show album, similar to the song component
const AlbumSongs = ({songs}) => {
  return (
    <div className="text-slate-50">
        <ul className="grid gap-x-20 gap-y-4 grid-cols-2 hover:list-disc">
            {songs && songs.map((item, index) => {
                return (
                    <li className="flex justify-start w-">
                        {item?.name}
                    </li>
                );
            })}
        </ul>
    </div>
  )
}

export default AlbumSongs