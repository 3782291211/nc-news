const CommentPreviewCard = ({commentBody, votes, author, createdAt, articleId}) => {
const date = new Date(createdAt).toString();

  return (
    <li>
    <p className ="comment-card__body">{commentBody}</p>
    <p className="comment-card__details"><em>by </em> <strong>{author}</strong> <em>on</em> {date.slice(0, 15)} <span className="comment-card__votes">Votes: {votes}</span></p>
    </li>
  )
};

export default CommentPreviewCard;