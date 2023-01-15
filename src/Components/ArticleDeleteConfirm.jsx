import { Link } from 'react-router-dom';

const ArticleDeleteConfirm = () => {
  return (
  <main>
    <h2>Your article has been successfully deleted.</h2>
   <Link to="/"> <button>Back to home.</button></Link>
  </main>
  );
};

export default ArticleDeleteConfirm;