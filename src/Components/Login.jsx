import { useEffect, useState } from "react";
import * as api from '../api';

const Login = ({setLoggedInUser, loggedInUser}) => {
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [users, setUsers] = useState([]);
const [showErrorMsg, setShowErrorMsg] = useState(false);
const [buttonId, setButtonId] = useState('');

useEffect(() => {
  api.fetchUsers().then(({users}) => setUsers(users))
}, []);

const handleSubmit = e => {
  e.preventDefault();
  if (buttonId === 'logout__button') {
    setLoggedInUser('');
  } else if (users.map(({username}) => username).includes(username) && password === 'password') {
    setLoggedInUser(username);
    setUsername('');
    setPassword('');
  } else {
    setShowErrorMsg(true);
    setTimeout(() => setShowErrorMsg(false), 6000);
  }
};

  return (
    <form id="login__form" onSubmit={handleSubmit}>
       
        {!loggedInUser && <div>
        <label htmlFor="username"> Username </label>
        <input id="username" type="text" onChange={e => setUsername(e.target.value)} placeholder="username" value={username}/>
       
        <label htmlFor="password"> Password  </label>
        <input id="password" type="password" onChange={e => setPassword(e.target.value)} placeholder="password" value={password} />

        <button onClick={e => setButtonId(e.target.id)} id="login__button">Login</button>
        </div>}

        {loggedInUser && <p className="login__logged-in">Current user: {loggedInUser}</p>}
        
        {loggedInUser && <button onClick={e => setButtonId(e.target.id)} id="logout__button">Log out</button>}
        
        {showErrorMsg && <p className="login__error">Invalid username/password</p>}
    </form>
  
  );
};

export default Login;