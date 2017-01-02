import React, { Component } from 'react';
import SearchResult from './SearchResult.jsx';

class SearchResults extends Component {
  render() {
    const list = this.props.matches.map(
      (match) =>
        <SearchResult key={match.name} name={match.name} traits={match.traits} />
    );
    return (
      <div className="SearchResults">
        {list}
      </div>
    );
  }
}

export default SearchResults;
