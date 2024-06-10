import Constants from 'expo-constants';
import { io } from 'socket.io-client';
const socket = io(
    `http://${Constants.expoConfig.hostUri.split(`:`).shift().concat(`:3001`)}`,
);
socket.connect();
export default socket;
