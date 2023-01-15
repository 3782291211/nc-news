import 'animate.css';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../api';

const Home = () => {
  const [hinge, setHinge] = useState({state: false, count: 0});
  const [comments, setComments] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);

  const [errorMsg, setErrorMsg] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setErrorMsg(false);
    if (page) {
      api.fetchRecentComments(limit, page)
    .then(({comments}) => setComments(comments))
    .catch(err => setErrorMsg(err.message));
    };
  }, [limit, page]);

  return (<main>
     {hinge.state && <p className={hinge.state && 'animate__animated animate__fadeOut animate__delay-3s'} style={{'fontSize' : '40px', 'marginTop': '90px'}}>Uh oh...</p>}
    <p className={`home__welcome ${hinge.state && 'animate__animated animate__hinge animate__slower'}`} onMouseEnter={() => {
      if (hinge.count === 0) {
         setHinge({state: true, count : 1});
         setTimeout(() => setHinge({state: false, count : 1}), 4000);
      };
    }}>Welcome to NC News, an online social hub</p>
   
    <p id="home__intro">NC News is a newly-launched online social space where you can read articles and comments posted by others, as well as posting your own articles and comments. To get started, check out the latest comments below, or feel free to navigate to the different sections and explore various articles.
    Post new articles.</p>
    {errorMsg && <p className="error">{errorMsg}</p>}

    <h2 className="home__h2">Showing latest comments</h2>
    <section>

    <div className="home__pagination">
    <div className="home__select">
    <p>Results per page</p>
    <select value={limit} onChange={e => setLimit(e.target.value)}>
      <option value="5">5</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="30">30</option>
      <option value="40">40</option>
      <option value="50">50</option>
      <option value="75">75</option>
      <option value="100">100</option>
    </select>
    </div>

    <div className= "home__buttons">
    {page > 1 && <button className="home__page-button" onClick={() => setPage(prev => --prev)}>Previous page</button>}
    <button className="home__page-button" onClick={() => setPage(prev => ++prev)}>Next page</button></div>

    <p className="--bold">Page {page}</p>
    <div className="home__skip">
    <label htmlFor="comments__select-page">Go to page</label>
    <input id="comments__select-page" type="number" value={page} onChange={e => setPage(e.target.value)} />
    </div>
    </div>

    <ul className="home__comments">
    {comments.map(({comment_id, votes, article, author, body, avatar_url, article_id, created_at}) => {
      return (
      <li key={comment_id}
        onClick={() => navigate(`/articles/${article_id}`)}
        style={{'backgroundColor' : 'black'}}>
        <div className="article__li-div --home-comment">
        <img className="comment-preview__img" src={avatar_url} alt={`${author}'s avatar`}/>
       <p className="comment-card__body --home">{body}</p>
       </div>
       
       <p className="comment-card__details"><em>by </em> <strong>{author}</strong></p>
        <p className="comment-card__details"><em>in</em> "{article}"</p>
       <p className="comment-card__details"> {new Date(created_at).toString().slice(4, 15)} <span className="comment-card__votes">Votes: {votes}</span></p>
      </li>)
    })}
    </ul>
    </section>
  </main>);
};

export default Home;