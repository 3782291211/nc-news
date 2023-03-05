import { useContext, useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate, useSearchParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import * as api from '../api';
import ArticlePreviewCard from './ArticlePreviewCard';
import 'animate.css';
import Loading from './Loading';
import { UserContext } from '../Contexts/CurrentUser';

const Articles = () => {
const {loggedInUser} = useContext(UserContext);
const [articles, setArticles] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [selectedSort, setSelectedSort] = useState('created_at');
const [selectedOrder, setSelectedOrder] = useState('DESC');
const [selectedLimit, setSelectedLimit] = useState('20');
const [page, setPage] = useState(1);
const [screenPosition, setScreenPosition] = useState({x: 0, y: 0});
const navigate = useNavigate();

const [disableNextButton, setDisableNextButton] = useState(false);

const [apiError, setApiError] = useState(null);

const [searchParams, setSearchParams] = useSearchParams({});
const sortByQuery = searchParams.get('sort_by');
const topicQuery = searchParams.get('topic');
const authorQuery = searchParams.get('author');
const orderByQuery = searchParams.get('order');
const limitQuery = searchParams.get('limit');
const pageQuery = searchParams.get('page');

const setQuery = (option, queryParam) => {
  const newParams = new URLSearchParams(searchParams);
  newParams.set(queryParam, option);
  setSearchParams(newParams);
};

useLayoutEffect(() => {
  window.scrollTo(screenPosition.x, screenPosition.y);
});

useEffect(() => {
    setPage(1);
    setQuery(1, 'page');
}, [topicQuery]);

useEffect(() => {
  setIsLoading(true);
  if (!searchParams.get('sort_by')) {
    setSelectedSort('created_at');
  };
  if (!searchParams.get('order')) {
    setSelectedOrder('DESC');
  };
  setApiError(null);
  api.fetchArticles(topicQuery, selectedSort, selectedOrder, pageQuery, selectedLimit, authorQuery)
  .then(({articles, total_count, page_limit}) => {
    setDisableNextButton(total_count < page_limit);
    setArticles(articles);
    setIsLoading(false);
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
}, [topicQuery, sortByQuery, orderByQuery, limitQuery, pageQuery, authorQuery]);

if (apiError) {
  return <p className="error">{apiError}</p>;
} else {
  return (
    <main>
    <h2>{authorQuery ? `Viewing articles by '${authorQuery}' ` : topicQuery ? `Viewing articles under '${topicQuery}' ` : 'Viewing all articles '}<em className="h2__em">(preview)</em></h2>
    {!loggedInUser && <p className="login-prompt">Log in to post new articles.</p>}
    {!isLoading && loggedInUser && <button className="articles__new" onClick={() => navigate('/articles/new')}>Post new article</button>}

    {isLoading ? <Loading/> :
    <div>
    <div className="articles__pagination">
    <div className="articles__sort">
    <div>
    <p className="articles__sort__text">Sort by:</p>
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
      <p className="articles__sort__text">Order:</p>
      <select value={selectedOrder} onChange={e => {
        setSelectedOrder(e.target.value);
        setQuery(e.target.value, 'order');
      }}>
        <option value="ASC">Ascending</option>
        <option value="DESC">Descending</option>
      </select>
    </div>

    <div>
      <p className="articles__sort__text">Articles per page:</p>
      <select value={selectedLimit} onChange={e => {
        setSelectedLimit(e.target.value);
        setQuery(e.target.value, 'limit');
      }}>
         <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
        <option value="50">50</option>
      </select>
    </div>
    </div>

    <div className="articles__buttons">
    <button disabled={page === 1} onClick={() => {
           setScreenPosition({x: window.scrollX, y: window.scrollY});
           setPage(page - 1);
           setQuery(page - 1, 'page');
      }}>Previous page</button>
      <button disabled={disableNextButton} onClick={() => {
           setScreenPosition({x: window.scrollX, y: window.scrollY});
           setPage(page + 1);
           setQuery(page + 1, 'page');
      }}>Next page</button>
    </div><p className="--bold">Page {page}</p>
    </div>

    {articles.length ? <ul className="articles__list animate__animated animate__bounceInLeft">
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
    </ul> : <h3 style={{margin: '40px 0 20px', color: '#F0147B'}}>No articles to display.</h3>}
  </div>}
  <button id="button__top" onClick={() => window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })}>Back to top</button>
  </main>
);
};
};

export default Articles;