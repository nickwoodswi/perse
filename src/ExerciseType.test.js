import React from 'react';
import { render } from '@testing-library/react';
import ExerciseType from './ExerciseType';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders ExerciseType component', () => {
    render(<MemoryRouter><ExerciseType /></MemoryRouter>);
});

it('ExerciseType renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><ExerciseType /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});