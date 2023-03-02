import { useEffect, useState } from "react";
import * as api from '../api';
import Loading from "./Loading";
import anonymous from '../anonymous.webp';
import AccountForm from "./AccountForm";

const Profile = ({loggedInUser, setLoggedInUser}) => {
const [user, setUser] = useState(null);
const [isLoadingUser, setIsLoadingUser] = useState(false);
const [isLoadingForm, setIsLoadingForm] = useState(false);
const [successMsg, setSuccessMsg] = useState('');
const [errorMsg, setErrorMsg] = useState(null);
const [rerender, setRerender] = useState(false);

const [formData, setFormData] = useState({screenName: '', username: '', password: '', passwordConfirm: '', avatarUrl: ''});
const {screenName, username, password, passwordConfirm, avatarUrl} = formData;

useEffect(() => {
  setIsLoadingUser(true);
  api.fetchSingleUser(loggedInUser)
  .then(({user}) => {
    setIsLoadingUser(false);
    setUser(user);
  })
  .catch(err => {
    setIsLoadingUser(false);
    if (err.response.data.msg) {
        setErrorMsg(err.response.data.msg);
        setTimeout(() => setErrorMsg(''), 6000);
    }
  });
}, [rerender]);

const handleError = ({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src = anonymous;
  };

const handleSubmit = e => {
  e.preventDefault();
  if ((password || passwordConfirm) && password !== passwordConfirm) {
    setErrorMsg("Passwords do not match.");
    setTimeout(() => setErrorMsg(''), 6000);
  } else if (password && passwordConfirm && password === passwordConfirm && (password.length < 10 || !/\d+/.test(password) || !/[A-Z]+/.test(password))) {
    setErrorMsg("Password does not meet requirements.");
    setTimeout(() => setErrorMsg(''), 6000);
  } else {
    setIsLoadingForm(true);
    api.updateUserDetails(loggedInUser, username, password, screenName, avatarUrl)
    .then(({user}) => {
        setIsLoadingForm(false);
        setFormData({screenName: '', username: '', password: '', passwordConfirm: '', avatarUrl: ''});
        setRerender(!rerender);
        setLoggedInUser(user.username);
        setSuccessMsg("Update completed.");
        setTimeout(() => setSuccessMsg(''), 6000);
    })
    .catch(err => {
      setIsLoadingForm(false);
      setFormData({screenName: '', username: '', password: '', passwordConfirm: '', avatarUrl: ''});
      if (err.response.data) {
        setErrorMsg(err.response.data.msg);
        setTimeout(() => setErrorMsg(''), 6000);
      };
    });
  };
};

return (<main style={{marginBottom: 90}}>
     <h2 className="account__h2">Hi {loggedInUser}!</h2>
     {isLoadingUser && <Loading/>}

     {user && <><div style={{width: 'fit-content', margin: '30px auto 50px'}} className="users__user">
      <p>{user.name}</p>
      <p style={{'fontStyle': 'italic'}}>"{user.username}"</p>
      <img src={user.avatar_url || ''} alt={user.name} onError={handleError}/>
    </div>
    
    <h2 className="account__h2">Update account details</h2>
    {errorMsg && <p className="error">{errorMsg}</p>}
    {successMsg && !errorMsg && <p className="account__confirmation">{successMsg}</p>}
    <AccountForm type="update" formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} isLoading={isLoadingForm}/>
    </>}
</main>)
};

export default Profile;