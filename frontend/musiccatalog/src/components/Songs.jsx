import React from "react";


const Songs = ({ songs }) => {

  return (
    <div className="text-white grid-cols-2">
        <ul>
            {songs && songs.map((item, index) => {
                return (
                    <li className="flex">
                        <p > {item.track.name}  <span className="text-zinc-500">{item.track.artists[0].name}</span></p>
                    </li>
                );
            })}
        </ul>
    </div>
  );
};

export default Songs;
