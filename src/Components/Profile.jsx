import { useEffect, useState } from "react";
import * as api from '../api';
import Loading from "./Loading";
import anonymous from '../anonymous.webp';
import AccountForm from "./AccountForm";

const Profile = ({loggedInUser}) => {
const [user, setUser] = useState(null);
const [isLoading, setIsLoading] = useState(false);
const [errorMsg, setErrorMsg] = useState(null);

const [formData, setFormData] = useState({screenName: '', username: '', password: '', passwordConfirm: '', avatarUrl: ''});
const {screenName, username, password, passwordConfirm, avatarUrl} = formData;

useEffect(() => {
  setIsLoading(true);
  api.fetchSingleUser(loggedInUser)
  .then(({user}) => {
    setIsLoading(false);
    setUser(user);
  })
  .catch(err => {
    setIsLoading(false);
    if (err.response.data.msg) {
        setErrorMsg(err.response.data.msg);
        setTimeout(() => setErrorMsg(''), 6000);
    }
  });
}, []);

const handleError = ({ currentTarget }) => {
    currentTarget.onerror = null; // prevents looping
    currentTarget.src = anonymous;
  };

const handleSubmit = e => {
  e.preventDefault();
  if ((password || passwordConfirm) && password !== passwordConfirm) {
    setErrorMsg("Passwords do not match.");
    setTimeout(() => setErrorMsg(''), 6000);
  }
};

return (<main style={{marginBottom: 90}}>
     <h2 className="account__h2">Hi {loggedInUser}!</h2>
     {isLoading && <Loading/>}

     {user && <><div style={{width: 'fit-content', margin: '30px auto 50px'}} className="users__user">
      <p>{user.name}</p>
      <p style={{'fontStyle': 'italic'}}>"{user.username}"</p>
      <img src={user.avatar_url || ''} alt={`${user.name}'s profile picture`} onError={handleError}/>
    </div>
    
    <h2 className="account__h2">Update account details</h2>
    {errorMsg && <p className="error">{errorMsg}</p>}
    <AccountForm type="update" formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} isLoading={isLoading}/>
    </>}
</main>)
};

export default Profile;