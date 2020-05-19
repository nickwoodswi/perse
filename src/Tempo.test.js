import React from 'react';
import { render } from '@testing-library/react';
import Tempo from './Tempo';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders Tempo component', () => {
    render(<MemoryRouter><Tempo /></MemoryRouter>);
});

it('Tempo renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><Tempo /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});