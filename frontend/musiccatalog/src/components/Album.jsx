import React from 'react'
import { Link } from "react-router-dom";

const HomeAlbum = ({albums}) => {
  return (
    <div>
        <ul>
            {/* Goes over each album in the list to display the top 20 albums */}
            {albums && albums.map((item, index) => {
                return (
                    <li>
                        {/* link to the show album page that will show more details about the album */}
                        <Link to={`/album/${item.id}`}>
                            {item.name}
                            <br></br>
                            <img src={item.images[1].url} />
                        </Link>
                    </li>
                );
            })}
        </ul>
    </div>
  )
}

export default HomeAlbum