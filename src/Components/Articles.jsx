import { useEffect, useState } from 'react';
import { useSearchParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import * as api from '../api';
import ArticlePreviewCard from './ArticlePreviewCard';
import 'animate.css';

const Articles = () => {
const [articles, setArticles] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [selectedSort, setSelectedSort] = useState('');
const [selectedOrder, setSelectedOrder] = useState('');
const [selectedLimit, setSelectedLimit] = useState('');
const [page, setPage] = useState(1);
const [latestPageSize, setLatestPageSize] = useState('');

const [apiError, setApiError] = useState(null);

const [searchParams, setSearchParams] = useSearchParams({});
const sortByQuery = searchParams.get('sort_by');
const topicQuery = searchParams.get('topic');
const orderByQuery = searchParams.get('order');
const limitQuery = searchParams.get('limit');
const pageQuery = searchParams.get('page');

const setQuery = (option, queryParam) => {
  const newParams = new URLSearchParams(searchParams);
  newParams.set(queryParam, option);
  setSearchParams(newParams);
};

console.log(page, '<<page');
useEffect(() => {
  if (!searchParams.get('sort_by')) {
    setSelectedSort('created_at');
  };
  if (!searchParams.get('order')) {
    setSelectedOrder('DESC');
  };
  setApiError(null);
  setIsLoading(true);
  api.fetchArticles(topicQuery, sortByQuery, orderByQuery, pageQuery, limitQuery)
  .then(({articles, total_count}) => {
    setLatestPageSize(total_count);
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
}, [topicQuery, sortByQuery, orderByQuery, pageQuery]);

if (apiError) {
  return <p className="error">{apiError}</p>;
} else {
  return (
    <main>
    <h2>{topicQuery ? `Viewing articles under '${topicQuery}' ` : 'Viewing all articles'}<em className="h2__em">(preview)</em></h2>
    {!isLoading && <Link to="/articles/new"><button className="articles__new">Post new article</button></Link>}
    {isLoading && <p className="articles__loading">Fetching data...</p>}
    {!isLoading && 
    <div>

<div className="articles__pagination">
  <div className="articles__sort">
  <div>
  <p id="articles__sort">Sort by:</p>
      <select value={selectedSort} onChange={e => {
        setSelectedSort(e.target.value);
        setQuery(e.target.value, 'sort_by');
      }}>
        <option value="comment_count">Comment count</option>
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="votes">Votes</option>
        <option value="created_at">Date</option>
        <option value="topic">Topic</option>
      </select>
    </div>

    <div>
      <p id="articles__sort">Order:</p>
      <select value={selectedOrder} onChange={e => {
        setSelectedOrder(e.target.value);
        setQuery(e.target.value, 'order');
      }}>
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
    </div>

    <div>
      <p id="articles__limit">Articles per page:</p>
      <select value={selectedLimit} onChange={e => {
        setSelectedLimit(e.target.value);
        setQuery(e.target.value, 'limit');
      }}>
         <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="50">50</option>
        <option value="70">70</option>
        <option value="100">100</option>
      </select>
    </div>
  </div>

  <div className="articles__buttons">
      <button onClick={() => {
         if (selectedLimit >= latestPageSize) {
           setPage(prev => prev + 1);
           setQuery(page, 'page');
         };
      }}>Next page</button>
      <button onClick={() => {
        if (page > 1) {
            setPage(prev => prev - 1);
           setQuery(page, 'page');
        }
      }}>Previous page</button>
  </div>
  </div>
      <p>Page {page}</p>
      <ul className="articles__list animate__animated animate__bounceInLeft">
       {articles.map(({article_id, author, avatar_url, title, topic, created_at, votes, comment_count}) => {
         return <Link key={article_id} to={`/articles/${article_id}`}>
          <ArticlePreviewCard
            article_id={article_id}
            author={author}
            avatar_url={avatar_url}
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