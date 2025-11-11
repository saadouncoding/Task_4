import { fireEvent, screen, waitFor } from '@testing-library/react';
import { Routes, Route } from 'react-router-dom';

import AllPerks from '../src/pages/AllPerks.jsx';
import { renderWithRouter } from './utils/renderWithRouter.js';


  
describe('AllPerks page (Directory)', () => {
  test('lists public perks and responds to name filtering', async () => {
    const seededPerk = global.__TEST_CONTEXT__.seededPerk;

    renderWithRouter(
      <Routes>
        <Route path="/explore" element={<AllPerks />} />
      </Routes>,
      { initialEntries: ['/explore'] }
    );

    await screen.findByText(seededPerk.title, undefined, { timeout: 5000 });

    const nameFilter = screen.getByPlaceholderText('Enter perk name...');
    fireEvent.change(nameFilter, { target: { value: seededPerk.title } });

    await waitFor(() => {
      expect(screen.getByText(seededPerk.title)).toBeInTheDocument();
    }, { timeout: 5000 });

    expect(screen.getByText(/showing/i)).toHaveTextContent('Showing');
  });

  test('lists public perks and responds to merchant filtering', async () => {
    const seededPerk = global.__TEST_CONTEXT__.seededPerk;

    renderWithRouter(
      <Routes>
        <Route path="/explore" element={<AllPerks />} />
      </Routes>,
      { initialEntries: ['/explore'] }
    );

    const merchantFilter = await screen.findByRole('combobox', { timeout: 5000 });

    await screen.findByText(seededPerk.title, { timeout: 5000 });

    await screen.findByRole('option', { name: seededPerk.merchant, timeout: 5000 });

    fireEvent.change(merchantFilter, { target: { value: seededPerk.merchant } });
    expect(merchantFilter.value).toBe(seededPerk.merchant);

    const summary = screen.getByText(/showing/i);

    await waitFor(() => {
      expect(screen.getByText(seededPerk.title)).toBeInTheDocument();
      expect(summary).toHaveTextContent('Showing 1 perk');
    }, { timeout: 5000 });
  });
});
