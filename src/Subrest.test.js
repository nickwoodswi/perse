import React from 'react';
import { render } from '@testing-library/react';
import Subrest from './Subrest';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders Subrest component', () => {
    render(<MemoryRouter><Subrest /></MemoryRouter>);
});

it('Subrest renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><Subrest /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});