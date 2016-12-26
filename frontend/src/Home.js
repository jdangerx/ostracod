import React from 'react';

import placeholder from './esem_placeholder.png';
import Image from './Image.js';
import TextBox from './TextBox.js';

import './home.css';

function Home(_props) {
  const blurb = "This database can be used for ecology, biogeography, evolutionary biology, paleontology, and more!";
  return (
    <div className="Home">
      <Image src={placeholder} alt="A placeholder image." />
      <TextBox header="OstracodDB" body={blurb}/>
    </div>
  );
};

export default Home;
