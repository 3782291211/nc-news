import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import * as api from '../api';

const DeleteNotification = ( {show, onHide, commentCount, articleId, setApiError } ) => {
const navigate = useNavigate();

const handleDelete = (articleId) => {
return () => {
  api.deleteArticle(articleId).then(() => {
    navigate(`/articles/deleted/${articleId}`);
  }).catch (err => {
    console.log(err);
    setApiError(err.message);
  });
}
}

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header style={{display: 'flex'}} closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        <svg style={{width: '30px', height: '30px', marginRight: '10px', color: '#CC5500'}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-circle-fill" viewBox="0 0 16 16">
  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8 4a.905.905 0 0 0-.9.995l.35 3.507a.552.552 0 0 0 1.1 0l.35-3.507A.905.905 0 0 0 8 4zm.002 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
</svg>
        {commentCount > 0 ? 'Please note: deleting this article will also permanently delete all of its comments.' : 'Just checking...'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 style={{fontSize: '25px'}}>{ commentCount > 0 ? `This article has ${commentCount} comments.` : 'Are you sure you want to delete this article?'}</h4>
        <p>
          { commentCount > 0 ? 'If you delete this article, all comments will be permanently deleted. Are you sure you want to delete the article?' : 'This action is permanent; your deleted article will not be recoverable.'}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button onClick={handleDelete(articleId)}>Delete</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteNotification;