import React from 'react';

import Image from './Image.jsx';
import placeholder from './esem_placeholder.png';
import { titleCase } from './utils.js';

import './traitinfo.css';

function TraitInfo(props) {
  const defs = props.traitCodings.map(
    ({ info }) => {
      const longName = info["long name"];
      const description = info["description"];
      return (
        <div className="TraitDefinition" key={longName}>
          <div className="name">
            <h4>{titleCase(longName)}</h4>
          </div>
          <div className="def">
            {description}
          </div>
        </div>
      );
    }
  );
  return (
    <div className="TraitInfo">
      <div className="column">
        <Image src={placeholder} alt="A placeholder image." />
      </div>
      <div className="column">
        {defs}
      </div>
    </div>
  );
}

export default TraitInfo;
