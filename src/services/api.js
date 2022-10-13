import axios from "axios";

// Local BaseURL => http://localhost:5000/api
// Live Heroku BaseURL => https://nft-sea-explorer-backend.herokuapp.com/api
// Live Vercel BaseURL => https://nft-sea-explorer-backend.herokuapp.com/api

const api = axios.create({
  baseURL: "https://nft-sea-explorer-backend.vercel.app/api",
});

export default api;
