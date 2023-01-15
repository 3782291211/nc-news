import { useState } from "react";
import * as api from '../api';

const NewArticle = ({loggedInUser}) => {
const [articleTitle, setNewArticleTitle] = useState('');
const [topic, setTopic] = useState('');
const [newArticleBody, setNewArticleBody] = useState('');

const [error, setError] = useState(false);

const handleSubmit = e => {
  setError(false);
  e.preventDefault();
  api.postNewArticle(loggedInUser, articleTitle, newArticleBody, topic)
  .then(({article}) => {console.log(article)})
  .catch(err => setError(err.message));
};

return (
  <main>
    <h2 className="new-article__h2">Post a new article</h2>

    {error && <p className="error">{error}</p>}
    <form id="new-article__form" onSubmit={handleSubmit}>
        <label className="new-article__form-label" htmlFor="new-article__title">Article title</label>
        <input id="new-article__title" type="text" onChange={e => setNewArticleTitle(e.target.value)} value={articleTitle}/>

        <label className="new-article__form-label" htmlFor="new-article__topic">Topic</label>
        <input id="new-article__topic" type="text" onChange={e => setTopic(e.target.value)} value={topic}/>
  
        <label className="new-article__form-label" htmlFor="new-article__body">Write your article here</label>
        <textarea id="new-article__body" type="text" onChange={e => setNewArticleBody(e.target.value)} value={newArticleBody}/>

        <button id="new-article__submit">Create new topic</button>
    </form>

  </main>
);
};

export default NewArticle;