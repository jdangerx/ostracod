import React, { Component } from 'react';
import SearchForm from './SearchForm.js';
import SearchResults from './SearchResults.jsx';

import './search.css';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: {traits: {}},
      matches: []
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.toggleTraitFilter = this.toggleTraitFilter.bind(this);
    this.query()
  }

  updateMatches(matches) {
    this.setState({
      query: this.state.query,
      matches,
    });
  }

  formatParams(params) {
    const nonNulls = params.filter((param) => param[1]);
    if (nonNulls === []) {
      return '';
    }
    return '?' + nonNulls.map((param) => param.join('=')).join('&');
  }

  query() {
    const queryString = this.formatParams(
      [['name', this.state.query.name],
       ['traits', JSON.stringify(this.state.query.traits)]]);
    const url = 'http://localhost:5000/filter' + queryString;
    fetch(url).then(
      (r) => r.json()
    ).then(
      (matches) => this.updateMatches(matches)
    ).catch(
      (err) => console.log(err)
    );
  }

  handleNameChange(e) {
    const newQuery = this.state.query;
    newQuery.name = e.target.value;
    this.setState({
      query: newQuery,
      matches: this.state.matches,
    }, this.query.bind(this));
  }

  toggleTraitFilter(trait, value) {
    const newTraits = this.state.query.traits;
    const selectedValues = newTraits[trait] ? newTraits[trait] : [];
    if (selectedValues.includes(value)) {
      selectedValues.splice(selectedValues.indexOf(value), 1);
    } else {
      selectedValues.push(value);
    }
    newTraits[trait] = selectedValues;
    this.setState({
      query: { name: this.state.query.name,
               traits: newTraits },
      matches: this.state.matches,
    }, this.query.bind(this));
  }

  render() {
    return (
      <div className="Search">
        <div className="column">
          <SearchForm
            handleNameChange={this.handleNameChange}
            toggleTraitFilter={this.toggleTraitFilter}
            traitCodings={this.props.traitCodings}
            selectedTraits={this.state.query.traits}
          />
        </div>
        <div className="column">
          <SearchResults matches={this.state.matches} />
        </div>
      </div>
    );
  }
}

export default Search;
