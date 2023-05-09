import axios from 'axios';

const apiUrl = 'https://auth-socketio.frederico-carlo.repl.co';

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },

});


export default api;