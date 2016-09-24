(function() {
  var traitCodings = JSON.parse(document.getElementById("traitCodings").attributes[2].value);
  window.traitCodings = traitCodings;

  function validKeys(obj) {
    return Object.keys(obj).filter(function(key) { return !isNaN(parseInt(key, 10)) && obj[key]; });
  }

  // display
  var TraitEntry = React.createClass({
    render: function() {
      var humanReadableTraitValue = this.props.traitValue;
      var cleanTraitName = this.props.traitName.toLowerCase();
      if (traitCodings.hasOwnProperty(cleanTraitName)) {
        humanReadableTraitValue = traitCodings[cleanTraitName][this.props.traitValue] || "N/A";
      }
      return (
          <div className="traitEntry">
          {this.props.traitName} : {humanReadableTraitValue}
        </div>
      );
    }
  });

  var TraitList = React.createClass({
    render: function() {
      var traitEntries = Object.keys(this.props.traits).map(function(traitName) {
        return (
            <TraitEntry key={traitName} traitName={traitName} traitValue={this.props.traits[traitName].Value} />
        );
      }.bind(this));
      return (
          <div className="traitList">
          {traitEntries}
        </div>
      );
    }
  });

  var SpeciesCard = React.createClass({
    render: function() {
      return (
          <div className="speciesCard">
          <h3>{this.props.name}</h3>
          <TraitList traits={this.props.traits} />
          </div>
      );
    }
  });

  var SpeciesList = React.createClass({
    render: function() {
      var species = Object.keys(this.props.data).sort();
      var speciesCards = species.map(function(speciesName) {
        return (
            <SpeciesCard key={speciesName} name={speciesName} traits={this.props.data[speciesName]}/>
        );
      }.bind(this));
      return (
          <div className="speciesList">
          {speciesCards}
        </div>
      );
    }
  });

  // actual filtering
  var TraitValueCheckbox = React.createClass({
    getInitialState: function() {
      return {checked: false};
    },
    handleChange: function(e) {
      this.setState({checked: e.target.checked});
      this.props.parentHandleChange(e, this.props.traitValueNum);
    },
    render: function() {
      return(
        <div className="traitValueCheckbox">
          {this.props.traitValueName}: <input type="checkbox" onChange={this.handleChange} checked={this.state.checked}/>
          </div>
      );
    }
  });

  var TraitValueSelector = React.createClass({
    getInitialState: function() {
      var traitValueNums = validKeys(this.props.traitValues);
      var selectedValues = traitValueNums.reduce(function(acc, traitValueNum) {
        acc[traitValueNum] = false;
        return acc;
      }, {});
      return selectedValues;
    },
    handleChange: function(e, valueNum) {
      var changeset = {};
      changeset[valueNum] = e.target.checked;
      this.setState(changeset, function() {
        var state = this.state;
        var selected = Object.keys(state).filter(function(valueNum){
          return state[valueNum];
        });
        this.props.parentHandleTraitChange(this.props.traitName, selected);
      }.bind(this));
    },
    render: function() {
      var traitValueNums = validKeys(this.props.traitValues);
      var checkboxes = traitValueNums.map(function(traitValueNum){
        var traitValueName = this.props.traitValues[traitValueNum];
        return (
            <TraitValueCheckbox key={traitValueNum} traitValueNum={traitValueNum} traitValueName={traitValueName} parentHandleChange={this.handleChange}/>
        );
      }.bind(this));
      return(
          <div className="traitValueSelector">
          {this.props.traitValues["long name"]}: {checkboxes}
          </div>
      );
    }
  });

  var SpeciesNameField = React.createClass({
    getInitialState: function() {
      return {name: "", traits: {}};
    },
    handleNameChange: function(e) {
      this.setState({name: e.target.value});
      this.props.parentHandleNameChange(e);
    },

    render: function() {
      return(
        <div className="speciesNameField">
          <input type="text" placeholder="Species name" value={this.state.name} onChange={this.handleNameChange}/>
          </div>
      );
    }
  });

  var SpeciesForm = React.createClass({
    getInitialState: function() {
      return {name: "", traits: {}};
    },

    handleNameChange: function(e) {
      this.setState({name: e.target.value}, this.query);
    },

    handleTraitChange: function(traitName, selected) {
      var traits = this.state.traits;
      traits[traitName] = selected;
      this.setState({traits: traits}, this.query);
    },

    query: function() {
      var name = this.state.name.trim();
      var traits = this.state.traits;
      this.props.onQuery({name: name, traits: traits});
    },

    handleSubmit: function(e) {
      e.preventDefault();
      this.query();
    },

    render: function() {
      var traitSelectors = Object.keys(traitCodings).sort().slice(0,2).map(function(traitName) {
        return (
          <div className="traitSelectors">
            <TraitValueSelector key={traitName}
          traitName={traitName}
          traitValues={traitCodings[traitName]}
          parentHandleTraitChange={this.handleTraitChange}/>
            </div>
        );
      }.bind(this));
      return (
          <form className="speciesForm" onSubmit={this.handleSubmit}>
          <SpeciesNameField parentHandleNameChange={this.handleNameChange}/>
          {traitSelectors}
        </form>
      );
    }
  });

  var SpeciesDisplay = React.createClass({
    getInitialState: function() {
      return {data: {}};
    },

    componentDidMount: function() {
      this.getSpecies({name: "", traits: {}});
    },

    getSpecies: function(queryParams) {
      $.ajax({
        url: "/filter",
        data: queryParams,
        dataType: "json",
        cache: false,
        success: function(data) {
          this.setState({data: data});
        }.bind(this),
        error: function(xhr, status, err) {
          console.error(this.props.url, status, err.toString());
        }.bind(this)
      });
    },

    handleSpeciesSubmit: function(species) {
      this.getSpecies({name: species.name, traits: JSON.stringify(species.traits)});
    },

    render: function() {
      return (
          <div className="speciesDisplay">
          <SpeciesForm onQuery={this.handleSpeciesSubmit}/>
          <SpeciesList data={this.state.data} />
          </div>
      );
    }
  });

  ReactDOM.render(
      <SpeciesDisplay url={"/all"} />,
    document.getElementById("content")
  );
})();
