import { BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import useGameContext from './context/GameHook'
import { useEffect } from 'react'
import socket from './services/socket'
import type { DataUsers } from './context/GameContext'
import { Toaster } from 'react-hot-toast'
import NotFound from './pages/NotFound'

const App = () => {
  const {users, setUsers} = useGameContext();
  useEffect(()=>{
    //Este es para actualizar los usuarios que estan conectados:
    socket.on("newUser", (data: DataUsers[]) => {
      setUsers(data);
    });

    return () => {
      socket.off("users");
    };
  },[setUsers])
  return (
   <Router>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='*' element={<NotFound/>}/>
    </Routes>
    <Toaster position="bottom-right"
  reverseOrder={false}/>
   </Router>
  )
}

export default App
