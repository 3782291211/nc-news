import { useState } from "react";
import * as api from '../api';
import updateVotes from '../updateVotes';

const Buttons = ({votes, showError, setShowError, loggedInUser, author, id, setItem, setShowDeletedMsg, setShowDeleteError, itemType}) => {
  
const [notLoggedInError, setNotLoggedInError] = useState(false);
const [disableDelete, setDisableDelete] = useState(false);
const [isLoading, setIsLoading] = useState(false);

const [previousButton, setPreviousButton] = useState('');
const [voteLimitError, setVoteLimitError] = useState(false);

const handleClick = e => {
if (e.target.id !== previousButton) {
  setVoteLimitError(false);
  setPreviousButton(e.target.id);
  updateVotes(setShowError, setItem, id, e.target.id, itemType);
} else {
  setVoteLimitError(true);
}

}

//setPreviousButton(e.target.id);
//setVoteCount(prev => {});
 // if (voteCount <= 1) {
 //  updateVotes(setShowError, setItem, id, e.target.id, itemType);
 // }
//}

/*

if (!loggedInUser) {
    setNotLoggedInError(true);
  } else if
*/
//!loggedInUser ? () =>  : updateVotes;

const handleDelete = () => {
  if (loggedInUser === author) {
    setIsLoading(true);
    setDisableDelete(true);

    api.deleteComment(id)
    .then(() => {
      setIsLoading(false);
      setItem(prev => prev.filter(comment => 
      comment.comment_id !== id));
      setShowDeletedMsg(true);
      setTimeout(() => setShowDeletedMsg(false), 5000);
    })
    .catch(() => {
      setDisableDelete(false);
      setIsLoading(false);
      setShowDeleteError(true);
      setTimeout(() => setShowDeleteError(false), 5000);
    });
  };
};

  return (<>
      <span className={`votes__count ${votes >= 0 ? '--positive' : '--negative'}`}>Votes: {votes}</span>
    <div className="votes__buttons">
      <button id="upvote" onClick={handleClick}>Vote up 👍</button>
      <button id="downvote" onClick={handleClick}>Vote down 👎</button>

      {loggedInUser && loggedInUser === author && <button id={id} disabled={disableDelete} onClick={handleDelete} className={isLoading ? '--red' : ''}>{isLoading ? 'Deleting...' : 'Delete'}</button>}
   
     {notLoggedInError && !loggedInUser && <p className="votes__error">You must log in to vote.</p>}

     {voteLimitError && <p className="votes__error">{`You can only vote once per ${itemType}`}</p>}
     
     {showError && <p className="votes__error">Unable to update votes.</p>}
   </div>
   </>
  );
};

export default Buttons;