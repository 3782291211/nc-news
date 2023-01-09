import axios from "axios";

const newsApi = axios.create({
  baseURL: 'https://majids-backend-api-project.onrender.com/api'
});

export const fetchArticles = () => {
  return newsApi.get('/articles').then(res => res.data);
};