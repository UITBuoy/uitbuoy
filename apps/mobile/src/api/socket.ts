import { io } from 'socket.io-client';
const socket = io('http://192.168.132.224:3001');
socket.connect();
console.log(socket);
export default socket;
