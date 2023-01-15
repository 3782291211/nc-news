import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Header from './Components/Header';
import Nav from './Components/Nav';
import Articles from './Components/Articles';
import SingleArticle from './Components/SingleArticle';
import Comments from './Components/Comments';
import Topics from './Components/Topics';
import NewArticle from './Components/NewArticle';
import ArticleDeleteConfirm from './Components/ArticleDeleteConfirm';
import ArticlePostedConfirm from './Components/ArticlePostedConfirm';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useState, useContext } from "react";
import { TopicsContext } from './Contexts/Topics';

function App() {
  const [loggedInUser, setLoggedInUser] = useState('tickle122');
  const topics = useContext(TopicsContext);
  const location = useLocation();

  return (
    <div className="App">
      <Login setLoggedInUser={setLoggedInUser}
      loggedInUser={loggedInUser}/>
      <Header />
      <Nav />
      <div id="App__body">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/articles" element={<Articles />}/>
        <Route path="/articles/:articleId" element={<SingleArticle loggedInUser={loggedInUser} />}/> 
        <Route path="/articles/:articleId/comments" element={<Comments loggedInUser={loggedInUser} />} />
        <Route path="/articles/new" element={<NewArticle loggedInUser={loggedInUser} />} />
        <Route path="/topics" element={<Topics />}/>
        <Route path="/articles/deleted/:articleId" element={<ArticleDeleteConfirm />} />
        <Route path="/articles/new/:articleId" element={<ArticlePostedConfirm />}/>
        <Route path="/*" element={<p className="error">HTTP error 404: page not found.</p>}/>
      </Routes>
      </div>
      {!/\/articles\/(deleted|new)/.test(location.pathname) && <button id="button__top" onClick={() => window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })}>Back to top</button>}
    </div>
  );
}

export default App;