(function() {
  var TraitEntry = React.createClass({
    render: function() {
      return (
          <div className="traitEntry">
          {this.props.traitName} : {this.props.traitValue}
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

  var SpeciesForm = React.createClass({
    getInitialState: function() {
      return {name: "", traits: {}};
    },

    handleNameChange: function(e) {
      this.setState({name: e.target.value}, this.query);
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
      return (
          <form className="speciesForm" onSubmit={this.handleSubmit}>
          <input type="text" placeholder="Species name" value={this.state.name} onChange={this.handleNameChange}/>
        </form>
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
      this.getSpecies({name: species.name, traits: JSON.stringify({size: 0})});
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
