import React from 'react';
import { render } from '@testing-library/react';
import Rest from './Rest';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders Rest component', () => {
    render(<MemoryRouter><Rest /></MemoryRouter>);
});

it('Rest component renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><Rest /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});