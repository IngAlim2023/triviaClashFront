import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import useGameContext from "./context/GameHook";
import { useEffect } from "react";
import socket from "./services/socket";
import type { DataRooms, DataUsers } from "./context/GameContext";
import { Toaster } from "react-hot-toast";
import NotFound from "./pages/NotFound";
import ScreenGame from "./pages/ScreenGame";
import Room from "./pages/Room";

const App = () => {
  const { setUsers, setRooms } = useGameContext();
  useEffect(() => {
    //Este es para actualizar los usuarios que estan conectados:
    socket.on("newUser", (data: DataUsers[]) => {
      setUsers(data);
    });
    socket.on("newRoom", (data: DataRooms[]) => {
      setRooms(data);
    });

    return () => {
      socket.off("newUser");
      socket.off("newRoom");
    };
  }, [setUsers, setRooms]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:id" element={<ScreenGame />} />
        <Route path="/room/:id" element={<Room />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="bottom-right" reverseOrder={false} />
    </Router>
  );
};

export default App;
