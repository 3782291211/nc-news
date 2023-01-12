import { useState } from 'react';
import Buttons from './Buttons';
import updateVotes from '../updateVotes';

const CommentCard = ({body, author, votes, date, id, setComments, loggedInUser, setShowDeletedMsg, setShowWrongUserMsg, setShowDeleteError}) => {
const [showError, setShowError] = useState(false);

  return (
    <li className="comment__full">
    <p className="comment__details"><strong>{author}</strong> <br />{date}</p>
    <p className ="comment__body">{body}</p>
    
    <Buttons 
    votes={votes} 
    showError={showError} 
    updateVotes={updateVotes(setShowError, setComments, id, 'comment')}
    loggedInUser={loggedInUser}
    id={id}
    setComments={setComments}
    setShowDeletedMsg={setShowDeletedMsg}
    author={author}
    setShowWrongUserMsg={setShowWrongUserMsg}
    setShowDeleteError={setShowDeleteError}
    />
    </li>
  );
};

export default CommentCard;