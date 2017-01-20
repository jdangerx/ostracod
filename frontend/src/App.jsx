import React, { Component } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Home from './Home.jsx';
import Search from './Search.jsx';
import Cart from './Cart.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { traitCodings: {}, cart: [] };
    fetch('http://localhost:5000/trait_codings')
      .then((r) => r.json())
      .then((j) => this.setState({ traitCodings: j }));
    this.addToCart = this.addToCart.bind(this);
    this.removeFromCart = this.removeFromCart.bind(this);
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
    return `${headerLine.concat(dataLines).join('\n')}\n`;
  }

  addToCart(species) {
    const cart = this.state.cart;
    if (cart.find((inCart) => inCart.name === species.name) === undefined) {
      const newCart = cart.slice().concat([species]);
      this.setState({ cart: newCart });
    }
  }

  removeFromCart(name) {
    const indexOfSpecies = this.state.cart.findIndex((species) => species.name === name);
    if (indexOfSpecies !== -1) {
      const newCart = this.state.cart.slice();
      newCart.splice(indexOfSpecies, 1);
      this.setState({ cart: newCart });
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
            addToCart={this.addToCart}
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
          <Cart
            species={this.state.cart}
            cartData={this.state.cartData}
            removeFromCart={this.removeFromCart}
          />
        </TabPanel>
      </Tabs>
    );
  }
}

export default App;