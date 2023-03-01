import { useState } from "react";

const Signup = () => {
const [screenName, setScreenName] = useState('');
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const [passwordConfirm, setPasswordConfirm] = useState('');
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
  }
}

return (<main>
    <h2 className="account__h2">Sign up for a new account</h2>

    {successMsg && !errorMsg && <p className="account__confirmation">Your topic has been added to the list.</p>}
    {errorMsg && <p className="error">{errorMsg}</p>}

    <form id="account__form" onSubmit={handleSubmit}>
        <label className="account__form-label" htmlFor="account__new-name">Screen name</label>
        <input id="account__new-name" type="text" onChange={e => setScreenName(e.target.value)} value={screenName} placeholder="Enter screen name"/>
  
        <label className="account__form-label" htmlFor="account__new-username">Username</label>
        <input id="account__new-username" type="text" onChange={e => setUsername(e.target.value)} value={username} placeholder="Enter username"/>

        <label className="account__form-label" htmlFor="account__new-password">Password *</label>
        <input id="account__new-pasword" type="text" onChange={e => setPassword(e.target.value)} value={password} placeholder="Enter password"/>

        <label className="account__form-label" htmlFor="account__new-password-conf">Confirm password</label>
        <input id="account__new-password-conf" type="text" onChange={e => setPasswordConfirm(e.target.value)} value={passwordConfirm} placeholder="Confirm password"/>

        <label className="account__form-label" htmlFor="account__new-password-conf">Avatar URL <span style={{fontSize: 16}}>(optional)</span></label>
        <input id="account__new-password-conf" type="text" onChange={e => setPasswordConfirm(e.target.value)} value={passwordConfirm} placeholder="Confirm password"/>

        <p style={{margin: '5px 0 0 5px', textAlign: 'left', fontSize: 16}}>*At least 10 characters long, including at least 1 number and 1 capital letter</p>

        <button id="account__submit">Complete sign up</button>
    </form>
</main>);
};

export default Signup;