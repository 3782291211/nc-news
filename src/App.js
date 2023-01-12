import './App.css';
import Home from './Components/Home';
import Login from './Components/Login';
import Header from './Components/Header';
import Nav from './Components/Nav';
import Articles from './Components/Articles';
import SingleArticle from './Components/SingleArticle';
import Comments from './Components/Comments';
import {Routes, Route} from 'react-router-dom';
import { useState } from "react";

function App() {
  const [loggedInUser, setLoggedInUser] = useState('tickle122');

  return (
    <div className="App">
      <Login setLoggedInUser={setLoggedInUser}
      loggedInUser={loggedInUser}/>
      <Header />
      <div id="App__body">
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/articles" element={<Articles />}/>
        <Route path="/articles/:articleId" element={<SingleArticle loggedInUser={loggedInUser} />}/> 
        <Route path="/articles/:articleId/comments" element={<Comments loggedInUser={loggedInUser} />} />
      </Routes>
      </div>
      <button onClick={() => window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })}>Back to top</button>
    </div>
  );
}

export default App;