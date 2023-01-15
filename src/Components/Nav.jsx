import { useEffect, useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import * as api from '../api';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Nav = () => {
const [topics, setTopics] = useState(['coding', 'football', 'cooking']);
const [isLoading, setIsLoading] = useState(false);
const [apiError, setApiError] = useState(false);

const [defaultPlaceholder, setDefaultPlaceholder] = useState(topics[0]);
const defaultValue = { label: '📰 Articles by topic' };
 
const [navigateTo, setNavigateTo] = useState('');
const navigate = useNavigate();
useEffect(() => {
  setDefaultPlaceholder(defaultValue);
  if (navigateTo) {
    navigate(`articles?topic=${navigateTo}`);
  };
}, [navigateTo]);


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

const options = topics
.filter(({number_of_articles}) => number_of_articles > 0)
.map(({slug, topic_id}) => ({value: topic_id, label: slug}));

return(
  <nav>
    <ul id="nav">
    <Link to="/"><li className="nav__link">Home</li></Link>
    <Link to="articles?sort_by=created_at"><li className="nav__link">All articles</li></Link>
    <Link to="topics"><li className="nav__link">Topics</li></Link>
    </ul>
    {isLoading && <p className="nav__loading">Fetching topics</p>}
    {!isLoading && !apiError && <Dropdown onChange={e => setNavigateTo(e.label)} className="nav__dropdown" placeholderClassName="Dropdown-placeholder"
      options={options} value={defaultPlaceholder}></Dropdown>}
  </nav>
)
};

export default Nav;


/*
return(
  <nav>
    <ul id="nav">
    <Link to="/"><li className="nav__link">Home</li></Link>
    <Link to="articles"><li className="nav__link">All articles</li></Link>
    <Link to="topics"><li className="nav__link">Topics</li></Link>
    </ul>
    {isLoading && <p className="nav__loading">Fetching topics</p>}
    {!isLoading && !apiError && 
      <ul className="nav__dropdown"> 
       {topics.map(({slug, topic_id}) => {
          return <li key={topic_id} id={slug} className="nav__dropdown-link" onClick={e => navigate(`articles?topic=${e.target.id}`)}>{slug}</li>
        })}
      </ul>}
  </nav>
)
};
*/