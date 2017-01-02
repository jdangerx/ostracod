import React, { Component } from 'react';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ expanded: !this.state.expanded });
  }

  traitOption(trait) {
    const checkboxes = ['0', '1', '2'].map(
      function(code) {
        if (!trait.info[code]) {
          return null;
        }
        return (
          <span key={trait.name + code} className="TraitOption">
            {trait.info[code]}
          </span>);
      }
    ).filter((x) => x !== null);

    return (
      <div key={trait.name} className="TraitOption">
        {trait.info['long name']}: {checkboxes}
      </div>
    );
  }

  render() {
    const traitOptionsToggle = <div className="TraitOptionsToggle" onClick={this.toggle}>Filter by Traits</div>;
    let traitOptions = null;
    if (this.state.expanded) {
      traitOptions = <div className="TraitOptions">{this.props.traitCodings.map(this.traitOption)}</div>;
    }
    return (
      <div className="SearchForm">
        <input type="text" placeholder="Species Name" onChange={this.props.handleNameChange}/>
        {traitOptionsToggle}
        {traitOptions}
      </div>
    );
  }
}

export default SearchForm;
