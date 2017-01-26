import React, { Component } from 'react';
import CartItem from './CartItem.jsx';
import './cart.css';

class Cart extends Component {
  recordsToCsv(records, key) {
    if (records.length === 0) {
      return '';
    }
    const headers = Object.keys(records[0]);
    const dataRows = records.map((record) => {
      return headers.map((header) => record[header][key] || '');}
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

    const cartRecords = this.props.species.map(
      ({ name, traits }) => {
        const record = {};
        record.name = name;
        traits.forEach(({ name: traitName, info }) => { record[traitName] = info; });
        return record;
        }
    );
    const traitsCsv = this.recordsToCsv(cartRecords, 'value');
    const commentsCsv = this.recordsToCsv(cartRecords, 'comments');
    const traitsData =
      traitsCsv ?
      `data:text/csv;charset=utf-8,${encodeURIComponent(traitsCsv)}` :
      '';

    const commentsData =
      commentsCsv ?
      `data:text/csv;charset=utf-8,${encodeURIComponent(commentsCsv)}` :
      '';

    const downloadTraitsButton = (
      <div className="DownloadButton">
        <a href={traitsData} download="cart_OstracodDB_traits.csv" >
          Download a CSV of these species' trait values
        </a>
      </div>
    );
    const downloadCommentsButton = (
      <div className="DownloadButton">
        <a href={commentsData} download="cart_OstracodDB_comments.csv" >
          Download a CSV of these species' trait comments
        </a>
      </div>
    );

    const downloadButtons = (
      <div className="DownloadButtonContainer">
        {downloadTraitsButton}
        {downloadCommentsButton}
      </div>
    );

    return (
      <div className="Cart">
        { list.length === 0 ? 'Your cart is empty!' : downloadButtons }
        <div className="CartItems">
          { list }
        </div>
      </div>
    );
  }
}

export default Cart;
