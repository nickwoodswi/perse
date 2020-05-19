import React from 'react';
import { render } from '@testing-library/react';
import ExerciseSelection from './ExerciseSelection';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders ExerciseSelection component', () => {
    render(<MemoryRouter><ExerciseSelection /></MemoryRouter>);
});

it('ExerciseSelection renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><ExerciseSelection /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});