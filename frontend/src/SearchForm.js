import React, { Component } from 'react';

import TraitOption from './TraitOption.jsx';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const traitOptionsToggle = <div className="TraitOptionsToggle" onClick={this.toggle}>Filter by Traits</div>;
    let traitOptions = null;
    if (this.state.expanded) {
      traitOptions = this.props.traitCodings.map((trait) =>
        <TraitOption
          key={trait.name}
          trait={trait}
          toggleTraitFilter={this.props.toggleTraitFilter}
          selected={this.props.selectedTraits[trait.name]}
        />);
    }
    return (
      <div className="SearchForm">
        <input type="text" placeholder="Species Name" onChange={this.props.handleNameChange}/>
        {traitOptionsToggle}
        <div className="TraitOptions">
          {traitOptions}
        </div>
      </div>
    );
  }
}

export default SearchForm;
