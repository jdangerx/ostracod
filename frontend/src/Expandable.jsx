import React, { Component } from 'react';

class Expandable extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { expanded: false };
  }

  toggle() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    const className =
          this.state.expanded ?
          'expanded' :
          'collapsed';
    return (
      <div className="Expandable">
        <div className={className} onClick={this.toggle}>
          {this.props.header}
        </div>
        { this.state.expanded && this.props.contents }
      </div>
    );
  }
}

export default Expandable;
