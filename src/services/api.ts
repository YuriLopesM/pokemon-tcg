import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.pokemontcg.io/v2/',
})

api.defaults.headers.common['X-API-Key'] = process.env.POKEMON_APIKEY || '';

export default api;