import { useEffect, useState } from "react";
import * as api from '../api';
import anonymous from '../anonymous.webp';
import { useNavigate } from "react-router-dom";

const Header = ({setLoggedInUser, loggedInUser, avatarUrl, setAvatarUrl}) => {
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
  } else if (buttonId === 'login__button') {
    navigate('login');
  } else if (buttonId === 'signup__button') {
    navigate('signup');
  } else if (buttonId === 'profile') {
    navigate('my-profile');
  };
};

const handleError = ({ currentTarget }) => {
  currentTarget.onerror = null; // prevents looping
  currentTarget.src = anonymous;
};

  return (
  <main>
    <form id="login__form" onSubmit={handleSubmit}>
    {logoutMsg && <p className="logout">{logoutMsg}</p>}
       
        {!loggedInUser && !logoutMsg && <div id="login__div">

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

/*import { useEffect, useState } from "react";
import * as api from '../api';

const Login = ({setLoggedInUser, loggedInUser, avatarUrl, setAvatarUrl}) => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [users, setUsers] = useState([]);
const [showErrorMsg, setShowErrorMsg] = useState(false);
const [buttonId, setButtonId] = useState('');

useEffect(() => {
  api.fetchUsers().then(({users}) => {
    setUsers(users);
    setAvatarUrl(users.filter(user => user.username === loggedInUser)[0].avatar_url);
  });
}, []);

const handleSubmit = e => {
  e.preventDefault();
  if (buttonId === 'logout__button') {
    setLoggedInUser('');
  } else if (users.map(({username}) => username).includes(username) && password === 'password') {
    setLoggedInUser(username);
    setAvatarUrl(users.filter(user => user.username === username)[0].avatar_url);
    setUsername('');
    setPassword('');
  } else {
    setShowErrorMsg(true);
    setTimeout(() => setShowErrorMsg(false), 6000);
  }
};
  return (
    <form style={loggedInUser ? {'height': '57px'} : {}} id="login__form" onSubmit={handleSubmit}>
       
        {!loggedInUser && !showErrorMsg && <div id="login__div">
        <div className="login__field">
        <label htmlFor="username" className="login__label"> Username </label>
        <input id="username" type="text" onChange={e => setUsername(e.target.value)} placeholder="username" value={username}/>
        </div>

        <div className="login__field">
        <label htmlFor="password" className="login__label"> Password  </label>
        <input id="password" type="password" onChange={e => setPassword(e.target.value)} placeholder="password" value={password} />
        </div>
        
        <button onClick={e => setButtonId(e.target.id)} id="login__button">Login</button>
        <button onClick={e => setButtonId(e.target.id)} id="login__button">Sign up</button>
        </div>}

        {loggedInUser && <p className="login__logged-in">Current user: {loggedInUser}</p>}
        {loggedInUser && <img className="login__img" src={avatarUrl} />}
        {loggedInUser && <button onClick={e => setButtonId(e.target.id)} id="logout__button">Log out</button>}
        
        {showErrorMsg && <p className="login__error">Invalid username/password</p>}
    </form>
  
  );
};

export default Login;*/