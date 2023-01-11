import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import * as api from '../api';

const Nav = () => {
const [topics, setTopics] = useState(['coding', 'football', 'cooking']);

useEffect(() => {
  api.fetchTopics().then(({topics}) => setTopics(topics));
}, []);

  return(
    <nav>
      <Link to="/">Home</Link>
      <Link to="articles">All articles</Link>
      <ul className="nav__topics">
       <p> Articles by topic</p>
        {topics.map(({slug}, index) => {
          return <Link key={index} to={`${slug}/articles`}><li className="nav__topic-li">{slug}</li></Link>
        })}
      </ul>
    </nav>
  )
};

export default Nav;