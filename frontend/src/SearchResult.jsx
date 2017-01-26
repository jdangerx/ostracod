import React, { Component } from 'react';
import TraitList from './TraitList.jsx';
import { speciesCase } from './utils.js';

class SearchResult extends Component {
  constructor(props) {
    super(props);
    this.state = { expanded: false };
    this.toggle = this.toggle.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  toggle() {
    this.setState({ expanded: !this.state.expanded });
  }

  addToCart(e) {
    e.stopPropagation();
    this.props.addToCart({ name: this.props.name, traits: this.props.traits });
  }

  render() {
    let maybeTraitList = null;
    if (this.state.expanded) {
      maybeTraitList = <TraitList traits={this.props.traits} />;
    }
    const className =
          this.state.expanded ?
          'name expanded' :
          'name collapsed';
    return (
      <div className="SearchResult">
        <div className={className} onClick={this.toggle}>
          {speciesCase(this.props.name)}
          <button onClick={this.addToCart}>Add to Cart</button>
        </div>
        {maybeTraitList}
      </div>
    );
  }
}

export default SearchResult;
