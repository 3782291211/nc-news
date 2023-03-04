import { useContext, useEffect, useState } from "react";
import * as api from '../api';
import Loading from "./Loading";
import Spinner from 'react-bootstrap/Spinner';
import anonymous from '../anonymous.webp';
import AccountForm from "./AccountForm";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import DeleteAccount from "./DeleteAccount";
import { UserContext } from "../Contexts/CurrentUser";

const Profile = ({ rerender, setRerender}) => {
const {loggedInUser: currentUser, setLoggedInUser} = useContext(UserContext);
const {username : loggedInUser} = useParams();
const [user, setUser] = useState(null);
const [isLoadingUser, setIsLoadingUser] = useState(false);
const [isLoadingForm, setIsLoadingForm] = useState(false);
const [successMsg, setSuccessMsg] = useState('');
const [errorMsg, setErrorMsg] = useState(null);
const [formError, setFormError] = useState(null);

const [articles, setArticles] = useState('');
const [isLoadingArticles, setIsLoadingArticles] = useState(false);
const [articlesError, setArticlesError] = useState(false);
const navigate = useNavigate();

const [showDeleteWarning, setShowDeleteWarning] = useState(false);
const [deleteError, setDeleteError] = useState(false);

const [formData, setFormData] = useState({screenName: '', username: '', password: '', passwordConfirm: '', avatarUrl: ''});
const {screenName, username, password, passwordConfirm, avatarUrl} = formData;

useEffect(() => {
  if (currentUser === loggedInUser) {
    setErrorMsg(false);
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
  } else {
    setErrorMsg("Page not found.");
  }
}, [rerender]);

useEffect(() => {
if (currentUser === loggedInUser) {
  setErrorMsg(false);
  setIsLoadingArticles(true);
  api.fetchArticles(null, 'created_at', 'DESC', 1, 10, loggedInUser)
  .then(({articles}) => {
    setIsLoadingArticles(false);
    setArticles(articles);
  })
  .catch(() => {
    setIsLoadingArticles(false);
    setArticlesError(true);
  });
} else {
  setErrorMsg("Page not found.");
};
}, []);

const handleError = ({ currentTarget }) => {
    currentTarget.onerror = null;
    currentTarget.src = anonymous;
  };

const handleSubmit = e => {
  e.preventDefault();
  if ((password || passwordConfirm) && password !== passwordConfirm) {
    setFormError("Passwords do not match.");
    setTimeout(() => setFormError(''), 6000);
  } else if (password && passwordConfirm && password === passwordConfirm && (password.length < 10 || !/\d+/.test(password) || !/[A-Z]+/.test(password))) {
    setFormError("Password does not meet requirements.");
    setTimeout(() => setFormError(''), 6000);
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
        setFormError(err.response.data.msg);
        setTimeout(() => setFormError(''), 6000);
      };
    });
  };
};

return (<main>
     {!errorMsg && <h2 className="account__h2">Hi {loggedInUser}!</h2>}
     {isLoadingUser && <Loading/>}
     {deleteError && <p className="error">{deleteError}</p>}
     {errorMsg && <p className="error">{errorMsg}</p>}

     {user && <><div style={{width: '230px', margin: '30px auto 50px'}} className="users__user-profile">
      <p className="users__details --bold">{user.username}</p>
      <p className="users__details">{user.name}</p>
      <img style={{height: '220px'}} src={user.avatar_url || ''} alt={user.name} onError={handleError}/>
    </div>
    
    <h2 className="account__h2">Update account details</h2>
    {formError && <p className="error">{formError}</p>}
    {successMsg && !formError && <p className="account__confirmation">{successMsg}</p>}
    <AccountForm type="update" formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} isLoading={isLoadingForm}/>

    <h2 className="account__h2">{isLoadingArticles ? <><Spinner style={{width: 25, height: 25, fontSize: 15, margin: '20px 10px 2px 0'}} animation="border" />Loading articles...</> : articles.length ? 'My recent articles' : 'You haven\'t posted any articles yet.'}</h2>

    {articlesError && <p style={{maxWidth: '600px'}} className="error">Unable to load articles.</p>}

    <ul>
      {articles && articles.map(({article_id, title, topic, created_at, comment_count}) => {
        return <li style={{border: 'none', cursor: 'pointer', maxWidth: '800px'}} key={article_id} onClick={() => navigate(`/articles/${article_id}`)}>
        <p style={{borderTopLeftRadius: '10px', borderTopRightRadius: '10px'}} className="comment-card__details"><strong>{title}</strong></p>
        <p className="comment-card__details --overflow">&#x1F516;<em>in</em> "{topic}"</p>
        <p style={{borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px'}} className="comment-card__details"> 📆 {new Date(created_at).toString().slice(4, 15)} <span className="comment-card__votes">&#x1F4AC; Comments: {comment_count}</span></p>
        </li>
      })}
    </ul>

    <button className="articles__new" onClick={() => navigate('/articles/new')}>Post new article</button>

    <Button style={{width: '183px'}} className="article__delete" variant="primary" onClick={() => setShowDeleteWarning(true)}>
      Delete account  
      </Button>

      <DeleteAccount
        show={showDeleteWarning}
        onHide={() => setShowDeleteWarning(false)}
        setDeleteError={setDeleteError}
      />
    </>}

    {!errorMsg && <button style={{margin: '20px auto 60px'}} id="button__top" onClick={() => window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
      })}>Back to top</button>}
</main>)
};

export default Profile;