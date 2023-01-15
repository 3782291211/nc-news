import { useEffect, useState, useContext, useRef } from "react";
import { TopicsContext } from "../Contexts/Topics";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as api from '../api';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const Topics = () => {
const { topics, setTopics } = useContext(TopicsContext);
const [ searchParams, setSearchParams ] = useSearchParams();
const newTopicInput = searchParams.get('topic');

const [newTopic, setNewTopic] = useState(newTopicInput ? newTopicInput : '');
const [newTopicBody, setNewTopicBody] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [successMsg, setSuccessMsg] = useState(false);
const [showDeletedMsg, setShowDeletedMsg] = useState(false);
const [newTopicLoading, setNewTopicLoading] = useState(false);

const [error, setError] = useState('');
const myRef = useRef(null);
const navigate = useNavigate();

if (error || successMsg || showDeletedMsg) {
  myRef.current.scrollIntoView();
};

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
  setError(false);
  if (!newTopic || !newTopicBody) {
    setError('You must provide a topic name and description.');
    setTimeout(() => setError(false), 6000);
  }
  if (newTopic && newTopicBody) {
    setNewTopicLoading(true);
    api.postNewTopic(newTopic, newTopicBody)
    .then((topic) => {
      setNewTopicLoading(false);
      setSuccessMsg(true);
      setTimeout(() => setSuccessMsg(false), 6000);
      setTopics(prev => [topic, ...prev]);
  })
  .catch(err => {
    setNewTopicLoading(false);
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
  <main ref={myRef}>
     <h2 className="topics__h2">Viewing all topics</h2>
     {isLoading ? <p className="topics__loading">Fetching data...</p> : <div>
     {successMsg && <p className="topic__confirmation">Your topic has been added to the list.</p>}
     {showDeletedMsg && <p className="comments__confirmation">Topic deleted.</p>}
     {error && <p className="error">{error}</p>}
     
     <ul className={`topics__list ${topics.length > 5 ? '--flex' : ''}`}>
        {topics.map(({slug, description, topic_id, number_of_articles}) => {
          const cursorStyle = number_of_articles > 0 ? {'cursor' : 'pointer'} : {};
              return (
            <li 
            key={topic_id} 
            style={cursorStyle}
            className={`topics__topic ${topics.length > 5 ? '--flex-item' : ''} ${number_of_articles === 0 ? '--empty-topic' : ''}`}
            onClick={() => number_of_articles > 0 && navigate(`/articles?topic=${slug}`)}
            >
          
            <div key={topic_id} className='topic__title'>
            <p>{`${slug}; ${number_of_articles === 1 ? `${number_of_articles} article` : `${number_of_articles} articles`}`}</p>
              
            {number_of_articles === 0 && <DropdownButton 
            id="dropdown-basic-button" 
            title="Select an option">
              <Dropdown.Item onClick={() => navigate(`/articles/new?topic=${slug}`)}>Post an article</Dropdown.Item>
              <Dropdown.Item onClick={handleDelete(slug)}>Delete topic</Dropdown.Item>
              </DropdownButton>}

            </div> 
            "{description}"
            {number_of_articles === 0 && <p className="topic__empty-msg">No articles have been posted under this topic yet. Click the button to add an article, or to delete the topic.</p>}
            </li>)
        })}
    </ul>

    <h3 className="topics__h3">Add a new topic</h3>
    <form id="topic__form" onSubmit={handleSubmit}>
        <label className="topic__form-label" htmlFor="topic__new-topic">Topic title</label>
        <input id="topic__new-topic" type="text" onChange={e => setNewTopic(e.target.value)} value={newTopic}/>
  
        <label className="topic__form-label" htmlFor="topic__body">Topic description</label>
        <textarea id="topic__body" type="text" onChange={e => setNewTopicBody(e.target.value)} value={newTopicBody}/>

        <button style={{'backgroundColor' : newTopicLoading ? 'grey' : ''}} id="topic__submit">{newTopicLoading ? 'Adding topic...' : 'Create new topic'}</button>
    </form>
    </div>}
  </main>
);
};

export default Topics;