import React, { Component } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Home from './Home.jsx';
import Search from './Search.jsx';
import Cart from './Cart.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { traitCodings: {}, cart: [], cartData: '' };
    fetch('http://localhost:5000/trait_codings')
      .then((r) => r.json())
      .then((j) => this.setState({ traitCodings: j }));
  }

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
    return headerLine.concat(dataLines).join('\n') + '\n';
  }

  addToCart(species) {
    const cart = this.state.cart;
    if (cart.find((inCart) => inCart.name === species.name) === undefined) {
      const newCart = cart.concat([species]);
      const cartData =
        `data:text/csv;charset=utf-8,${encodeURIComponent(this.recordsToCsv(newCart))}`;
      this.setState({ cart: newCart, cartData });
    }
  }

  render() {
    return (
      <Tabs>
        <TabList>
          <Tab>Home</Tab>
          <Tab>Search</Tab>
          <Tab>Trait Info</Tab>
          <Tab>Species Upload</Tab>
          <Tab>Cart</Tab>
        </TabList>
        <TabPanel>
          <Home />
        </TabPanel>
        <TabPanel>
          {/* Search */}
          <Search
            traitCodings={this.state.traitCodings}
            addToCart={this.addToCart.bind(this)}
          />
        </TabPanel>
        <TabPanel>
          {/* Trait Info */}
          Trait Info - we ain't got no datas
        </TabPanel>
        <TabPanel>
          {/* Species Upload Info */}
          Species Upload - coming soon!
        </TabPanel>
        <TabPanel>
          {/* Cart */}
          <Cart species={this.state.cart} cartData={this.state.cartData} />
        </TabPanel>
      </Tabs>
    );
  }
}

export default App;
