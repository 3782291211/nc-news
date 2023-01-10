const VoteUpdateButtons = ({votes, showError, updateVotes}) => {
  return (
    <div className="votes__buttons">
    <span className={`votes__count ${votes >= 0 ? '--positive' : '--negative'}`}>Votes: {votes}</span>
   <button id="upvote" onClick={updateVotes}>Vote up 👍</button>
   <button id="downvote" onClick={updateVotes}>Vote down 👎</button>
   {showError && <p style={{'color': 'red', 'margin': '0 10px'}}>Unable to update votes.</p>}
   </div>
  );
};

export default VoteUpdateButtons;