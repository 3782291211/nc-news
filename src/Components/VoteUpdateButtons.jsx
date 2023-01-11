import { useState } from "react";
import * as api from '../api';

const VoteUpdateButtons = ({votes, showError, updateVotes, loggedInUser, author, id, setComments, setShowDeletedMsg, setShowWrongUserMsg}) => {
const [notLoggedInError, setNotLoggedInError] = useState(false);
const [disableDelete, setDisableDelete] = useState(false);

const handleClick = () => 
    !loggedInUser ? () => setNotLoggedInError(true) : updateVotes;

const handleDelete = () => {
  if (loggedInUser === author) {
    setDisableDelete(true);
    api.deleteComment(id).then(() => {
      setComments(prev => prev.filter(comment => 
      comment.comment_id !== id));
      setShowDeletedMsg(true);
      setTimeout(() => setShowDeletedMsg(false), 5000);
    });
  } else {
    setShowWrongUserMsg(true);
    setTimeout(() => setShowWrongUserMsg(false), 5000);
  }
};

  return (
    <div className="votes__buttons">
      <span className={`votes__count ${votes >= 0 ? '--positive' : '--negative'}`}>Votes: {votes}</span>
      <button id="upvote" onClick={handleClick()}>Vote up 👍</button>
      <button id="downvote" onClick={handleClick()}>Vote down 👎</button>

      {loggedInUser && <button id={id} disabled={disableDelete} onClick={handleDelete} className={disableDelete ? '--red' : ''}>{disableDelete ? 'Deleting...' : 'Delete comment'}</button>}
   
     {notLoggedInError && <p style={{'color': 'red', 'margin': '0 10px'}}>You must log in to vote.</p>}
     
     {showError && <p style={{'color': 'red', 'margin': '0 10px'}}>Unable to update votes.</p>}
   </div>
  );
};

export default VoteUpdateButtons;