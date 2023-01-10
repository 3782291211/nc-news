import * as api from '../src/api';
const updateVotes = (setShowError, setCommentsOrArticle, id, itemType) => {

return e => {
  setShowError(false);
  const voteModifier = e.target.id === 'upvote' ? 1 : -1;

  setCommentsOrArticle(prev => {
      if (itemType === 'comment') {
        return prev.map(comment => {
          return comment.comment_id === id ? 
          {...comment, votes: comment.votes + voteModifier}
          : {...comment};
        })
      } else if (itemType === 'article') {
        return {...prev, votes: prev.votes + voteModifier};
      }
    });

  api.updateCommentVotes(itemType, id, voteModifier)
  .catch(() => {
    setShowError(true);
    setCommentsOrArticle(prev => {
      if (itemType === 'comment') {
        return prev.map(comment => {
        return comment.comment_id === id ? 
        {...comment, votes: comment.votes - voteModifier}
        : {...comment};
        })
      }else if (itemType === 'article') {
        return {...prev, votes: prev.votes - voteModifier};
      }
    })
  })
}

};

export default updateVotes;