import axios from 'axios';

const apiUrl = 'http://localhost:3322';

const api = axios.create({
  baseURL: apiUrl,
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },

});


export default api;