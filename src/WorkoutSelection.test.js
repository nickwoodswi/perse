import React from 'react';
import { render } from '@testing-library/react';
import WorkoutSelection from './WorkoutSelection';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders WorkoutSelection component', () => {
    render(<MemoryRouter><WorkoutSelection /></MemoryRouter>);
});

it('WorkoutSelection renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><WorkoutSelection /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});