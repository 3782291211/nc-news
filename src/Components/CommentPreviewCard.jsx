const CommentPreviewCard = ({commentBody, votes, author, date}) => {
  
  return (
    <li>
    <p className ="comment-card__body">{commentBody}</p>
    <p className="comment-card__details"><em>by </em> <strong>{author}</strong> <em>on</em> {date} <span className="comment-card__votes">Votes: {votes}</span></p>
    </li>
  )
};

export default CommentPreviewCard;