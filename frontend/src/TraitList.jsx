import React, { Component } from 'react';
import { titleCase } from './utils.js';

class TraitList extends Component {
  render() {
    const traitRows = this.props.traits.map(
      (trait) =>
        (
          <tr key={trait.name}>
            <td>{titleCase(trait.name)}</td>
            <td>{titleCase(trait.info.value)}</td>
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
