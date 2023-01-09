import './App.css';
import Home from './Components/Home';
import Header from './Components/Header';
import Nav from './Components/Nav';
import Articles from './Components/Articles';
import SingleArticle from './Components/SingleArticle';
import {Routes, Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/articles" element={<Articles />}/> 
        <Route path="/articles/:articleId" element={<SingleArticle />}/> 
      </Routes>
    </div>
  );
}

export default App;
