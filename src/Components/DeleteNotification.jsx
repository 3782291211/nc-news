import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import * as api from '../api';

const DeleteNotification = ( {show, onHide, commentCount, articleId, setApiError } ) => {
const navigate = useNavigate();

const handleDelete = ({articleId}) => {
    console.log(articleId);
return () => {
  api.deleteArticle(articleId).then(() => {
    navigate(`/articles/deleted/${articleId}`);
  }).catch (err => {
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
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
        {commentCount > 0 ? '⚠ Warning: deleting this article will also permanently delete all of its comments.' : 'Just checking...'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{ commentCount > 0 ? `This article has ${commentCount} comments` : 'Are you sure you want to delete this article?'}</h4>
        <p>
          { commentCount > 0 ? 'If you delete this article, all comments will be permanently deleted. Are you sure you want to delete the article?' : 'This action is permanenet; your deleted article will not be recoverable.'}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button onClick={handleDelete(articleId)}>Yes, I want to delete this article</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteNotification;