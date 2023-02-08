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
    'Just a few more moments...',
    'It\'s not broken, it\'s just really slow.',
    'Loading'
  ];
    
useEffect(() => {
if (index < 4) {
  setTimeout(() => setIndex(index + 1), 4000);
} else if (index < 8) {
  setTimeout(() => setIndex(index + 1), 6000);
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