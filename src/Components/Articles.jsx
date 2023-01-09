import { useEffect, useState } from 'react';
import * as api from '../api';
import ArticlePreviewCard from './ArticlePreviewCard';

const Articles = () => {
const [articles, setArticles] = useState([]);
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  setIsLoading(true);
  api.fetchArticles().then(({articles}) => {
    setIsLoading(false);
    setArticles(articles);
  });
}, []);

return (
    <main>
    <h2>Viewing all articles <em>(preview)</em></h2>
    {isLoading && <p className="articles__loading">Fetching data...</p>}
    {!isLoading && <ul>
    {articles.map(({article_id, author, title, topic, created_at}) => {
        return <ArticlePreviewCard 
        key={article_id}
        author={author}
        title={title}
        topic={topic}
        createdAt={created_at} />;
    })}
  </ul>}
  </main>
);
};

export default Articles;