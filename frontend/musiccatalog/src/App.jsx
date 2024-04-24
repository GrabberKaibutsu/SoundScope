import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NavBar from './components/NavBar';
import'./NavBar.css';
import Home from "./pages/Homepage"
import Album from "./pages/ShowAlbum"
import Albums from "./pages/ViewAlbums"
import SingleArtist from "./components/SingleArtist";
import SongsList from './pages/SongsList';
import SingleSong from './pages/SingleSong';
import TrendingSongs from './components/TrendingSongs';
function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  return (
    <>
 <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup setUser={setUser} />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/album/:id" element={<Album />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/songs" element={<SongsList />} />
        <Route path="/songs/:id" element={<SingleSong />} />
        <Route path="/trending" element={<TrendingSongs />} /> 
      </Routes>
    </>
  );
}

export default App;
