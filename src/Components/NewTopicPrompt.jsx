import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

const NewTopicPrompt = ({ show, onHide, topic }) => {
const navigate = useNavigate();

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
        {'The topic you have entered does not yet exist in our database.'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4 style={{'fontSize' : '22px'}}>{`To add "${topic}" as a new topic, click the button below and you will be taken to the topic creation page. Otherwise, close this window and continue with the form. You can check the 'Topics' page on this site to find a list of all topics.`}</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide}>Close</Button>
        <Button onClick={() => navigate(`/topics?topic=${topic}`)}>Yes, I want to create a new topic.</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewTopicPrompt;