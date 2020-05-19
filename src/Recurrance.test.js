import React from 'react';
import { render } from '@testing-library/react';
import Recurrance from './Recurrance';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders Recurrance component', () => {
    render(<MemoryRouter><Recurrance /></MemoryRouter>);
});

it('Recurrance renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><Recurrance /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});