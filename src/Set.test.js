import React from 'react';
import { render } from '@testing-library/react';
import Set from './Set';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders set component', () => {
    render(<MemoryRouter><Set /></MemoryRouter>);
});

it('Set component renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><Set /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});