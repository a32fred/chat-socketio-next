import axios from 'axios';
import {parseCookies} from 'nookies'


const { token } = parseCookies()
const apiUrl = 'https://auth-socketio.frederico-carlo.repl.co';

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },

});

if(token){
  api.defaults.headers['Authorization'] = `Bearer ${token}`
}

export default api;