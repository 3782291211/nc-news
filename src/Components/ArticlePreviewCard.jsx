const ArticlePreviewCard = ({author, title, topic, createdAt, votes, commentCount}) => {
const date = new Date(createdAt).toString();

  return (<li>
    <p className="article-card__title">{title} </p> 
    <p className="article-card__details"> <em>by </em> <strong>{author}</strong> <em>on</em> {date.slice(0, 15)} <em>in </em> {topic} </p>
    <p className="article-card__details"> {commentCount} comments <span className={`comment-card__votes ${votes >= 0 ? '--positive' : '--negative'}`}>Votes: {votes}</span></p>
  </li>);
};

export default ArticlePreviewCard;