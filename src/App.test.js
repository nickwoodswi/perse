import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import {MemoryRouter} from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders learn react link', () => {
  render(<MemoryRouter><App /></MemoryRouter>);
});

it('renders the UI as expected', () => {
  const tree = renderer
      .create(<MemoryRouter><App /></MemoryRouter>)
      .toJSON();
  expect(tree).toMatchSnapshot();
});
