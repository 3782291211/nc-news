import { useState } from 'react';
import * as api from '../api';

const CommentCard = ({body, author, votes, date, id, setComments}) => {
const [showError, setShowError] = useState(false);

const handleClick = e => {
  setShowError(false);
  const voteModifier = e.target.id === 'upvote' ? 1 : -1;
  api.updateCommentVotes(id, voteModifier).then(() => {
    setComments(prev => prev.map(comment => {
      return comment.comment_id === id ? 
      {...comment, votes: comment.votes + voteModifier}
      : {...comment};
      }
    ))
  }).catch(() => {
    setShowError(true);
    setComments(prev => prev.map(comment => {
      return comment.comment_id === id ? 
      {...comment, votes: comment.votes - voteModifier}
      : {...comment};
      }
    ))
  })
};

  return (
    <li className="comment__full">
    <p className="comment__details"><strong>{author}</strong> <br />{date}</p>
    <p className ="comment__body">{body}</p>

    <div className="comment__buttons">
    <span className={`comment__votes ${votes >= 0 ? '--positive' : '--negative'}`}>Votes: {votes}</span>
   <button id="upvote" onClick={handleClick}>Vote up 👍</button>
   <button id="downvote" onClick={handleClick}>Vote down 👎</button>
   {showError && <p style={{'color': 'red', 'margin': '0 10px'}}>Unable to update votes.</p>}
   </div>

    </li>
  );
};

export default CommentCard;