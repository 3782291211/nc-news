import 'animate.css';
import { useState } from 'react';

const Home = () => {
  const [hinge, setHinge] = useState(false);

  return (<main>
     {hinge && <p className={hinge && 'animate__animated animate__fadeOut animate__delay-3s'} style={{'fontSize' : '40px', 'marginTop': '90px'}}>Uh oh...</p>}
    <p className={`home__welcome ${hinge && 'animate__animated animate__hinge animate__slower'}`} onMouseEnter={() => {
      setHinge(true);
      setTimeout(() => setHinge(false), 4000);
    }}>Welcome to NC news</p>
   
    <p id="home__intro">Explore articles and read comments posted by Northcoders.</p>
  </main>);
};

export default Home;