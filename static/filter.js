(function() {
  var fakeData = {
    "species name one": {"trait one": 0, "trait two": 0},
    "species name two": {"trait one": 0, "trait two": 1},
    "species name three": {"trait one": 1, "trait two": 0}
  };

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
            <TraitEntry key={traitName} traitName={traitName} traitValue={this.props.traits[traitName].Traits} />
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

  var SpeciesInputBox = React.createClass({
    render: function() {
      return (
          <div className="speciesInputBox">
          Hello, this is a species input box!
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
          Hello, this is a species list!
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
      this.getSpecies("/all");
    },

    getSpecies: function(url) {
      $.ajax({
        url: url,
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

    render: function() {
      return (
          <div className="speciesDisplay">
          Hello, this is a species display!
          <SpeciesInputBox />
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
