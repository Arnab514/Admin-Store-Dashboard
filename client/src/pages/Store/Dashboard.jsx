import React, { useState, useEffect } from 'react';
import { storeApi } from '../../services/storeApi';
import StoreNavbar from '../../components/StoreNavbar';
import { toast } from 'react-toastify';

const StoreDashboardPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ 
    fromDate: '', 
    toDate: '', 
    aggregator: '' 
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await storeApi.getStoreOrders();
        setOrders(fetchedOrders);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to fetch orders');
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.createdAt || order.date);
    return (
      (!filters.fromDate || orderDate >= new Date(filters.fromDate)) &&
      (!filters.toDate || orderDate <= new Date(filters.toDate)) &&
      (!filters.aggregator || order.aggregator === filters.aggregator)
    );
  });

  const formatItems = (items) => {
    if (!Array.isArray(items)) return 'No items';
    return items.map(item => 
      `${item.name} (Qty: ${item.quantity}, Price: ₹${item.price.toFixed(2)})`
    ).join(', ');
  };

  if (loading) {
    return (
      <>
        <StoreNavbar />
        <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-100 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-t-blue-600 border-r-4 border-r-blue-400 border-b-4 border-b-blue-200 border-l-4 border-l-blue-100 mb-4"></div>
            <p className="text-2xl font-semibold text-blue-800">Loading orders...</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-200 via-white to-purple-200">
      <StoreNavbar />
      <div className="container mx-auto px-4 py-8">
        <div className="bg-gradient-to-r from-purple-100 to-pink-100 shadow-2xl rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-700 to-purple-800 p-6">
            <h2 className="text-4xl font-bold text-white">Store Dashboard</h2>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">From Date</label>
                <input
                  type="date"
                  value={filters.fromDate}
                  onChange={(e) => setFilters({ ...filters, fromDate: e.target.value })}
                  className="w-full px-4 py-2 h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">To Date</label>
                <input
                  type="date"
                  value={filters.toDate}
                  onChange={(e) => setFilters({ ...filters, toDate: e.target.value })}
                  className="w-full px-4 py-2 h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-700 mb-1">Aggregator</label>
                <select
                  value={filters.aggregator}
                  onChange={(e) => setFilters({ ...filters, aggregator: e.target.value })}
                  className="w-full px-4 py-2 h-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-300"
                >
                  <option value="">All Aggregators</option>
                  <option value="Zomato">Zomato</option>
                  <option value="Swiggy">Swiggy</option>
                  <option value="Uber Eats">Uber Eats</option>
                  <option value="DoorDash">DoorDash</option>
                  <option value="Deliveroo">Deliveroo</option>
                </select>
              </div>
            </div>

            {filteredOrders.length === 0 ? (
              <div className="text-center py-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg">
                <p className="text-2xl font-semibold text-purple-800 mb-2">No orders found</p>
                <p className="text-gray-600">Try adjusting the filters above.</p>
              </div>
            ) : (
              <div className="overflow-x-auto rounded-lg shadow-lg">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white">
                    <tr>
                      <th className="px-4 py-3 text-left font-semibold">Order ID</th>
                      <th className="px-4 py-3 text-left font-semibold">Items</th>
                      <th className="px-4 py-3 text-left font-semibold">Date</th>
                      <th className="px-4 py-3 text-left font-semibold">Aggregator</th>
                      <th className="px-4 py-3 text-left font-semibold">Net Amount</th>
                      <th className="px-4 py-3 text-left font-semibold">Gross Amount</th>
                      <th className="px-4 py-3 text-left font-semibold">Tax</th>
                      <th className="px-4 py-3 text-left font-semibold">Discounts</th>
                      <th className="px-4 py-3 text-left font-semibold">Event Log</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((order, index) => (
                      <tr
                        key={order._id}
                        className={`${index % 2 === 0 ? 'bg-gradient-to-r from-purple-50 to-pink-50' : 'bg-white'} hover:bg-blue-100 transition duration-300`}
                      >
                        <td className="px-4 py-3 border-b text-gray-800">{order._id.slice(0, 6)}</td> {/* Shortened Order ID */}
                        <td className="px-4 py-3 border-b text-gray-700">{formatItems(order.items)}</td>
                        <td className="px-4 py-3 border-b text-gray-700">
                          {new Date(order.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td className="px-4 py-3 border-b text-gray-700">{order.aggregator}</td>
                        <td className="px-4 py-3 border-b text-green-700 font-semibold">₹{order.netAmount.toFixed(2)}</td> {/* Changed Dollar to Rupee */}
                        <td className="px-4 py-3 border-b text-gray-800">₹{order.grossAmount.toFixed(2)}</td> {/* Changed Dollar to Rupee */}
                        <td className="px-4 py-3 border-b text-red-600">₹{order.tax.toFixed(2)}</td> {/* Changed Dollar to Rupee */}
                        <td className="px-4 py-3 border-b text-purple-700">₹{order.discounts.toFixed(2)}</td> {/* Changed Dollar to Rupee */}
                        <td className="px-4 py-3 border-b text-gray-700">
                          {order.eventLog && order.eventLog.length > 0
                            ? order.eventLog[order.eventLog.length - 1].status
                            : 'No events'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoreDashboardPage;
