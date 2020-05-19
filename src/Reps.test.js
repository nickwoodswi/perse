import React from 'react';
import { render } from '@testing-library/react';
import Reps from './Reps';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders Reps component', () => {
    render(<MemoryRouter><Reps /></MemoryRouter>);
});

it('Reps component renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><Reps /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});