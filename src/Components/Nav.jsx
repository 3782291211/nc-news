import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as api from '../api';

const Nav = () => {
const [topics, setTopics] = useState(['coding', 'football', 'cooking']);
const [isLoading, setIsLoading] = useState(false);
const [apiError, setApiError] = useState(false);

const navigate = useNavigate();

useEffect(() => {
  setApiError(false);
  setIsLoading(true);
  api.fetchTopics()
  .then(({topics}) => {
    setIsLoading(false);
    setTopics(topics);
  })
  .catch(() => {
    setIsLoading(false);
    setApiError(true);
  });
}, []);

return(
    <nav>
      <ul id="nav">
      <Link to="/"><li className="nav__link">Home</li></Link>
      <Link to="articles"><li className="nav__link">All articles</li></Link>
      <Link to="topics"><li className="nav__link">Topics</li></Link>
      </ul>
      <p id="nav__p">Articles by topic</p>
      {isLoading && <p className="nav__loading">Fetching topics</p>}
      {!isLoading && !apiError && <ul>
        {topics.map(({slug}, index) => {
          return <li key={index} id={slug} onClick={e => navigate(`articles?topic=${e.target.id}`)} className="nav__link">{slug}</li>
        })}
      </ul>}
    </nav>
  )
};

export default Nav;