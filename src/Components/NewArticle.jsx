import { useState, useContext, useRef } from "react";
import { TopicsContext } from "../Contexts/Topics";
import * as api from '../api';
import { useNavigate, useSearchParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import NewTopicPrompt from "./NewTopicPrompt";

const NewArticle = ({loggedInUser}) => {
const [searchParams, setSearchParams] = useSearchParams();
const topicQuery = searchParams.get('topic');
const [topic, setTopic] = useState(topicQuery ? topicQuery : '');

const { topics } = useContext(TopicsContext);
const [articleTitle, setNewArticleTitle] = useState('');
const [newArticleBody, setNewArticleBody] = useState('');

const [showTopicPrompt, setShowTopicPrompt] = useState(false);
const [error, setError] = useState(false);

const navigate = useNavigate();
const myRef = useRef(null);

if (error) {
  myRef.current.scrollIntoView();
}

const handleSubmit = () => {
return e => {
  setError(false);
  e.preventDefault();
  if (!articleTitle || !topic || !newArticleBody) {
    setError('You must complete all fields before posting your article.');
    setTimeout(() => setError(false), 6000);
  } else if (!topics.map(topic => topic.slug).includes(topic)) {
    setError('That topic does not exist.');
    setTimeout(() => setError(false), 6000);
    setShowTopicPrompt(true);
  } else if (articleTitle && topic && newArticleBody) {
    setError(false);
    api.postNewArticle(loggedInUser, articleTitle, newArticleBody, topic)
    .then(({article}) => {
      navigate(`/articles/new/${article.article_id}`);
    })
    .catch(err => setError(err.message));
};
};
};

return (
  <main>
    <h2 ref={myRef} className="new-article__h2">Post a new article</h2>

    {error && <p className="error">{error}</p>}
    <form style={{ 'marginBottom' : '50px'}} id="new-article__form">
        <label className="new-article__form-label" htmlFor="new-article__title">Article title</label>
        <input id="new-article__title" type="text" onChange={e => setNewArticleTitle(e.target.value)} value={articleTitle}/>

        <label className="new-article__form-label" htmlFor="new-article__topic">Topic</label>
        <input id="new-article__topic" type="text" onChange={e => setTopic(e.target.value)} value={topic}/>
  
        <label className="new-article__form-label" htmlFor="new-article__body">Write your article here</label>
        <textarea id="new-article__body" type="text" onChange={e => setNewArticleBody(e.target.value)} value={newArticleBody}/>

        <Button 
        id="new-article__submit"
        onClick={handleSubmit()}>Post article</ Button>

        <NewTopicPrompt
        show={showTopicPrompt}
        onHide={() => setShowTopicPrompt(false)}
        error={error}
        topic={topic}
        >
        </NewTopicPrompt>
    </form>

  </main>
);
};

export default NewArticle;