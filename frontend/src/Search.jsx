import React, { Component } from 'react';
import SearchForm from './SearchForm.js';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      matches: [],
    };
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  updateMatches(matches) {
    this.setState({
      matches: matches,
    });
  }

  handleNameChange(e) {
    const url = 'http://localhost:5000/filter?name=' + e.target.value;
    fetch(url).then(
      (r) => r.json()
    ).then(
      (matches) => this.updateMatches(matches)
    ).catch(
      (err) => console.log(err)
    );
  }

  render() {
    return (
      <div className="Search">
        <SearchForm handleNameChange={this.handleNameChange} />
        {JSON.stringify(this.state.matches)}
      </div>
    );
  }
}

export default Search;
