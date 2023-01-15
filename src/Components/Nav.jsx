import { useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { TopicsContext } from "../Contexts/Topics";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Nav = () => {
const { topics, isLoading, apiError } = useContext(TopicsContext);

const navigate = useNavigate();

return(
  <nav>
    <ul id="nav">
    <Link to="/"><li className="nav__link">Home</li></Link>
    <Link to="articles?sort_by=created_at"><li className="nav__link">All articles</li></Link>
    <Link to="topics"><li className="nav__link">Topics</li></Link>
    </ul>
    {isLoading && <p className="nav__loading">Fetching topics</p>}
    {!isLoading && !apiError && 
    <DropdownButton id="dropdown-basic-button" title="Articles by topic">
      {topics.filter(({number_of_articles}) => number_of_articles > 0).map(({slug, topic_id}) => {
        return <Dropdown.Item 
        key={topic_id}
        onClick={(e => navigate(`articles?topic=${e.target.innerHTML}`))}
        >{slug}</Dropdown.Item>
      } )}
    </DropdownButton> }
  </nav>
)
};

export default Nav;






/*
import { useEffect, useState, useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { TopicsContext } from "../Contexts/Topics";
import * as api from '../api';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

const Nav = () => {
//const [topics, setTopics] = useState(['coding', 'football', 'cooking']);
//const [isLoading, setIsLoading] = useState(false);
//const [apiError, setApiError] = useState(false);
const { topics, isLoading, apiError } = useContext(TopicsContext);

//const [defaultPlaceholder, setDefaultPlaceholder] = useState('📰 Articles by topic');
const defaultValue = { label: '📰 Articles by topic' };
 
const [navigateTo, setNavigateTo] = useState('');
const navigate = useNavigate();
useEffect(() => {
 //setDefaultPlaceholder(defaultValue);
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
    {!isLoading && !apiError && <Dropdown 
    options={options} 
    onChange={e => setNavigateTo(e.label)} 
    value={defaultValue}
    className="nav__dropdown" 
    placeholderClassName="Dropdown-placeholder"
    ></Dropdown>}
  </nav>
)
};

export default Nav;
*/