import { useState } from "react";
import * as api from '../api';
import AccountForm from "./AccountForm";

const Signup = () => {
const [formData, setFormData] = useState({screenName: '', username: '', password: '', passwordConfirm: '', avatarUrl: ''});
const {screenName, username, password, passwordConfirm, avatarUrl} = formData;

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
        setFormData({screenName: '', username: '', password: '', passwordConfirm: '', avatarUrl: ''});
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

    <AccountForm type="signup" formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} isLoading={isLoading}/>
</main>);
};

export default Signup;