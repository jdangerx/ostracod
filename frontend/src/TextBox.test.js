import React from 'react';
import ReactTestUtils from 'react-addons-test-utils';
import ReactDOM from 'react-dom';
import TextBox from './TextBox';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<TextBox />, div);
});


it('renders with text inside', () => {
  const renderer = ReactTestUtils.createRenderer();
  const expectedText = "Hello, this is okay!";
  renderer.render(<TextBox text={expectedText}/>);
  const result = renderer.getRenderOutput();
  expect(result.type).toBe('div');
  expect(result.props.children).toEqual(expectedText);
});
