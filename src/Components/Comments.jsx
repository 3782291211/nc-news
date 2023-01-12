import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import * as api from '../api';

import CommentCard from "./CommentCard";

const Comments = ({loggedInUser}) => {
const { articleId } = useParams('');
const [article, setArticle] = useState([]);
const [comments, setComments] = useState([]);
const [isLoading, setIsLoading] = useState(false);

const [showTextArea, setShowTextArea] = useState(false);
const [showCreateButton, setshowCreateButton] = useState(true);
const [showPostButton, setshowPostButton] = useState(false);
const [newComment, setNewComment] = useState('');

const [showSuccessMsg, setShowSuccessMsg] = useState(false);
const [showDeletedMsg, setShowDeletedMsg] = useState(false);

const [showErrorMsg, setShowErrorMsg] = useState(false);
const [showNotLoggedIn, setshowNotLoggedIn] = useState(false);
const [showDeleteError, setShowDeleteError] = useState(false);

const [apiError, setApiError] = useState(null);

const myRef = useRef(null);

if (showDeletedMsg || showDeleteError) {
  myRef.current.scrollIntoView();
};

useEffect(() => {
  setShowErrorMsg(false);
  setIsLoading(true);
  Promise.all([
    api.fetchSingleArticle(articleId),
    api.fetchComments(articleId)
  ])
  .then(([{article}, {comments}]) => {
      setArticle(article);
      setComments(comments);
      setIsLoading(false);
  })
  .catch(err => {
    setIsLoading(false);
    if (err.response.data.msg) {
      setApiError(err.response.data.msg);
    } else if (err.response.data) {
      setApiError(err.response.data);
    } else {
      setApiError(err.message);
    };
  })
  }, []);

  const handleClick = e => {
    if (!loggedInUser) {
        setshowNotLoggedIn(true);
        setTimeout(() => setshowNotLoggedIn(false), 6000);
      };
    setshowPostButton(false);
    api.postNewComment(articleId, newComment, loggedInUser)
    .then(comment => {
      setShowTextArea(false);
      setNewComment('');
      setShowSuccessMsg(true);
      setTimeout(() => setShowSuccessMsg(false), 6000);
      setComments(prev => [comment, ...prev]);
    })
    .catch(() => {
      setShowErrorMsg(true);
      setTimeout(() => setShowErrorMsg(false), 6000);
    });
  };

if (apiError) {
  return <p className="error">{apiError}</p>;
} else {
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

    <h3 ref={myRef}>Comments:</h3>
    {showTextArea && <textarea placeholder="Add text here" onChange={e => {
      setNewComment(e.target.value);
      setshowCreateButton(false);
      setshowPostButton(true);
    }} onBlur={() => !newComment && setShowTextArea(false)} value={newComment}/>}

    {loggedInUser && (showCreateButton || !newComment) && <button className="comments__new" onClick={() => setShowTextArea(true)}>{'Create new comment'}</button>}
    
    {showPostButton && newComment && <button className="comments__new --green" onClick={handleClick}>{'Post comment'}</button>}

    {showSuccessMsg && <p className="comments__confirmation">Your comment has been added.</p>}

    {showDeletedMsg && <p className="comments__confirmation">Your comment has been deleted.</p>}

    {showErrorMsg && loggedInUser && <p className="comments__error">Unable to add comment.</p>}

    {showNotLoggedIn && <p className="comments__error">You must be logged in to add a comment.</p>}

    {showDeleteError && <p className="comments__error">Unable to delete comment.</p>}

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
      loggedInUser={loggedInUser}
      setShowDeletedMsg={setShowDeletedMsg}
      setShowDeleteError={setShowDeleteError}
      />
    })}
    </ul>
    </div>}
    </main>
 );
};
};

export default Comments;