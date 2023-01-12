const ArticlePreviewCard = ({author, title, topic, createdAt, votes, commentCount}) => {
const date = new Date(createdAt).toString();

  return (<li className="articles__preview">
    <p className="article-card__title">{title} </p> 
    <p className="article-card__details"> <em>by </em> <strong>{author}</strong> <em>on</em> {date.slice(0, 15)} <em>in </em> {topic} </p>
    <p className="article-card__details"> 💬 {commentCount} comments</p>
    <p className={`article-card__details ${votes >= 0 ? '--positive' : '--negative'}`}>Votes: {votes}</p>
  </li>);
};

export default ArticlePreviewCard;