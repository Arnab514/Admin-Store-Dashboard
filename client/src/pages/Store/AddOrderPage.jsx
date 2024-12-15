import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { storeApi } from '../../services/storeApi';
import StoreNavbar from '../../components/StoreNavbar';
import { toast } from 'react-toastify';

const AddOrderPage = () => {
  const navigate = useNavigate();
  const [storeAggregators, setStoreAggregators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [order, setOrder] = useState({
    items: [{ name: '', quantity: 1, price: 0 }],
    aggregator: '',
    netAmount: '',
    grossAmount: '',
    tax: '',
    discounts: '',
    eventLog: '',
  });

  useEffect(() => {
    const fetchAggregators = async () => {
      try {
        const aggregators = await storeApi.getStoreAggregators();
        setStoreAggregators(aggregators);
        setLoading(false);
      } catch (error) {
        toast.error('Failed to fetch store aggregators');
        setLoading(false);
      }
    };

    fetchAggregators();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('item')) {
      const [field, index] = name.split('-');
      const newItems = [...order.items];
      newItems[index] = {
        ...newItems[index],
        [field.replace('item', '').toLowerCase()]: value
      };
      setOrder(prevOrder => ({ ...prevOrder, items: newItems }));
      return;
    }

    setOrder(prevOrder => ({
      ...prevOrder,
      [name]: value
    }));
  };

  const addItemRow = () => {
    setOrder(prevOrder => ({
      ...prevOrder,
      items: [...prevOrder.items, { name: '', quantity: 1, price: 0 }]
    }));
  };

  const removeItemRow = (indexToRemove) => {
    setOrder(prevOrder => ({
      ...prevOrder,
      items: prevOrder.items.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { items, aggregator, netAmount, grossAmount, tax, discounts, eventLog } = order;

      const validItems = items.filter(item => item.name.trim() !== '');
      if (validItems.length === 0) {
        toast.error('Please add at least one item');
        return;
      }

      const orderData = {
        ...order,
        items: validItems.map(item => ({
          name: item.name.trim(),
          quantity: parseInt(item.quantity) || 1,
          price: parseFloat(item.price) || 0
        })),
        netAmount: parseFloat(netAmount),
        grossAmount: parseFloat(grossAmount),
        tax: parseFloat(tax) || 0,
        discounts: parseFloat(discounts) || 0,
        eventLog: typeof order.eventLog === 'string' ? order.eventLog : String(order.eventLog)
      };

      const response = await storeApi.createOrder(orderData);

      toast.success('Order created successfully');

      navigate('/store');
    } catch (error) {
      toast.error('Failed to create order');
      console.error('Order creation error:', error);
    }
  };

  if (loading) {
    return (
      <>
        <StoreNavbar />
        <div className="p-8">
          <div className="text-center">Loading aggregators...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <StoreNavbar />
      <div className="p-8 bg-gradient-to-r from-purple-500 to-pink-500 min-h-screen">
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Add Order</h2>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl mx-auto">
          <div className="mb-6">
            <h3 className="text-xl font-semibold text-white mb-4">Items</h3>
            {order.items.map((item, index) => (
              <div key={index} className="flex space-x-4 mb-4">
                <div className="flex flex-col w-1/3">
                  <label className="text-lg font-medium text-white mb-2">Item Name</label>
                  <input
                    type="text"
                    name={`itemName-${index}`}
                    value={item.name}
                    onChange={handleChange}
                    className="px-4 py-2 bg-white bg-opacity-60 text-gray-800 rounded-md shadow-lg"
                    required
                  />
                </div>
                <div className="flex flex-col w-1/3">
                  <label className="text-lg font-medium text-white mb-2">Quantity</label>
                  <input
                    type="number"
                    name={`itemQuantity-${index}`}
                    value={item.quantity}
                    onChange={handleChange}
                    className="px-4 py-2 bg-white bg-opacity-60 text-gray-800 rounded-md shadow-lg"
                    min="1"
                  />
                </div>
                <div className="flex flex-col w-1/3">
                  <label className="text-lg font-medium text-white mb-2">Price</label>
                  <input
                    type="number"
                    name={`itemPrice-${index}`}
                    value={item.price}
                    onChange={handleChange}
                    className="px-4 py-2 bg-white bg-opacity-60 text-gray-800 rounded-md shadow-lg"
                    min="0"
                    step="0.01"
                  />
                </div>
                {order.items.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeItemRow(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-md shadow-lg hover:bg-red-600 transition"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addItemRow}
              className="px-6 py-2 bg-teal-500 text-white rounded-md shadow-lg hover:bg-teal-600 transition-all duration-300"
            >
              Add Item
            </button>
          </div>

          <div className="mb-6">
            <label className="text-lg font-medium text-white mb-2">Select Aggregator</label>
            <select
              name="aggregator"
              value={order.aggregator}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white bg-opacity-60 text-gray-800 rounded-md shadow-lg"
              required
            >
              <option value="">Select Aggregator</option>
              {storeAggregators.map((aggregator) => (
                <option key={aggregator} value={aggregator}>
                  {aggregator}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="text-lg font-medium text-white mb-2">Net Amount</label>
            <input
              type="number"
              name="netAmount"
              value={order.netAmount}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white bg-opacity-60 text-gray-800 rounded-md shadow-lg"
              required
            />
          </div>

          <div className="mb-6">
            <label className="text-lg font-medium text-white mb-2">Gross Amount</label>
            <input
              type="number"
              name="grossAmount"
              value={order.grossAmount}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white bg-opacity-60 text-gray-800 rounded-md shadow-lg"
              required
            />
          </div>

          <div className="mb-6">
            <label className="text-lg font-medium text-white mb-2">Tax</label>
            <input
              type="number"
              name="tax"
              value={order.tax}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white bg-opacity-60 text-gray-800 rounded-md shadow-lg"
            />
          </div>

          <div className="mb-6">
            <label className="text-lg font-medium text-white mb-2">Discounts</label>
            <input
              type="number"
              name="discounts"
              value={order.discounts}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white bg-opacity-60 text-gray-800 rounded-md shadow-lg"
            />
          </div>

          <div className="mb-6">
            <label className="text-lg font-medium text-white mb-2">Event Log</label>
            <input
              type="text"
              name="eventLog"
              value={order.eventLog}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-white bg-opacity-60 text-gray-800 rounded-md shadow-lg"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-indigo-500 to-indigo-700 text-white rounded-md shadow-lg hover:from-indigo-600 hover:to-indigo-800 transition-all duration-300"
          >
            Add Order
          </button>
        </form>
      </div>
    </>
  );
};

export default AddOrderPage;