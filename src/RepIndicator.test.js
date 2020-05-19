import React from 'react';
import { render } from '@testing-library/react';
import RepIndicator from './RepIndicator';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders RepIndicator', () => {
    render(<MemoryRouter><RepIndicator /></MemoryRouter>);
});

it('RepIndicator renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><RepIndicator /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});