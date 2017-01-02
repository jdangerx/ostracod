import React, { Component } from 'react';

class SearchForm extends Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(e) {
    // api call here
    const url = 'http://localhost:5000/filter?name=' + e.target.value;
    fetch(url).then(
      (r) => r.json()
    ).then(
      (j) =>
        this.setState({matches: JSON.parse(j)})
    ).catch(
      (e) => console.log(e)
    );
    this.setState({
      matches: [{
        name: 'Hello',
        traits: [
          { name: 'Bingo bango', value: 'Boingo' },
          { name: 'Banana fana', value: 'Fo fana' },
        ],
      }],
    });
  }
  render() {
    return (
      <div className="SearchForm">
        <input type="text" placeholder="Species Name" onChange={this.handleNameChange}/>
      </div>
    );
  }
}

export default SearchForm;
