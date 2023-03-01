import { useState } from "react";
import * as api from '../api';
import Spinner from 'react-bootstrap/Spinner';

const Signup = () => {
const [screenName, setScreenName] = useState('');
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [passwordConfirm, setPasswordConfirm] = useState('');
const [avatarUrl, setAvatarUrl] = useState('');
const [isLoading, setIsLoading] = useState(false);
const [successMsg, setSuccessMsg] = useState('');
const [errorMsg, setErrorMsg] = useState('');

const handleSubmit = e => {
  e.preventDefault();
  if (!screenName || !username || !password || !passwordConfirm) {
    setErrorMsg("Please complete all required fields before submitting.");
    setTimeout(() => setErrorMsg(''), 6000);
  } else if (password !== passwordConfirm) {
    setErrorMsg("Passwords do not match.");
    setTimeout(() => setErrorMsg(''), 6000);
  } else {
    setIsLoading(true);
    api.signup(screenName, username, password, avatarUrl)
    .then(() => {
        setIsLoading(false);
        setScreenName('');
        setUsername('');
        setPassword('');
        setPasswordConfirm('');
        setAvatarUrl('');
        setSuccessMsg("You've successfully created a new account. You can now sign in with your username and password.");
    })
    .catch(err => {
        setIsLoading(false);
        if (err.response.data.msg) {
            setErrorMsg(err.response.data.msg);
            setTimeout(() => setErrorMsg(''), 6000);
        }
    })
  }
}

return (<main>
    <h2 className="account__h2">Sign up for a new account</h2>

    {successMsg && !errorMsg && <p className="account__confirmation">{successMsg}</p>}
    {errorMsg && <p className="error">{errorMsg}</p>}

    <form id="account__form" onSubmit={handleSubmit}>
        <label className="account__form-label" htmlFor="account__new-name">Screen name</label>
        <input id="account__new-name" type="text" onChange={e => setScreenName(e.target.value)} value={screenName} placeholder="Enter screen name"/>
  
        <label className="account__form-label" htmlFor="account__new-username">Username</label>
        <input id="account__new-username" type="text" onChange={e => setUsername(e.target.value)} value={username} placeholder="Enter username"/>

        <label className="account__form-label" htmlFor="account__new-password">Password *</label>
        <input id="account__new-pasword" type="password" onChange={e => setPassword(e.target.value)} value={password} placeholder="Enter password"/>

        <label className="account__form-label" htmlFor="account__new-password-conf">Confirm password</label>
        <input id="account__new-password-conf" type="password" onChange={e => setPasswordConfirm(e.target.value)} value={passwordConfirm} placeholder="Confirm password"/>

        <label className="account__form-label" htmlFor="account__new-avatar">Avatar URL <span style={{fontSize: 16}}>(optional)</span></label>
        <input id="account__new-avatar" type="text" onChange={e => setAvatarUrl(e.target.value)} value={avatarUrl} placeholder="Enter avatar URL address"/>

        <p style={{margin: '5px 0 0 5px', textAlign: 'left', fontSize: 16}}>*At least 10 characters long, including at least 1 number and 1 capital letter</p>

        <button disabled={isLoading} style={isLoading ? {backgroundColor: 'blue', color: 'yellow'} : {}} id="account__submit">{!isLoading ? 'Complete sign up' : <><Spinner style={{width: 25, height: 25, fontSize: 15, margin: '0 7px -3px 0'}} animation="border" />Loading...</>}</button>
    </form>
</main>);
};

export default Signup;