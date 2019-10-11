import axios from 'axios';

const api = axios.create({
  baseURL: 'http://tindev--backend.herokuapp.com',
});

export default api;