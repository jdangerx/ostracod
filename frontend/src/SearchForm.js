import React, { Component } from 'react';

class SearchForm extends Component {
  render() {
    return (
      <div className="SearchForm">
        <input type="text" placeholder="Species Name" onChange={this.props.handleNameChange}/>
      </div>
    );
  }
}

export default SearchForm;
