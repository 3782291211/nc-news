import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import * as api from '../api';
import { UserContext } from '../Contexts/CurrentUser';

const DeleteAccount = ( {show, onHide, setDeleteError } ) => {
const navigate = useNavigate();
const [isDeleted, setIsDeleted] = useState(false);

const {loggedInUser, setLoggedInUser} = useContext(UserContext);

const handleDelete = e => {
  api.deleteUser(loggedInUser)
  .then(() => {
    setIsDeleted(true);
    setLoggedInUser('');
    window.localStorage.setItem('NC_NEWS_APP', '');
  })
  .catch (err => {
    setDeleteError(err);
  });
}

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop={isDeleted ? 'static' : true}
    >
      <Modal.Header style={{display: 'flex'}} closeButton={!isDeleted}>
      <Modal.Title id="contained-modal-title-vcenter">{isDeleted ? "Account deleted." : "⚠️ Warning: deleting your account is a permanent action and cannot be reversed"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 style={{fontSize: '24px'}}>{isDeleted ? "You're all done. Your account has been succesfully deleted." : "Are you sure you want to delete your account?"}</h4>
        <p>{isDeleted ? "Feel free to continue browsing the website or make a new account!" : "This will also delete any articles and comments that you've posted."}</p>
      </Modal.Body>
      <Modal.Footer>
        {!isDeleted && <Button onClick={onHide}>Close</Button>}

        {!isDeleted && <Button style={{backgroundColor: '#EE2121', color: 'white', fontWeight: 'bold'}} onClick={handleDelete}>Delete account</Button>}

        {isDeleted && <Button onClick={() => {
          navigate('/');
        }}>Back to home</Button>}
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteAccount;