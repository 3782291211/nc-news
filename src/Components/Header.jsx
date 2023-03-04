import { useContext, useEffect, useState } from "react";
import * as api from '../api';
import anonymous from '../anonymous.webp';
import { useNavigate } from "react-router-dom";
import { UserContext } from "../Contexts/CurrentUser";

const Header = ({ avatarUrl, setAvatarUrl, setRerender}) => {
const {setLoggedInUser, loggedInUser} = useContext(UserContext);
const [buttonId, setButtonId] = useState('');
const [logoutMsg, setLogoutMsg] = useState('');
const navigate = useNavigate();

useEffect(() => {
  if (loggedInUser) {
    window.localStorage.setItem('NC_NEWS_APP', loggedInUser);
    api.fetchSingleUser(loggedInUser)
    .then(({user : {avatar_url}}) => {
      setAvatarUrl(avatar_url);
    });
  };
}, [loggedInUser]);

const handleSubmit = e => {
  e.preventDefault();
  if (buttonId === 'logout__button') {
    setLoggedInUser('');
    window.localStorage.setItem('NC_NEWS_APP', '');
    navigate('/');
    setLogoutMsg('Until next time!');
    setTimeout(() => setLogoutMsg(''), 6000);
    setRerender(prev => !prev);
  } else if (buttonId === 'login__button') {
    navigate('login');
  } else if (buttonId === 'signup__button') {
    navigate('signup');
  } else if (buttonId === 'profile') {
    setRerender(prev => !prev);
    navigate(`profile/${loggedInUser}`);
  };
};

const handleError = ({ currentTarget }) => {
  currentTarget.onerror = null;
  currentTarget.src = anonymous;
};

  return (
  <main>
    <form id="login__form" onSubmit={handleSubmit}>
    {logoutMsg && <p className="logout">{logoutMsg}</p>}
       
        {!loggedInUser && <div id="login__div">

        <button onClick={e => setButtonId(e.target.id)} id="login__button">Login</button>
        <button onClick={e => setButtonId(e.target.id)} id="signup__button">Sign up</button>
        </div>}

        {loggedInUser && <>
          <p className="login__logged-in">{loggedInUser}</p>
          <img className="login__img" src={avatarUrl || ''} onError={handleError}/>
          <button onClick={e => setButtonId(e.target.id)} id="profile">Profile</button>
          <button onClick={e => setButtonId(e.target.id)} id="logout__button">Log out</button>
        </>}

    </form>
    <h1> Northcoders News</h1>
  </main>
  );
};

export default Header;