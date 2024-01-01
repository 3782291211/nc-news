import { useContext, useState } from "react";
import * as api from '../api';
import Spinner from 'react-bootstrap/Spinner';
import { UserContext } from "../Contexts/CurrentUser";

const Login = ({setRerender}) => {
const {loggedInUser, setLoggedInUser} = useContext(UserContext);
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [successMsg, setSuccessMsg] = useState('');
const [errorMsg, setErrorMsg] = useState('');

const loginAsSampleUser = () => {
  handleSubmit("weegembump", "password123ABC");
}

const loginAsUser = e => {
  e.preventDefault();
  handleSubmit(username, password);
}

const handleSubmit = (username, password) => {
  setErrorMsg('');
  if (loggedInUser) {
    setSuccessMsg("You're already logged in!");
    return;
  }
  if (!username || !password) {
    setErrorMsg("Please complete all required fields.");
    setTimeout(() => setErrorMsg(''), 6000);
  } else {
    setIsLoading(true);
    api.login(username, password)
    .then(({msg}) => {
        setIsLoading(false);
        setUsername('');
        setPassword('');
        setSuccessMsg(msg);
        setLoggedInUser(username);
        setRerender(prev => !prev);
    })
    .catch(err => {
        setIsLoading(false);
        if (err.response.data.msg) {
            setErrorMsg(err.response.data.msg);
            setTimeout(() => setErrorMsg(''), 6000);
        } else {
          setErrorMsg(err.response.data);
          setTimeout(() => setErrorMsg(''), 6000);
        }
    })
  }
};

return (<main>
    <h2 className="account__h2">Log in to your account</h2>
    <div className="account__tip">
      <p>Click the button below to login as a <strong>sample user</strong>.</p>
      <button onClick={loginAsSampleUser}>Login as sample user</button>
    </div>
    <p style={{fontSize: "24px"}}>Or, you can login with your own account.</p>

    {successMsg && !errorMsg && <p className="account__confirmation">{successMsg}</p>}
    {errorMsg && <p className="error">{errorMsg}</p>}

    <form style={{marginBottom: '60px'}} id="account__form" onSubmit={loginAsUser}>
        <label className="account__form-label" htmlFor="account__new-username">Username</label>
        <input id="account__new-username" type="text" onChange={e => setUsername(e.target.value)} value={username} placeholder="Enter username"/>

        <label className="account__form-label" htmlFor="account__new-password">Password</label>
        <input id="account__new-pasword" type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="Enter password"/>

        <button disabled={isLoading} style={isLoading ? {backgroundColor: 'blue', color: 'yellow'} : {}} id="account__submit">{!isLoading ? 'Login' : <><Spinner style={{width: 25, height: 25, fontSize: 15, margin: '0 7px -3px 0'}} animation="border" />Loading...</>}</button>
    </form>
</main>);
};

export default Login;