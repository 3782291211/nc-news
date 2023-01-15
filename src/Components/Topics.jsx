import { useEffect, useState, useContext } from "react";
import { TopicsContext } from "../Contexts/Topics";
import { useNavigate } from "react-router-dom";
import * as api from '../api';

const Topics = () => {
const { topics, setTopics } = useContext(TopicsContext);

//const [topics, setTopics] = useState([]);
const [newTopic, setNewTopic] = useState('');
const [newTopicBody, setNewTopicBody] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [successMsg, setSuccessMsg] = useState(false);
const [showDeletedMsg, setShowDeletedMsg] = useState(false);

const [error, setError] = useState('');

const navigate = useNavigate();

useEffect(() => {
  setIsLoading(true);
  api.fetchTopics()
  .then(({topics}) => {
    setIsLoading(false);
    setTopics(topics);
  })
  .catch(err => {
    setIsLoading(false);
    setError(err.msg);
  });
}, []);

const handleSubmit = e => {
  e.preventDefault();
  if (newTopic && newTopicBody) {
    api.postNewTopic(newTopic, newTopicBody)
    .then((topic) => {
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 6000);
      setTopics(prev => [topic, ...prev]);
  })
  .catch(err => {
    setError(err.message);
    setTimeout(() => setError(false), 6000);
  })
  }
  setNewTopic('');
  setNewTopicBody('');
};

const handleDelete = topic => {
  return () => {
     api.deleteTopic(topic)
     .then(() => {
      setTopics(prev => {
        return prev.filter(({slug}) => slug !== topic);
      })
      setShowDeletedMsg(true);
      setTimeout(() => setShowDeletedMsg(false), 6000);
     })
     .catch(err => {
       setError(err.message);
       setTimeout(() => setError(false), 6000);
     });
  };
};

return (
  <main>
     {isLoading ? <p className="topics__loading">Fetching data...</p> : <div>
     {successMsg && <p className="topic__confirmation">Your topic has been added to the list.</p>}
     {showDeletedMsg && <p className="comments__confirmation">Topic deleted.</p>}
     {error && <p className="error">{error}</p>}
     
     <h2 className="topics__h2">Viewing all topics</h2>
     <ul className={`topics__list ${topics.length > 5 ? '--flex' : ''}`}>
        {topics.map(({slug, description, topic_id, number_of_articles}) => {
          const cursorStyle = number_of_articles > 0 ? {'cursor' : 'pointer'} : {};
            return (
            <li 
            key={topic_id} 
            style={cursorStyle}
            className={`topics__topic ${topics.length > 5 ? '--flex-item' : ''}`}
            onClick={() => number_of_articles > 0 && navigate(`/articles?topic=${slug}`)}
            >
          
            <div key={topic_id} className={`topic__title ${number_of_articles === 0 ? '--empty-topic' : ''}`}><p>{slug}</p><p>{number_of_articles ? number_of_articles : 'No'} articles</p>
            {number_of_articles === 0 && <button className="topic__delete" onClick={handleDelete(slug)}>Delete</button>}
            </div> "{description}"
            </li>)
        })}
    </ul>

    <h3 className="topics__h3">Add a new topic</h3>
    <form id="topic__form" onSubmit={handleSubmit}>
        <label className="topic__form-label" htmlFor="topic__new-topic">Topic title</label>
        <input id="topic__new-topic" type="text" onChange={e => setNewTopic(e.target.value)} value={newTopic}/>
  
        <label className="topic__form-label" htmlFor="topic__body">Topic description</label>
        <textarea id="topic__body" type="text" onChange={e => setNewTopicBody(e.target.value)} value={newTopicBody}/>

        <button id="topic__submit">Create new topic</button>
    </form>
    </div>}
  </main>
);
};

export default Topics;