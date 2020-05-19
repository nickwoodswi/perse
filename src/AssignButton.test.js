import React from 'react';
import { render } from '@testing-library/react';
import AssignButton from './AssignButton';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders AssignButton', () => {
    render(<MemoryRouter><AssignButton /></MemoryRouter>);
});

it('AssignButton renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><AssignButton /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});