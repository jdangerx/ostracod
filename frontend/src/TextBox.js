import React from 'react';

function TextBox(props) {
  const header = props.header? <h2>{props.header}</h2> : null;
  return (
    <div className="TextBox">
      {header}
      {props.body}
    </div>
  );
}

export default TextBox;
