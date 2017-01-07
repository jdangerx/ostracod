import React, { Component } from 'react';
import TraitList from './TraitList.js';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    let maybeTraitList = null;
    if (this.state.expanded) {
      maybeTraitList = <TraitList traits={this.props.traits} />;
    }
    const className =
          this.state.expanded ?
          "name expanded" :
          "name collapsed";
    return (
      <div className="SearchResult">
        <div className={className} onClick={this.toggle}>{this.props.name}</div>
        {maybeTraitList}
      </div>
    );
  }
}

export default SearchResult;
