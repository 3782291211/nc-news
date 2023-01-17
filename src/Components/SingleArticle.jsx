import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from '../api';
import CommentPreviewCard from "./CommentPreviewCard";
import { Link, useNavigate } from "react-router-dom";
import updateVotes from '../updateVotes';
import Buttons from "./Buttons";
import DeleteNotification from "./DeleteNotification";
import Button from 'react-bootstrap/Button';

const SingleArticle = ({loggedInUser}) => {
  
  const { articleId } = useParams();
  const [article, setArticle] = useState([]);
  const [comments, setComments] = useState([]);
  const [originalComments, setOriginalComments] = useState([]);
  
  const [showTopButton, setShowTopButton] = useState(true);
  const [showRecentButton, setShowRecentButton] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const [apiError, setApiError] = useState(null);
  
  const [newComment, setNewComment] = useState('');
  const [loadingNewComment, setLoadingNewComment] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [commentError, setCommentError] = useState(false);
  
  const navigate = useNavigate();
  const [showDeleteWarning, setShowDeleteWarning] = useState(false);

useEffect(() => {
  setApiError(null);
  setIsLoading(true);
  Promise.all([
    api.fetchSingleArticle(articleId),
    api.fetchComments(articleId)
  ])
  .then(([{article}, {comments}]) => {
    setIsLoading(false);
    setArticle(article);
    setComments(comments);
    setOriginalComments(comments);
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

const handleSubmit = e => {
e.preventDefault();
if (newComment) {
  setLoadingNewComment(true);
  api.postNewComment(articleId, newComment, loggedInUser)
  .then(comment => {
    setArticle(prev => ({...prev , comment_count: ++(prev.comment_count) }));
    setLoadingNewComment(false);
    setNewComment('');
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 6000);
    setComments(prev => {
      return [comment, ...prev];
    })
  }).catch(err => {
    setLoadingNewComment(false);
    setApiError(err.message);
  });
  } else {
    setCommentError('Unable to post a blank comment. Please add some text before posting your comment.');
    setTimeout(() => setCommentError(false), 6000);
  }

};

if (apiError) {
  return (
  <section>
    <p className="error">{apiError}</p>
    <button onClick={() => navigate(-2)}>Go back</button>
  </section>);
} else {
  return (
  <main className="single-article">
  {isLoading ? <p className="single-article__loading">Fetching data...</p> 
  : <div>
    <h2 >{`"${article.title}"`}</h2>
    <div className="single-article__author-div">
      <p className="single-article__author" style={{'marginRight' : '30px'}}>By <strong style={{'fontSize' : '24px'}}>{article.author}</strong>, under "{article.topic}"</p>
      <p className="single-article__author">{new Date(article.created_at).toString().slice(0, 24)}</p>
    </div>
    
    <article>
      {article.body}
      <Buttons votes={article.votes} id={articleId} itemType={'article'} setItem={setArticle} showError={showError} setShowError={setShowError} updateVotes={updateVotes} loggedInUser={loggedInUser}/>
    </article>

    {article.comment_count === 0 && 
      <p className="article__no-comments">There are no comments on this article. Seize the moment and be the first.</p>}
    {successMsg && <p className="comments__confirmation">Comment successsfully posted.</p>}
    {commentError &&  <p className="error" style={{'textAlign' : 'center'}}>{commentError}</p>}
    <section>
      <form id="new-comment__form" onSubmit={handleSubmit}>
        <textarea id="new-comment__body" type="text" onChange={e => setNewComment(e.target.value)} value={newComment} placeholder="Type your comment here..."/>

        <button style={{ 'backgroundColor' : loadingNewComment ? 'grey' : ''}} id="new-comment__submit">{loadingNewComment ? 'Posting comment. Please wait...' : 'Post new comment'}</button>
    </form>
    </section>

   {loggedInUser === article.author && 
     <div> <Button className="article__delete" variant="primary" onClick={() => setShowDeleteWarning(true)}>
      Delete article  
      </Button>

      <DeleteNotification
        show={showDeleteWarning}
        onHide={() => setShowDeleteWarning(false)}
        commentCount={article.comment_count}
        articleId={articleId}
        setApiError={setApiError}
      /></div>}

    {article.comment_count > 0 &&
    <div>
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

    </div>}
  </main>
);
}
};

export default SingleArticle;