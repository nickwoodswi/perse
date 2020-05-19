import React from 'react';
import { render } from '@testing-library/react';
import About from './About';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders about component', () => {
    render(<MemoryRouter><About /></MemoryRouter>);
});

it('About component renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><About /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});