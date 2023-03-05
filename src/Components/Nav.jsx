import { useContext } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { TopicsContext } from "../Contexts/Topics";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Spinner from 'react-bootstrap/Spinner';

const Nav = () => {
const { topics, isLoading, apiError } = useContext(TopicsContext);

const navigate = useNavigate();

return(
  <nav>
    <ul id="nav">
    <Link to="/"><li className="nav__link">Home</li></Link>
    <Link to="articles"><li className="nav__link">All articles</li></Link>
    <Link to="topics"><li className="nav__link">Topics</li></Link>
    <Link to="users"><li className="nav__link">Users</li></Link>
    </ul>
    {!apiError && 
    <DropdownButton disabled={isLoading} variant="primary" id="dropdown__main" title={isLoading ? <div style={{display: "inline-flex", alignItems: 'center'}}><Spinner style={{margin: '0 10px 0 0'}} as="span" size="sm" role="status" animation="grow" /><p style={{margin: 0}}>Loading topics...</p></div> : "📰 Articles by topic"}>
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