import React, { Component } from 'react';

class TraitList extends Component {
  render() {
    const traitRows = this.props.traits.map(
      (trait) =>
        (
          <tr key={trait.name}>
            <td>{trait.name}</td>
            <td>{trait.info.value}</td>
          </tr>
        )
    );

    return (
      <div className="TraitList">
        <table>
          <tbody>
            {traitRows}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TraitList;
