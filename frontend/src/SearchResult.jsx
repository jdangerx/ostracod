import React, { Component } from 'react';
import TraitList from './TraitList.jsx';

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
    const nameField = { name: this.props.name };
    const traitFields = this.props.traits.reduce(
      (fields, trait) => {
        const field = {};
        field[trait.name] = trait.info.value;
        return Object.assign(fields, field);
      }, {}
    );
    e.stopPropagation();
    this.props.addToCart(Object.assign(nameField, traitFields));
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
          {this.props.name}
          <button onClick={this.addToCart}>Add to Cart!</button>
        </div>
        {maybeTraitList}
      </div>
    );
  }
}

export default SearchResult;
