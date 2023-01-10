import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from '../api';

import CommentCard from "./CommentCard";

const Comments = () => {
const { articleId } = useParams('');
const [article, setArticle] = useState([]);
const [comments, setComments] = useState([]);
const [isLoading, setIsLoading] = useState(false);

useEffect(() => {
  setIsLoading(true);
  Promise.all([
    api.fetchSingleArticle(articleId),
    api.fetchComments(articleId)
  ]).then(([{article}, {comments}]) => {
      setArticle(article);
      setComments(comments);
      setIsLoading(false);
  })
  }, []);

 return (
    <main className="comments">
    {isLoading ? <p className="single-article__loading">Fetching data...</p> 
    : <div>
       <h2 className="comments__h2">Showing comments for <em>{`"${article.title}"`} </em></h2>
       <h3>Article:</h3>
       <p className="single-article__author">By <strong>{article.author}</strong>, {new Date(article.created_at).toString().slice(0, 24)}</p>
    <article className="comments__article">
      {article.body}
    </article>

    <h3>Comments:</h3>
  
    <ul>
    {comments.map(({author, body, comment_id, votes, created_at}) => {
      return <CommentCard 
      key={comment_id}
      id={comment_id}
      setComments={setComments}
      author={author}
      body={body}
      votes={votes}
      date={new Date(created_at).toString().slice(0, 24)}
      />
    })}
    </ul>
    </div>}
    </main>
 );
};

export default Comments;