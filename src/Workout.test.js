import React from 'react';
import { render } from '@testing-library/react';
import Workout from './Workout';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders Workout component', () => {
    render(<MemoryRouter><Workout /></MemoryRouter>);
});

it('Workout renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><Workout /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});