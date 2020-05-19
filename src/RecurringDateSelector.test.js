import React from 'react';
import { render } from '@testing-library/react';
import RecurringDateSelector from './RecurringDateSelector';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders RecurringDateSelector', () => {
    render(<MemoryRouter><RecurringDateSelector /></MemoryRouter>);
});

it('RecurringDateSelector renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><RecurringDateSelector /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});