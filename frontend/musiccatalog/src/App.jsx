import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import NavBar from './components/Nav';



function App() {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  return (
    <>
     <NavBar /> 
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/signup" element={<Signup setUser={setUser} />} />
         <Route path="/login" element={<Login setUser={setUser} />} /> 
      </Routes>
    </>
  );
}

export default App;
