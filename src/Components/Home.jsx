import 'animate.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../api';

const Home = () => {
  const [hinge, setHinge] = useState(false);
  const [comments, setComments] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (page) {
      api.fetchRecentComments(limit, page)
    .then(({comments}) => setComments(comments))
    .catch(err => setErrorMsg(err.message));
    }
  }, [limit, page]);

  return (<main>
     {hinge && <p className={hinge && 'animate__animated animate__fadeOut animate__delay-3s'} style={{'fontSize' : '40px', 'marginTop': '90px'}}>Uh oh...</p>}
    <p className={`home__welcome ${hinge && 'animate__animated animate__hinge animate__slower'}`} onMouseEnter={() => {
      setHinge(true);
      setTimeout(() => setHinge(false), 4000);
    }}>Welcome to NC news</p>
   
    <p id="home__intro">Explore articles and read comments posted by Northcoders.</p>
    {errorMsg && <p className="error">{errorMsg}</p>}
    <section>

    <p>Results per page</p>
    <select onChange={e => setLimit(e.target.value)}>
      <option value="" disabled selected>Results per page</option>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="30">30</option>
      <option value="40">40</option>
      <option value="50">50</option>
      <option value="75">75</option>
      <option value="100">100</option>
    </select>

    <p>Page {page}</p>
    {page > 1 && <button onClick={() => setPage(prev => --prev)}>Previous page</button>}
    <button onClick={() => setPage(prev => ++prev)}>Next page</button>

    <label htmlFor="comments__select-page">Skip to page</label>
    <input id="comments__select-page" type="number" value={page} onChange={e => setPage(e.target.value)} />

    <ul>
    {comments.map(({comment_id, votes, article, author, body, avatar_url, article_id}) => {
      return (
      <li key={comment_id}
        onClick={() => navigate(`/articles/${article_id}`)}>
       <p>{body}</p>
      </li>)
    })}
    </ul>
    </section>
  </main>);
};

export default Home;