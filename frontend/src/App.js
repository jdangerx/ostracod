import React, { Component } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Home from './Home.js';
import Search from './Search.jsx';

class App extends Component {
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
          <Search />
        </TabPanel>
        <TabPanel>
          Trait Info
        </TabPanel>
        <TabPanel>
          Species Upload
        </TabPanel>
        <TabPanel>
          Cart
        </TabPanel>
      </Tabs>
    );
  }
}

export default App;
