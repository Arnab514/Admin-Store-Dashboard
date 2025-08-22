```javascript
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import StoreDashboardPage from '../../pages/Store/Dashboard';
import { storeApi } from '../../services/storeApi';
import { BrowserRouter } from 'react-router-dom';


jest.mock('../../services/storeApi');

describe('StoreDashboardPage', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders StoreNavbar', () => {
    render(<BrowserRouter><StoreDashboardPage /></BrowserRouter>);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });


  test('displays loading state while fetching orders', async () => {
    storeApi.getOrders.mockResolvedValue({ data: [] });
    render(<BrowserRouter><StoreDashboardPage /></BrowserRouter>);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('fetches and displays orders successfully', async () => {
    const mockOrders = [{ id: 1, date: '2024-07-26', aggregator: 'Aggregator A' }, { id: 2, date: '2024-07-27', aggregator: 'Aggregator B' }];
    storeApi.getOrders.mockResolvedValue({ data: mockOrders });
    render(<BrowserRouter><StoreDashboardPage /></BrowserRouter>);
    await waitFor(() => expect(screen.getByText(/Aggregator A/i)).toBeInTheDocument());
    expect(screen.getAllByRole('row').length).toBe(3); // Account for header row
  });

  test('handles empty order data', async () => {
    storeApi.getOrders.mockResolvedValue({ data: [] });
    render(<BrowserRouter><StoreDashboardPage /></BrowserRouter>);
    await waitFor(() => expect(screen.getByText(/No orders found./i)).toBeInTheDocument());
  });

  test('handles API error during order fetching', async () => {
    storeApi.getOrders.mockRejectedValue(new Error('API error'));
    render(<BrowserRouter><StoreDashboardPage /></BrowserRouter>);
    await waitFor(() => expect(screen.getByText(/Error fetching orders./i)).toBeInTheDocument());
  });

  test('filters orders by date', async () => {
    const mockOrders = [{ id: 1, date: '2024-07-26', aggregator: 'Aggregator A' }, { id: 2, date: '2024-07-27', aggregator: 'Aggregator B' }];
    storeApi.getOrders.mockResolvedValue({ data: mockOrders });
    render(<BrowserRouter><StoreDashboardPage /></BrowserRouter>);
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('From Date'), { target: { value: '2024-07-26' } });
      fireEvent.change(screen.getByLabelText('To Date'), { target: { value: '2024-07-26' } });
    })
    await waitFor(() => expect(screen.getByText(/Aggregator A/i)).toBeInTheDocument());
    expect(screen.queryByText(/Aggregator B/i)).not.toBeInTheDocument();
  });

  test('filters orders by aggregator', async () => {
    const mockOrders = [{ id: 1, date: '2024-07-26', aggregator: 'Aggregator A' }, { id: 2, date: '2024-07-27', aggregator: 'Aggregator B' }];
    storeApi.getOrders.mockResolvedValue({ data: mockOrders });
    render(<BrowserRouter><StoreDashboardPage /></BrowserRouter>);
    await waitFor(() => fireEvent.change(screen.getByLabelText('Aggregator'), { target: { value: 'Aggregator A' } }));
    await waitFor(() => expect(screen.getByText(/Aggregator A/i)).toBeInTheDocument());
    expect(screen.queryByText(/Aggregator B/i)).not.toBeInTheDocument();
  });

  test('combines date and aggregator filters', async () => {
    const mockOrders = [{ id: 1, date: '2024-07-26', aggregator: 'Aggregator A' }, { id: 2, date: '2024-07-27', aggregator: 'Aggregator B' }, { id:3, date: '2024-07-26', aggregator: 'Aggregator B'}];
    storeApi.getOrders.mockResolvedValue({ data: mockOrders });
    render(<BrowserRouter><StoreDashboardPage /></BrowserRouter>);
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('From Date'), { target: { value: '2024-07-26' } });
      fireEvent.change(screen.getByLabelText('To Date'), { target: { value: '2024-07-26' } });
      fireEvent.change(screen.getByLabelText('Aggregator'), { target: { value: 'Aggregator B' } });
    });
    await waitFor(() => expect(screen.getByText(/Aggregator B/i)).toBeInTheDocument());
    expect(screen.queryByText(/Aggregator A/i)).not.toBeInTheDocument();
  });

  test('clears filters', async () => {
    const mockOrders = [{ id: 1, date: '2024-07-26', aggregator: 'Aggregator A' }, { id: 2, date: '2024-07-27', aggregator: 'Aggregator B' }];
    storeApi.getOrders.mockResolvedValue({ data: mockOrders });
    render(<BrowserRouter><StoreDashboardPage /></BrowserRouter>);
    await waitFor(() => {
      fireEvent.change(screen.getByLabelText('From Date'), { target: { value: '2024-07-26' } });
      fireEvent.change(screen.getByLabelText('To Date'), { target: { value: '2024-07-26' } });
      fireEvent.change(screen.getByLabelText('Aggregator'), { target: { value: 'Aggregator A' } });
    });
    await waitFor(() => {
        fireEvent.click(screen.getByRole('button', { name: /Clear Filters/i }));
    });

    await waitFor(() => expect(screen.getByText(/Aggregator A/i)).toBeInTheDocument());
    await waitFor(() => expect(screen.getByText(/Aggregator B/i)).toBeInTheDocument());
  });


  test('shows error toast on API error', async () => {
    const mockError = new Error('API Error');
    storeApi.getOrders.mockRejectedValue(mockError);
    const { container } = render(<BrowserRouter><StoreDashboardPage /></BrowserRouter>);
    await waitFor(() => expect(container.querySelector('.Toastify__toast-container')).toBeInTheDocument());

  });


});
```