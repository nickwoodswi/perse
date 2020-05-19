import React from 'react';
import { render } from '@testing-library/react';
import Distance from './Distance';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders Distance component', () => {
    render(<MemoryRouter><Distance /></MemoryRouter>);
});

it('Distance renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><Distance /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});