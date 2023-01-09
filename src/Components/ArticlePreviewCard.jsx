const ArticlePreviewCard = ({author, title, topic, createdAt}) => {
const date = new Date(createdAt).toString();
console.log(typeof date);

  return (<li>
    <p className="article-card__title">{title} </p> 
    <p className="article-card__details"> <em>by </em> <strong>{author}</strong> <em>on</em> {date.slice(0, 15)} <em>in </em> {topic}</p>
  </li>);
};

export default ArticlePreviewCard;