import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import * as api from '../api';
import ArticlePreviewCard from './ArticlePreviewCard';
import 'animate.css';

const Articles = () => {
const [articles, setArticles] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [selectValue, setSelectValue] = useState('created_at');

const [apiError, setApiError] = useState(null);

const [searchParams, setSearchParams] = useSearchParams({});
const sortByQuery = searchParams.get('sort_by');
const topicQuery = searchParams.get('topic');

const setSortBy = option => {
  const newParams = new URLSearchParams(searchParams);
  newParams.set('sort_by', option);
  setSearchParams(newParams);
};

useEffect(() => {
  setApiError(null);
  setIsLoading(true);
  api.fetchArticles(topicQuery, sortByQuery)
  .then(({articles}) => {
    setIsLoading(false);
    setArticles(articles);
  })
  .catch(err => {
    setIsLoading(false);
    if (!err.response) {
      setApiError(err.message);
    } else if (err.response.data.msg) {
      setApiError(err.response.data.msg === 'Resource not found.' ? 'Topic not found.' : err.response.data.msg);
    }else {
      setApiError(err.response.data);
    };
  });
}, [topicQuery, sortByQuery]);

if (apiError) {
  return <p className="error">{apiError}</p>;
} else {
  return (
    <main>
    <h2>Viewing all articles <em>(preview)</em></h2>
    {isLoading && <p className="articles__loading">Fetching data...</p>}
    {!isLoading && 
    <div>

  <p id="articles__sort">Sort by:</p>
      <select value={selectValue} onChange={e => {
        setSortBy(e.target.value);
        setSelectValue(e.target.value);
      }}>
        <option value="comment_count">Comment count</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="votes">Votes</option>
        <option value="created_at">Date</option>
        <option value="topic">Topic</option>
      </select>

      <ul className="articles__list animate__animated animate__bounceInLeft">
       {articles.map(({article_id, author, title, topic, created_at, votes, comment_count}) => {
         return <Link key={article_id} to={`/articles/${article_id}`}>
          <ArticlePreviewCard
            author={author}
            title={title}
            topic={topic}
            createdAt={created_at}
            votes={votes}
            commentCount={comment_count} />
          </Link>;
      })}
    </ul>
  </div>}
  </main>
);
};
};

export default Articles;