import './App.css';
import Home from './Components/Home';
import Header from './Components/Header';
import Nav from './Components/Nav';
import Articles from './Components/Articles';
import SingleArticle from './Components/SingleArticle';
import Comments from './Components/Comments';
import Topics from './Components/Topics';
import NewArticle from './Components/NewArticle';
import ArticleDeleteConfirm from './Components/ArticleDeleteConfirm';
import ArticlePostedConfirm from './Components/ArticlePostedConfirm';
import Users from './Components/Users';
import { Routes, Route } from 'react-router-dom';
import { useState } from "react";
import Profile from './Components/Profile';
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {
  const [loggedInUser, setLoggedInUser] = useState(window.localStorage.getItem('NC_NEWS_APP'));
  const [avatarUrl, setAvatarUrl] = useState('');

  return (
    <div className="App">
      <Header setLoggedInUser={setLoggedInUser}
      loggedInUser={loggedInUser}
      avatarUrl={avatarUrl}
      setAvatarUrl={setAvatarUrl}/>
      <Nav/>
      <div id="App__body">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/articles" element={<Articles loggedInUser={loggedInUser}/>}/>
        <Route path="/articles/:articleId" element={<SingleArticle loggedInUser={loggedInUser} />}/> 
        <Route path="/articles/:articleId/comments" element={<Comments loggedInUser={loggedInUser} />} />
        <Route path="/articles/new" element={<NewArticle loggedInUser={loggedInUser} />} />
        <Route path="/topics" element={<Topics loggedInUser={loggedInUser} />}/>
        <Route path="/articles/deleted/:articleId" element={<ArticleDeleteConfirm />} />
        <Route path="/articles/new/:articleId" element={<ArticlePostedConfirm />}/>
        <Route path='/users' element={<Users 
        setLoggedInUser={setLoggedInUser} 
        setAvatarUrl={setAvatarUrl}
        loggedInUser={loggedInUser} />}></Route>
        {loggedInUser && <Route path="/my-profile" element={<Profile loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser}/>}/>}
        <Route path="/login" element={<Login setLoggedInUser={setLoggedInUser}/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/*" element={<p style={{margin: '30px 0 40px'}} className="error">HTTP error 404: page not found.</p>}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;

//regex \/articles\/(deleted|new\/\d+)
// {/^\/$|articles/.test(location.pathname) && }