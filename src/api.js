import axios from "axios";

const newsApi = axios.create({
  baseURL: 'https://majids-backend-api-project.onrender.com/api'
});

export const fetchArticles = () => {
  return newsApi.get('/articles')
  .then(res => res.data);
};

export const fetchSingleArticle = articleId => {
  return newsApi.get(`/articles/${articleId}`)
  .then(res => res.data);
}

export const fetchComments = articleId => {
  return newsApi.get(`articles/${articleId}/comments?limit=50`)
  .then(res => res.data);
};

export const updateCommentVotes = (commentId, voteModifier) => {
  return newsApi.patch(`comments/${commentId}`, {
    "inc_votes": voteModifier
  }).then(({data: {comment}}) => comment);
}