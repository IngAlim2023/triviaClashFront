import { io } from "socket.io-client";
const API_URL = import.meta.env.VITE_API_URL;
// Conectar al backend de Adonis
const socket = io(API_URL);

export default socket;
