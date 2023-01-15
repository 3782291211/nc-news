import { useEffect, useState } from "react";
import * as api from '../api';

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
    setError(err.message)
  });
}, []);
console.log(users);
if (error) {
  return <p className="error">{error}</p>
} else if (!error && isLoading) {
    return <p className="users__loading">Fetching users data...</p>
} else {
 return (
  <main>
  <h2>Users</h2>
    <ul className="users__list">
    {users.map(({username, name, avatar_url}) => {
      return <li className="users__user">
        <p>{name}</p>
        <p style={{'fontStyle': 'italic'}}>"{username}"</p>
        <img src={avatar_url} alt={`${name}'s profile picture`} />
      </li>
    })}
    </ul>
  </main>
  );
}
};

export default Users;