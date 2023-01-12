import { useEffect, useState } from "react";
import * as api from '../api';

const Topics = () => {
const [topics, setTopics] = useState([]);

useEffect(() => {
  api.fetchTopics()
  .then(({topics}) => {
    setTopics(topics);
  });
});

return (
  <main>
    <h2 className="topics__h2">Viewing all topics</h2>
    <ul className="topics__list">
        {topics.map(({slug, description}) => {
            return <li className="topics__topic"><p className="topic__title">{slug}</p> "{description}"</li>
        })}
    </ul>

    <form>
        <label></label>
    </form>
  </main>
);
};

export default Topics;