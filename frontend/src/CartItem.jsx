import React, { Component } from 'react';
import TraitList from './TraitList.jsx';
import { speciesCase } from './utils.js';

class CartItem extends Component {
  constructor(props) {
    super(props);
    this.removeFromCart = this.removeFromCart.bind(this);
    this.toggle = this.toggle.bind(this);
    this.state = { expanded: false };
  }

  toggle() {
    this.setState({ expanded: !this.state.expanded });
  }

  removeFromCart(e) {
    e.stopPropagation();
    this.props.removeFromCart(this.props.species.name);
  }

  render() {
    let maybeTraitList = null;
    if (this.state.expanded) {
      maybeTraitList = <TraitList traits={this.props.species.traits} />;
    }
    const className =
          this.state.expanded ?
          'name expanded' :
          'name collapsed';
    return (
      <div className="CartItem">
        <div className={className} onClick={this.toggle}>
          {speciesCase(this.props.species.name)}
          <button onClick={this.removeFromCart}>Remove from Cart</button>
        </div>
        {maybeTraitList}
      </div>
    );
  }
}

export default CartItem;
