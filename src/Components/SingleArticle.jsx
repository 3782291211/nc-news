import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from '../api';
import CommentPreviewCard from "./CommentPreviewCard";

const SingleArticle = () => {
const { articleId } = useParams();
const [article, setArticle] = useState([]);
const [comments, setComments] = useState([]);
const [originalComments, setOriginalComments] = useState([]);
const [showTopButton, setShowTopButton] = useState(true);
const [showRecentButton, setShowRecentButton] = useState(false);

useEffect(() => {
  api.fetchSingleArticle(articleId).then(({article}) => {
    setArticle(article);
  });

  api.fetchComments(articleId).then(({comments}) => {
    setComments(comments);
    setOriginalComments(comments);
  })
}, []);

const date = new Date(article.created_at).toString();

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
    <h2 >{`"${article.title}"`}</h2>
    <p className="single-article__author">By <strong>{article.author}</strong>, {date.slice(0, 15)}</p>
    <article>
      {article.body}
    </article>

    <div className="single-article__buttons">
    {showRecentButton && <button id="recent" onClick={handleClick}>Most recent</button>}
    {showTopButton && <button id="top" onClick={handleClick}>Top comments</button>}
    <button>Show all comments</button>
    </div>

    <ul>
    {comments.map(({comment_id, votes, author, body, created_at}, i) => {
      if (i < 5) {
        return <CommentPreviewCard 
          key={comment_id}
          commentBody={body}
          votes={votes}
          author={author}
          createdAt={created_at}
          articleId={articleId} />
      }
    })}
    </ul>
  </main>
);
};

export default SingleArticle;