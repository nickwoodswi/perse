import React from 'react';
import { render } from '@testing-library/react';
import SingleDateSelector from './SingleDateSelector';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders single date selector', () => {
    render(<MemoryRouter><SingleDateSelector /></MemoryRouter>);
});

it('SingleDateSelector renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><SingleDateSelector /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});