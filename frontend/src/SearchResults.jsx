import React, { Component } from 'react';

class SearchResults extends Component {
  render() {
    const list = this.props.matches.map(
      (match) =>
        <div key={match.name} className="SearchResult">
          {match.name}
        </div>
    );
    return (
      <div className="SearchResults">
        {list}
      </div>
    );
  }
}

export default SearchResults;
