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
    <Link to="users"><li className="nav__link">Users</li></Link>
    </ul>
    {isLoading && <p className="nav__loading">Fetching topics</p>}
    {!isLoading && !apiError && 
    <DropdownButton id="dropdown__main" title="📰 Articles by topic">
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