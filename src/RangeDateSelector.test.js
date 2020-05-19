import React from 'react';
import { render } from '@testing-library/react';
import RangeDateSelector from './RangeDateSelector';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders RangeDateSelector component', () => {
    render(<MemoryRouter><RangeDateSelector /></MemoryRouter>);
});

it('RangeDateSelector renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><RangeDateSelector /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});