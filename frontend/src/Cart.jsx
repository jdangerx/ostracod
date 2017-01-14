import React, { Component } from 'react';

class Cart extends Component {
  render() {
    const list = this.props.species.map(
      (species) =>
        <div key={species.name}>
          {species.name}
        </div>
    );
    return (
      <div className="Cart">
        <a href={this.props.cartData} download="cart.csv">Download these species!</a>
        <div className="CartItems">
          {list}
        </div>
      </div>
    );
  }
}

export default Cart;
