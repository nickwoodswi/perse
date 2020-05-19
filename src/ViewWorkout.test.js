import React from 'react';
import { render } from '@testing-library/react';
import ViewWorkout from './ViewWorkout';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders ViewWorkout component', () => {
    render(<MemoryRouter><ViewWorkout /></MemoryRouter>);
});

it('ViewWorkout renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><ViewWorkout /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});