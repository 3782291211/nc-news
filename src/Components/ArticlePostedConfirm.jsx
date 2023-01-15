import { Link, useParams } from 'react-router-dom';

const ArticlePostedConfirm = () => {
const { articleId } = useParams();
  return (
  <main>
    <h2>Your new article has been successfully posted.</h2>
   <Link to="/"> <button>Back to home</button></Link>
   <Link to={`/articles/${articleId}`}> <button>Go to article</button></Link>
  </main>
  );
};

export default ArticlePostedConfirm;