import React from 'react';
import { render } from '@testing-library/react';
import Weight from './Weight';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders Weight component', () => {
    render(<MemoryRouter><Weight /></MemoryRouter>);
});

it('Weight renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><Weight /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});