import { useEffect, useState } from "react";
import * as api from '../api';

const Users = ({setLoggedInUser, setAvatarUrl, loggedInUser}) => {
const [users, setUsers] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(false);
const [showLoggedInMsg, setShowLoggedInMsg] = useState(false);

useEffect(() => {
    setIsLoading(true);
  api.fetchUsers().then(({users}) => {
    setUsers(users);
    setIsLoading(false);
  })
  .catch(err => {
    setIsLoading(false);
    setError(err.message)
  });
}, []);

const handleClick = (username, avatar_url) => () => {
  setLoggedInUser(username);
  setAvatarUrl(avatar_url);
  setShowLoggedInMsg(true);
  window.scrollTo(0, 0);
  setTimeout(() => setShowLoggedInMsg(false), 6000);
};

if (error) {
  return <p className="error">{error}</p>
} else if (!error && isLoading) {
    return <p className="users__loading">Fetching users data...</p>
} else {
 return (
  <main>
  <h2>Users</h2>
  {showLoggedInMsg && <p className="login__confirmation">You are now logged in as {loggedInUser}</p>}
    <ul className="users__list">
    {users.map(({username, name, avatar_url}) => {
      return <li className="users__li" key={avatar_url} >
        <div className="users__user">
        <p>{name}</p>
        <p style={{'fontStyle': 'italic'}}>"{username}"</p>
        <img src={avatar_url} alt={`${name}'s profile picture`} />
        </div>
        <button className="users__change" onClick={handleClick(username, avatar_url)}>Sign in as user</button>
      </li>
    })}
    </ul>
  </main>
  );
}
};

export default Users;