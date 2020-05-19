import React from 'react';
import { render } from '@testing-library/react';
import Exercises from './Exercises';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders exercises component', () => {
    render(<MemoryRouter><Exercises /></MemoryRouter>);
});

it('Exercises renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><Exercises /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});