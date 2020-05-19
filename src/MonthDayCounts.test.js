import React from 'react';
import { render } from '@testing-library/react';
import MonthDayCounts from './MonthDayCounts';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders MonthDayCounts', () => {
    render(<MemoryRouter><MonthDayCOunts /></MemoryRouter>);
});

it('MonthDayCOunts renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><MonthDayCounts /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});