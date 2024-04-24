import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NavBar from "./components/NavBar";
import'./NavBar.css';
import Search from "./pages/Search"

import Home from "./pages/Homepage";
import Album from "./pages/ShowAlbum";
import Albums from "./pages/Albums";

import SingleArtist from "./components/SingleArtist";
import Genre from "./pages/Genre"
import ShowGenre from"./pages/ShowGenre"

function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  return (
    <>
      <NavBar />
      <br></br>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/album/:id" element={<Album />} />
          <Route path="/albums" element={<Albums />} />
          <Route path="/artist/:id" element={<SingleArtist />} />
          <Route path="/genres" element={<Genre />}/>
          <Route path="/genres/:genre" element={<ShowGenre />}/>
          <Route path="/search/:searchTerm" element={<Search />}/>
        </Routes>

    </>
  );
}

export default App;
