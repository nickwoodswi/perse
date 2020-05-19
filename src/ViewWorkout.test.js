import React from 'react';
import { render } from '@testing-library/react';
import ViewWorkouts from './ViewWorkouts';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders ViewWorkout component', () => {
    render(<MemoryRouter><ViewWorkouts /></MemoryRouter>);
});

it('ViewWorkout renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><ViewWorkouts /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});