import axios from "axios";

const newsApi = axios.create({
  baseURL: "https://ncnews.vercel.app/api",
  //baseURL: 'https://majids-backend-api-project.onrender.com/api'
});

export const fetchArticles = (topic, sort_by, order, page, limit, author) => {
  return newsApi
    .get("/articles", {
      params: {
        topic,
        sort_by,
        order,
        page,
        limit,
        author,
      },
    })
    .then((res) => res.data);
};

export const fetchSingleArticle = (articleId) => {
  return newsApi.get(`/articles/${articleId}`).then((res) => res.data);
};

export const fetchComments = (articleId) => {
  return newsApi
    .get(`articles/${articleId}/comments?limit=50`)
    .then((res) => res.data);
};

export const updateCommentVotes = (articleOrComments, id, voteModifier) => {
  return newsApi
    .patch(`${articleOrComments}s/${id}`, { inc_votes: voteModifier })
    .then(({ data }) =>
      articleOrComments === "article" ? data.article : data.comment
    );
};

export const postNewComment = (articleId, body, username) => {
  return newsApi
    .post(`articles/${articleId}/comments`, { username, body })
    .then(({ data: { comment } }) => comment);
};

export const fetchUsers = () => {
  return newsApi.get("users").then((res) => res.data);
};

export const fetchSingleUser = (username) => {
  return newsApi.get(`users/${username}`).then((res) => res.data);
};

export const updateUserDetails = (
  currentUsername,
  username,
  password,
  name,
  avatar_url
) => {
  const requestBody = {};
  [
    ["username", username],
    ["password", password],
    ["name", name],
    ["avatar_url", avatar_url],
  ].forEach((element) => {
    if (element[1]) {
      requestBody[element[0]] = element[1];
    }
  });
  return newsApi
    .patch(`users/${currentUsername}`, requestBody)
    .then((res) => res.data);
};

export const fetchTopics = () => {
  return newsApi.get("/topics").then((res) => res.data);
};

export const deleteComment = (commentId) => {
  return newsApi.delete(`comments/${commentId}`).then(() => "Comment deleted.");
};

export const postNewTopic = (slug, description) => {
  return newsApi
    .post("topics", { slug, description })
    .then(({ data: { topic } }) => topic);
};

export const deleteTopic = (topic) => {
  return newsApi.delete(`topics/${topic}`);
};

export const fetchRecentComments = (limit = 10, page) => {
  return newsApi
    .get("comments", { params: { limit, page } })
    .then((res) => res.data);
};

export const postNewArticle = (author, title, body, topic) => {
  return newsApi
    .post("articles", { author, title, body, topic })
    .then(({ data }) => data);
};

export const deleteArticle = (articleId) => {
  return newsApi.delete(`/articles/${articleId}`);
};

export const deleteUser = (username) => {
  return newsApi.delete(`/users/${username}`);
};

export const signup = (name, username, password, avatar_url) => {
  return newsApi
    .post("signup", { name, username, password, avatar_url })
    .then(({ data }) => data);
};

export const login = (username, password) => {
  return newsApi.post("login", { username, password }).then(({ data }) => data);
};
