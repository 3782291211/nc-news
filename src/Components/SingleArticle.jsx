import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from '../api';
import CommentPreviewCard from "./CommentPreviewCard";
import { Link } from "react-router-dom";

const SingleArticle = () => {
const { articleId } = useParams();
const [article, setArticle] = useState([]);
const [comments, setComments] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [originalComments, setOriginalComments] = useState([]);
const [showTopButton, setShowTopButton] = useState(true);
const [showRecentButton, setShowRecentButton] = useState(false);

useEffect(() => {
  setIsLoading(true);
  Promise.all([
    api.fetchSingleArticle(articleId),
    api.fetchComments(articleId)
  ]).then(([{article}, {comments}]) => {
    setIsLoading(false);
    setArticle(article);
    setComments(comments);
    setOriginalComments(comments);
  })
}, []);

const handleClick = e => {
 if (e.target.id === 'top') {
   setShowTopButton(false);
   setShowRecentButton(true);
   setComments(prev => {
      const copy = prev.map(comment => ({...comment}));
      return copy.sort((a,b) => b.votes - a.votes);
    })
   };
 
  if (e.target.id === 'recent') {
    setComments(originalComments);
    setShowTopButton(true);
    setShowRecentButton(false);
  }
};

return (
 <main className="single-article">
  {isLoading ? <p className="single-article__loading">Fetching data...</p> 
  : <div>
    <h2 >{`"${article.title}"`}</h2>
    <p className="single-article__author">By <strong>{article.author}</strong>, under "{article.topic}" <span className="single-article--float">{new Date(article.created_at).toString().slice(0, 24)}</ span></p>
    <article>
      {article.body}
    </article>

    <div className="single-article__buttons">
    {showRecentButton && <button id="recent" onClick={handleClick}>Most recent</button>}
    {showTopButton && <button id="top" onClick={handleClick}>Top comments</button>}
    <button> <Link id="single-article__link" to={`/articles/${articleId}/comments`}>Show all comments</Link></button>
    </div>

    <p className="single-article__current">{showRecentButton ? 'Showing top comments' : 'Showing most recent comments'}</p>

    <ul>
    {comments.map(({comment_id, votes, author, body, created_at}, i) => {
      if (i < 5) {
        return <CommentPreviewCard 
          key={comment_id}
          commentBody={body}
          votes={votes}
          author={author}
          date={new Date(created_at).toString().slice(0, 15)} />
      }
    })}
    </ul>
    </div>}
  </main>
);
};

export default SingleArticle;