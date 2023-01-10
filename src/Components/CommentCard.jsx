import * as api from '../api';

const CommentCard = ({body, author, votes, date, id, setComments}) => {

  return (
    <li className="comment__full">
    <p className="comment__details"><strong>{author}</strong> <br />{date}</p>
    <p className ="comment__body">{body}</p>
    </li>
  );
};

export default CommentCard;