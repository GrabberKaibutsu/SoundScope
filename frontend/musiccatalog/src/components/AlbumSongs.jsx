import React from 'react'

// work on, not working the same with the show album, similar to the song component
const AlbumSongs = ({songs}) => {

  return (
    <div className="text-slate-50 lg:w-full list-disc">
        <ul className="grid gap-x-20 gap-y-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 bg-slate-800 shadow-lg rounded-lg p-2 justify-items-center">
            {songs && songs.map((item, index) => {
                return (
                    <li className="flex justify-start md:text-center">
                        {item?.name}
                    </li>
                );
            })}
        </ul>
    </div>
  )
}

export default AlbumSongs