import React from 'react';
import { render } from '@testing-library/react';
import RecurranceIndicator from './RecurranceIndicator';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders artist form', () => {
    render(<MemoryRouter><RecurranceIndicator /></MemoryRouter>);
});

it('RecurranceIndicator renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><RecurranceIndicator /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});