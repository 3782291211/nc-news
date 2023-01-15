import { Link } from 'react-router-dom';

const ArticleDeleteConfirm = () => {
  return (
  <main>
    <h2>Your article has successfully been deleted.</h2>
    <Link to="/">Back to home.</Link>
  </main>
  );
};

export default ArticleDeleteConfirm;