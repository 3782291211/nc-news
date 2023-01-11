import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { Link } from 'react-router-dom';
import * as api from '../api';
import ArticlePreviewCard from './ArticlePreviewCard';

const Articles = () => {
const [articles, setArticles] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [selectValue, setSelectValue] = useState('created_at');
const { topic } = useParams();

const [searchParams, setSearchParams] = useSearchParams({});
const sortByQuery = searchParams.get('sort_by');

const setSortBy = option => {
  const newParams = new URLSearchParams(searchParams);
  newParams.set('sort_by', option);
  setSearchParams(newParams);
};

useEffect(() => {
console.log(sortByQuery);
  setIsLoading(true);
  api.fetchArticles(topic, sortByQuery).then(({articles}) => {
    setIsLoading(false);
    setArticles(articles);
  });
}, [topic, sortByQuery]);

return (
    <main>
    <h2>Viewing all articles <em>(preview)</em></h2>
    {isLoading && <p className="articles__loading">Fetching data...</p>}
    {!isLoading && 
    <div>

  <p>Sort by:</p>
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

      <ul>
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

export default Articles;