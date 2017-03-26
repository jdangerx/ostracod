import React from 'react';

import TraitOption from './TraitOption.jsx';
import Expandable from './Expandable.jsx';

function SearchForm (props) {
    const traitOptions = props.traitCodings.map((trait) => {
      const traitOption = <TraitOption
        key={trait.name}
        trait={trait}
        toggleTraitFilter={props.toggleTraitFilter}
        selected={props.selectedTraits[trait.name]}
      />;
      return <Expandable header={trait.info['long name']} contents={traitOption} />;
    });
    return (
      <div className="SearchForm">
        <h4>Search by Name</h4>
        <input type="text" placeholder="Species Name" onChange={props.handleNameChange}/>
        <h4>Filter by Trait Values</h4>
        <div className="TraitOptions">
          {traitOptions}
        </div>
      </div>
    );
}

export default SearchForm;
