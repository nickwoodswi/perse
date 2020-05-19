import React from 'react';
import { render } from '@testing-library/react';
import AddSets from './AddSets';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders addsets component', () => {
    render(<MemoryRouter><AddSets /></MemoryRouter>);
});

it('AddSets component renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><AddSets /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});