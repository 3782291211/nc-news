import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as api from '../api';
import CommentCard from "./CommentCard";
import Loading from "./Loading";

const Comments = ({loggedInUser}) => {
const navigate = useNavigate();
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
    if (!err.response) {
      setApiError(err.message);
    } else if (err.response.data.msg) {
      setApiError(err.response.data.msg === 'Resource not found.' ? 'Article not found.' : err.response.data.msg);
    }else {
      setApiError(err.response.data);
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
    <button style={{marginTop: '20px'}} className="comments__new" onClick={() => navigate(-1)}>Back to article</button>
    {isLoading ? <Loading/> 
    : <div>
       <h2>Showing comments for <em className="h2__em">{`"${article.title}"`} </em></h2>
       <h3>Article:</h3>
       <p className="single-article__author">By <strong>{article.author}</strong>, {new Date(article.created_at).toString().slice(0, 24)}</p>
    <article className="comments__article">
      {article.body}
    </article>

    <h3 ref={myRef} style={{'margin' : '45px 0 20px'}}>{comments.length ? 'Comments: ' : 'There are no comments on this article. Check again later.'}</h3>
    {showTextArea && <textarea id="comments__new" placeholder="Add text here" onChange={e => {
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
    <button style={{display: 'block', margin: '50px auto'}} id="button__top" onClick={() => window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })}>Back to top</button>
    </main>
 );
};
};

export default Comments;