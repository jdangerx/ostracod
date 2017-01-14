import React from 'react';

import placeholder from './esem_placeholder.png';
import Image from './Image.jsx';
import TextBox from './TextBox.jsx';

import './home.css';

function Home(_props) {
  const blurb = 'This database can be used for ecology, biogeography, ' +
                'evolutionary biology, paleontology, and more!';
  return (
    <div className="Home">
      <div className="LeftColumn">
        <Image src={placeholder} alt="A placeholder image." />
      </div>
      <div className="RightColumn">
        <TextBox header="OstracodDB" body={blurb} />
      </div>
    </div>
  );
}

export default Home;
