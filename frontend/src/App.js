import React, { Component } from 'react';

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import Home from './Home.js';
import SpeciesInfo from './SpeciesInfo.js';
import SearchForm from './SearchForm.js';

class App extends Component {
  render() {
    return (
      <Tabs>
        <TabList>
          <Tab>Home</Tab>
          <Tab>Search</Tab>
          <Tab>Species Info</Tab>
          <Tab>Trait Info</Tab>
          <Tab>Species Upload</Tab>
          <Tab>Cart</Tab>
        </TabList>
        <TabPanel>
          <Home />
        </TabPanel>
        <TabPanel>
          <SearchForm />
        </TabPanel>
        <TabPanel>
          <SpeciesInfo />
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
