import 'animate.css';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as api from '../api';
import Loading from './Loading';
import anonymous from '../anonymous.webp';

const Home = () => {
  const [hinge, setHinge] = useState({state: false, count: 0});
  const [comments, setComments] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [limit, setLimit] = useState(20);
  const [page, setPage] = useState(1);
  const [screenPosition, setScreenPosition] = useState({x: 0, y: 0})

  const [errorMsg, setErrorMsg] = useState(false);
  const navigate = useNavigate();

  useLayoutEffect(() => {
    window.scrollTo(screenPosition.x, screenPosition.y);
  });

  useEffect(() => {
    if (comments && comments.length === 0) {
      setPage(page - 1);
    }
  }, [comments]);
  
  useEffect(() => {
    if (page) {
      setIsLoading(true);
      setErrorMsg(false);
      api.fetchRecentComments(limit, page)
    .then(({comments}) => {
      setIsLoading(false);
      setComments(comments);
    })
    .catch(err => {
      setIsLoading(false);
      setErrorMsg(err.message);
    });
    };
  }, [limit, page]);

  const handleError = ({ currentTarget }) => {
    currentTarget.onerror = null;
    currentTarget.src = anonymous;
  };

  return (<main>
     {hinge.state && <p className={hinge.state && 'animate__animated animate__fadeOut animate__delay-3s'} style={{'fontSize' : '40px', 'marginTop': '90px'}}>Uh oh...</p>}
    <p className={`home__welcome ${hinge.state && 'animate__animated animate__hinge animate__slower'}`} onMouseEnter={() => {
      if (hinge.count === 0) {
         setHinge({state: true, count : 1});
         setTimeout(() => {
          setScreenPosition({x: window.scrollX, y: window.scrollY});
          setHinge({state: false, count : 1});
         }, 4000);
      };
    }}>Welcome to NC News: an online social hub for serious coders.</p>
   
    <p id="home__intro">Northcoders News is an online social space where you can read articles and comments posted by others, as well as post your own. <span className="intro-span">To get started, sign up for a new account, explore the various sections of the website, and post new articles and comments.</span><br /> <br />
    If you'd like to share an interesting story or experience, you can post new articles under existing topics, or you can create a new topic to go along with your article. <br /> <br /> 

    Once you've signed up for a new account, you'll be able to update your account details by heading over to the profile section of the website. <br /> <br /> 
    
    This website is part of a larger full-stack web development project and was inspired by the incredible people at the Northcoders organisation whose support and guidance were invaluable.</p>
    {errorMsg && <p className="error">{errorMsg}</p>}

    {!isLoading && <h2 className="home__h2">Showing latest comments</h2>}
    {isLoading ? <Loading/> : <section>
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
    {page > 1 && <button className="home__page-button" onClick={() => {
      setScreenPosition({x: window.scrollX, y: window.scrollY});
      setPage(prev => --prev);
    }}>Previous page</button>}
    <button className="home__page-button" onClick={() => {
      setScreenPosition({x: window.scrollX, y: window.scrollY});
      setPage(prev => ++prev);
    }}>Next page</button></div>

    <p className="--bold">Page <br />{page}</p>
    <div className="home__skip">
    <label htmlFor="comments__select-page">Go to page</label>
    <input id="comments__select-page" type="number" value={page} onChange={e => setPage(e.target.value)} />
    </div>
    </div>

    <ul className="home__comments">
    {comments && comments.map(({comment_id, votes, article, author, body, avatar_url, article_id, created_at}) => {
      return (
      <li key={comment_id}
        onClick={() => navigate(`/articles/${article_id}`)}
        style={{'backgroundColor' : 'black'}}>
        <div className="article__li-div --home-comment">
        <img className="comment-preview__img" src={avatar_url} alt={`${author}'s avatar`} onError={handleError}/>
       <p className="comment-card__body --home">"{body}"</p>
       </div>
       
       <p className="comment-card__details"><em>🗨 by </em> <strong>{author}</strong></p>
        <p className="comment-card__details --overflow">📝 <em>in</em> "{article}"</p>
       <p className="comment-card__details"> 📆 {new Date(created_at).toString().slice(4, 15)} <span className="comment-card__votes">Votes: {votes}</span></p>
      </li>)
    })}
    </ul>
    </section>}
    <button style={{margin: '20px auto 50px'}} id="button__top" onClick={() => window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })}>Back to top</button>
  </main>);
};

export default Home;