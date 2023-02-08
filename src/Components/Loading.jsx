import { useEffect } from 'react';
import { useState } from 'react';
import Spinner from 'react-bootstrap/Spinner';

function Loading() {
const [index, setIndex] = useState(0);
const messages = [
    'Requesting data from server.', 
    'Waiting for response from server.', 
    'Receiving data packets from server.',
    'Almost done...',
    'Nearly there...',
    'Server is taking longer than expected to respond. Hang in there!',
    'Just a few more moments...']
    
useEffect(() => {
if (index < 6) {
  setTimeout(() => setIndex(index + 1), 4000);
};
}, [index]);

return (
<div className="loading">
<p className="slanted">Loading...</p>
<Spinner animation="grow" />
<p style={{margin: '0 auto', width: '80%'}}>{messages[index]}</p>
</div>
);
};

export default Loading;