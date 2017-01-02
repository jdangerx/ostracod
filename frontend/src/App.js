import React, { Component } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Home from './Home.js';
import Search from './Search.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {traitCodings: {}}
    fetch('http://localhost:5000/trait_codings')
      .then((r) => r.json())
      .then((j) => this.setState({ traitCodings: j }));
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
          <Search traitCodings={this.state.traitCodings}/>
        </TabPanel>
        <TabPanel>
          Trait Info - we ain't got no datas
        </TabPanel>
        <TabPanel>
          Species Upload - coming soon!
        </TabPanel>
        <TabPanel>
          Cart
        </TabPanel>
      </Tabs>
    );
  }
}

export default App;
