import React from 'react';
import { render } from '@testing-library/react';
import ExerciseName from './ExerciseName';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders ExerciseName component', () => {
    render(<MemoryRouter><ExerciseName /></MemoryRouter>);
});

it('ExerciseName renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><ExerciseName /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});