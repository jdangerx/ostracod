import React, { Component }  from 'react';
import { titleCase } from './utils.js';

class TraitCheckbox extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.toggleTraitFilter(this.props.trait.name, this.props.code);
  }

  render() {
    const className =
          this.props.selected ?
          "TraitCheckbox selected" :
          "TraitCheckbox";
    return (
      <div className={className} onClick={this.handleChange}>
        {titleCase(this.props.trait.info[this.props.code])}
      </div>);
  }
}


class TraitOption extends Component {
  render() {
    const checkboxes = ['0', '1', '2'].map(
      function(code) {
        const selected = this.props.selected || [];
        if (!this.props.trait.info[code]) {
          return null;
        }
        return <TraitCheckbox
                 key={this.props.trait.name + code}
                 trait={this.props.trait}
                 code={code}
                 toggleTraitFilter={this.props.toggleTraitFilter}
                 selected={selected.includes(code)}
               />;
      }.bind(this)
    ).filter((x) => x !== null);

    return (
      <div key={this.props.trait.name} className="TraitOption">
        {checkboxes}
      </div>
    );
  }
}

export default TraitOption;
