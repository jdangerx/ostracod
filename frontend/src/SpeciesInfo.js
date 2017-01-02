import React, { Component } from 'react';

import placeholder from './esem_placeholder.png';
import Image from './Image.js';
import TraitList from './TraitList.js';

import './home.css';

class SpeciesInfo extends Component {
  constructor(props) {
    super(props);
    this.state = props;
    this.updateDisplaySpecies = this.updateDisplaySpecies.bind(this);
  }

  updateDisplaySpecies() {
    // make an api call here!
    this.setState({
      species: 'hello',
      traits: [
        { name: 'Caudal Process', value: 'Large' },
        { name: 'Bingo bango', value: 'Boingo' },
      ],
    });
  }

  render() {
    let infoPanel;
    if (this.state.species) {
      infoPanel = (
        <div className="InfoPanel">
          <h2>{this.state.species}</h2>
          <TraitList traits={this.state.traits} />
        </div>
      );
    } else {
      infoPanel = (
        <div className="InfoPanel">
          <h2>You have not picked a species yet!</h2>
          <button onClick={this.updateDisplaySpecies}>click</button>
        </div>
      );
    }

    return (
      <div className="SpeciesInfo">
        <div className="LeftColumn">
          <Image src={placeholder} alt="A placeholder image." />
        </div>
        <div className="RightColumn">
          {infoPanel}
        </div>
      </div>
    );
  }
}

export default SpeciesInfo;
