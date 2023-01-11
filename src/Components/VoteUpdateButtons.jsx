import { useState } from "react";

const VoteUpdateButtons = ({votes, showError, updateVotes, loggedInUser}) => {
const [notLoggedInError, setNotLoggedInError] = useState(false);

const handleClick = () => 
    !loggedInUser ? () => setNotLoggedInError(true) : updateVotes;

  return (
    <div className="votes__buttons">
      <span className={`votes__count ${votes >= 0 ? '--positive' : '--negative'}`}>Votes: {votes}</span>
      <button id="upvote" onClick={handleClick()}>Vote up 👍</button>
      <button id="downvote" onClick={handleClick()}>Vote down 👎</button>
   
     {notLoggedInError && <p style={{'color': 'red', 'margin': '0 10px'}}>You must log in to vote.</p>}
     
     {showError && <p style={{'color': 'red', 'margin': '0 10px'}}>Unable to update votes.</p>}
   </div>
  );
};

export default VoteUpdateButtons;