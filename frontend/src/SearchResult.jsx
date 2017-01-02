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
    return (
      <div className="SearchResult" onClick={this.toggle}>
        <div className="name">{this.props.name}</div>
        {maybeTraitList}
      </div>
    );
  }
}

export default SearchResult;
