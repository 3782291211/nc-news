import { useNavigate } from "react-router-dom";

const ArticlePreviewCard = ({author, avatar_url, title, topic, createdAt, votes, commentCount, article_id}) => {
const date = new Date(createdAt).toString();

const navigate = useNavigate();

  return (<li 
    className="articles__preview"
    onClick={() => navigate(`/articles/${article_id}`)}>
    <div className="article__li-div">
    <img className="article-preview__img" src={avatar_url} alt={`${author}'s avatar`}/>
    <p className="article-card__title">{title} </p> 
  
    </div>
      
    <p className="article-card__details"> <em>by </em> <strong>{author}</strong> <em>on</em> {date.slice(0, 15)} <em>in </em> {topic} </p>
    <p className="article-card__details"> 💬 {commentCount} comments</p>
    <p className={`article-card__details ${votes >= 0 ? '--positive' : '--negative'}`}>Votes: {votes}</p>
   
   

  </li>);
};

export default ArticlePreviewCard;