import React, { Component } from 'react';
import { titleCase } from './utils.js';

class TraitList extends Component {
  render() {
    const traitRows = this.props.traits.map(
      (trait) =>
        (
          <tr key={trait.name}>
            <td>{titleCase(trait.name)}</td>
            <td>{
              trait.info.value ?
                 titleCase(trait.info.value) :
                 'N/A'
                }</td>
            <td>{trait.info.comments}</td>
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
