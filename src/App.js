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
  const [avatarUrl, setAvatarUrl] = useState('');
  const [rerender, setRerender] = useState(false);

  return (
    <div className="App">
      <Header
      avatarUrl={avatarUrl}
      setAvatarUrl={setAvatarUrl}
      setRerender={setRerender}/>
      <Nav/>
      <div id="App__body">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/articles" element={<Articles/>}/>
        <Route path="/articles/:articleId" element={<SingleArticle/>}/> 
        <Route path="/articles/:articleId/comments" element={<Comments/>}/>
        <Route path="/articles/new" element={<NewArticle/>}/>
        <Route path="/topics" element={<Topics/>}/>
        <Route path="/articles/deleted/:articleId" element={<ArticleDeleteConfirm/>}/>
        <Route path="/articles/new/:articleId" element={<ArticlePostedConfirm/>}/>
        <Route path='/users' element={<Users/>}/>
        <Route path="/profile/:username" element={<Profile setRerender={setRerender} rerender={rerender}/>}/>
        <Route path="/login" element={<Login setRerender={setRerender}/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/*" element={<p style={{margin: '30px 0 40px'}} className="error">HTTP error 404: page not found.</p>}/>
      </Routes>
      </div>
    </div>
  );
}

export default App;