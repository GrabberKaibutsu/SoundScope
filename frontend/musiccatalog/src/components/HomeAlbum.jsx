import React from 'react'

const HomeAlbum = ({albums}) => {
  return (
    <div>
        <ul>
            {albums && albums.map((item, index) => {
                return (
                    <li>
                        {item.name}
                        <br></br>
                        <img src={item.images[1].url} />
                    </li>
                );
            })}
        </ul>
    </div>
  )
}

export default HomeAlbum