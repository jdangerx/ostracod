import React, { Component } from 'react';
import CartItem from './CartItem.jsx';
import './cart.css';

class Cart extends Component {
  recordsToCsv(records) {
    if (records.length === 0) {
      return '';
    }
    const headers = Object.keys(records[0]);
    const dataRows = records.map((record) =>
      headers.map((header) => record[header] || '')
    );
    const headerLine = [headers.map((h) => `"${h}"`).join(',')];
    const dataLines = dataRows.map((row) =>
      row.map((cell) => `"${cell}"`).join(','));
    return `${headerLine.concat(dataLines).join('\n')}\n`;
  }


  render() {
    const list = this.props.species.map(
      (species) =>
        (<CartItem
           key={species.name}
           species={species}
           removeFromCart={this.props.removeFromCart}
        />)
    );

    const csv = this.recordsToCsv(this.props.species);
    const cartData =
      csv ?
      `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}` :
      '';

    const downloadButton = (
      <a
        href={cartData}
        download="cart.csv"
      >
        Download a CSV of these species!
      </a>
    );

    return (
      <div className="Cart">
        { list.length === 0 ? 'Your cart is empty!' : downloadButton }
        <div className="CartItems">
          { list }
        </div>
      </div>
    );
  }
}

export default Cart;
