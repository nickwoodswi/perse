import React from 'react';
import { render } from '@testing-library/react';
import AthleteSelection from './AthleteSelection';
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer'

test('renders AthleteSelection component', () => {
    render(<MemoryRouter><AthleteSelection /></MemoryRouter>);
});

it('AthleteSelection renders the UI as expected', () => {
    const tree = renderer
        .create(<MemoryRouter><AthleteSelection /></MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});