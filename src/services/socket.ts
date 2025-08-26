import { io } from "socket.io-client"

// Conectar al backend de Adonis
const socket = io("http://localhost:3333")

export default socket
