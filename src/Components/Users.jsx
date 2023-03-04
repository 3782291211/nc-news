import { useEffect, useState } from "react";
import * as api from '../api';
import Loading from "./Loading";
import anonymous from '../anonymous.webp';
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const Users = () => {
const [users, setUsers] = useState([]);
const [isLoading, setIsLoading] = useState(false);
const [error, setError] = useState(false);

useEffect(() => {
  setIsLoading(true);
  api.fetchUsers().then(({users}) => {
    setUsers(users);
    setIsLoading(false);
  })
  .catch(err => {
    setIsLoading(false);
    setError(err.message);
  });
}, []);

const handleError = ({ currentTarget }) => {
  currentTarget.onerror = null;
  currentTarget.src = anonymous;
};

if (error) {
  return <p className="error">{error}</p>
} else if (!error && isLoading) {
    return <Loading/>
} else {
 return (
  <main>
  <h2>Users</h2>
    <ul className="users__list">
    {users.map(({username, name, avatar_url}) => {
      return <li className="users__li" key={uuidv4()} >
        <div className="users__user">
        <div>
        <p className="users__details">{username}</p>
        <p className="users__details">{name}</p>
        <Link to={`/articles?author=${username}`} className="users__link">View articles</Link>
        </div>
        <img src={avatar_url || ''} alt={name} onError={handleError}/>
        </div>
      </li>
    })}
    </ul>
  </main>
  );
}
};

export default Users;