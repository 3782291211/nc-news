import Spinner from 'react-bootstrap/Spinner';

const AccountForm = ({type, handleSubmit, isLoading, formData, setFormData}) => {

const {screenName, username, password, passwordConfirm, avatarUrl} = formData;

  return (<form id="account__form" onSubmit={handleSubmit}>
  {type === "update" && <p style={{margin: 0, border: '2px solid #1c1f22', fontSize: 24, padding: '0 7px 2px', textAlign: 'left'}}>Update as many or as few fields as you like.</p>}
  <label className="account__form-label" htmlFor="account__change-name">Screen name</label>
  <input id="account__change-name" type="text" onChange={e => setFormData(prev => ({...prev, screenName: e.target.value}))} value={screenName} placeholder={type === 'update' ? "Enter new screen name" : "Enter screen name"}/>

  <label className="account__form-label" htmlFor="account__new-username">Username</label>
  <input id="account__new-username" type="text" onChange={e => setFormData(prev => ({...prev, username: e.target.value}))} value={username} placeholder={type === 'update' ? "Enter new username" : "Enter username"}/>

  <label className="account__form-label" htmlFor="account__new-password">Password *</label>
  <input id="account__new-pasword" type="password" onChange={e => setFormData(prev => ({...prev, password: e.target.value}))} value={password} placeholder={type === 'update' ? "Enter new password" : "Enter password"}/>

  <label className="account__form-label" htmlFor="account__new-password-conf">Confirm password</label>
  <input id="account__new-password-conf" type="password" onChange={e => setFormData(prev => ({...prev, passwordConfirm: e.target.value}))} value={passwordConfirm} placeholder={type === 'update' ? "Confirm new password" : "Confirm password"}/>

  <label className="account__form-label" htmlFor="account__new-avatar">Avatar URL {type === "signup" && <span style={{fontSize: 16}}>(optional)</span>}</label>
  <input id="account__new-avatar" type="text" onChange={e => setFormData(prev => ({...prev, avatarUrl: e.target.value}))} value={avatarUrl} placeholder={type === 'update' ? "Enter new avatar URL address" : "Enter avatar URL address"}/>

  <p style={{margin: '5px 0 0 5px', textAlign: 'left', fontSize: 16}}>*At least 10 characters long, including at least 1 number and 1 capital letter</p>

  {type === "update" && <button disabled={isLoading || (screenName + username + password + passwordConfirm + avatarUrl).length === 0} style={isLoading ? {backgroundColor: 'blue', color: 'yellow'} : {}} id="account__submit">{!isLoading ? 'Submit changes' : <><Spinner style={{width: 25, height: 25, fontSize: 15, margin: '0 7px -3px 0'}} animation="border" />Loading...</>}</button>}

  {type === "signup" && <button disabled={isLoading} style={isLoading ? {backgroundColor: 'blue', color: 'yellow'} : {}} id="account__submit">{!isLoading ? 'Complete sign up' : <><Spinner style={{width: 25, height: 25, fontSize: 15, margin: '0 7px -3px 0'}} animation="border" />Loading...</>}</button>}
</form>);
};

export default AccountForm;