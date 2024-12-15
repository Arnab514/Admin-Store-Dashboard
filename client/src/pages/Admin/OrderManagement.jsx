// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import AdminNavbar from '../../components/AdminNavbar';

// const OrderManagementPage = () => {
//   const [stores, setStores] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStores = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         console.log('Current token:', token);
//         const response = await axios.get('http://localhost:5000/api/admin/serve', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setStores(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching stores. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchStores();
//   }, []);

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <AdminNavbar />
//         <div className="flex-grow flex items-center justify-center">
//           <h2 className="text-2xl font-bold">Loading...</h2>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <AdminNavbar />
//         <div className="flex-grow flex items-center justify-center">
//           <p className="text-red-500">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
//       <AdminNavbar />
//       <div className="flex-grow flex items-center justify-center p-4">
//         <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
//           <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Order Management</h2>
//           <div className="rounded-lg bg-gradient-to-r from-purple-100 via-pink-100 to-red-100">
//             <table className="min-w-full">
//               <thead className="bg-gradient-to-r from-purple-300 to-pink-200">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-white">Store Name</th>
//                   <th className="px-4 py-3 text-left text-white">Aggregators</th>
//                   <th className="px-4 py-3 text-left text-white">Last Delivered Time</th>
//                   <th className="px-4 py-3 text-left text-white">Elapsed Time</th>
//                 </tr>
//               </thead>
//               <tbody className="text-sm">
//                 {stores.map((store, index) => (
//                   <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
//                     <td className="px-4 py-3 border-b border-gray-200">{store.storeName || 'N/A'}</td>
//                     <td className="px-4 py-3 border-b border-gray-200">
//                       {store.aggregators?.length > 0 ? store.aggregators.join(', ') : 'None'}
//                     </td>
//                     <td className="px-4 py-3 border-b border-gray-200">{store.lastDeliveredTime || 'No Data'}</td>
//                     <td className="px-4 py-3 border-b border-gray-200">{store.elapsedTime || 'N/A'}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderManagementPage;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import AdminNavbar from '../../components/AdminNavbar';
// import { FaEdit, FaTrashAlt } from 'react-icons/fa'; // Importing the icons from react-icons

// const OrderManagementPage = () => {
//   const [stores, setStores] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchStores = async () => {
//       try {
//         const token = localStorage.getItem('token');
//         console.log('Current token:', token);
//         const response = await axios.get('http://localhost:5000/api/admin/serve', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         setStores(response.data);
//         setLoading(false);
//       } catch (err) {
//         setError('Error fetching stores. Please try again later.');
//         setLoading(false);
//       }
//     };

//     fetchStores();
//   }, []);

//   const handleEdit = (storeId) => {
//     // Handle edit logic here (e.g., redirect to an edit page)
//     console.log('Edit store with ID:', storeId);
//   };

//   const handleDelete = (storeId) => {
//     // Handle delete logic here (e.g., make an API request to delete the store)
//     console.log('Delete store with ID:', storeId);
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <AdminNavbar />
//         <div className="flex-grow flex items-center justify-center">
//           <h2 className="text-2xl font-bold">Loading...</h2>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="min-h-screen flex flex-col">
//         <AdminNavbar />
//         <div className="flex-grow flex items-center justify-center">
//           <p className="text-red-500">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
//       <AdminNavbar />
//       <div className="flex-grow flex items-center justify-center p-4">
//         <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
//           <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Order Management</h2>
//           <div className="rounded-lg bg-gradient-to-r from-purple-100 via-pink-100 to-red-100">
//             <table className="min-w-full">
//               <thead className="bg-gradient-to-r from-purple-300 to-pink-200">
//                 <tr>
//                   <th className="px-4 py-3 text-left text-white">Store Name</th>
//                   <th className="px-4 py-3 text-left text-white">Aggregators</th>
//                   <th className="px-4 py-3 text-left text-white">Last Delivered Time</th>
//                   <th className="px-4 py-3 text-left text-white">Elapsed Time</th>
//                   <th className="px-4 py-3 text-left text-white">Actions</th> {/* Added Actions column */}
//                 </tr>
//               </thead>
//               <tbody className="text-sm">
//                 {stores.map((store, index) => (
//                   <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
//                     <td className="px-4 py-3 border-b border-gray-200">{store.storeName || 'N/A'}</td>
//                     <td className="px-4 py-3 border-b border-gray-200">
//                       {store.aggregators?.length > 0 ? store.aggregators.join(', ') : 'None'}
//                     </td>
//                     <td className="px-4 py-3 border-b border-gray-200">{store.lastDeliveredTime || 'No Data'}</td>
//                     <td className="px-4 py-3 border-b border-gray-200">{store.elapsedTime || 'N/A'}</td>
//                     <td className="px-4 py-3 border-b border-gray-200 flex space-x-2 justify-center"> {/* Added flex for icons */}
//                       <button
//                         onClick={() => handleEdit(store._id)}
//                         className="text-blue-500 hover:text-blue-700"
//                       >
//                         <FaEdit />
//                       </button>
//                       <button
//                         onClick={() => handleDelete(store._id)}
//                         className="text-red-500 hover:text-red-700"
//                       >
//                         <FaTrashAlt />
//                       </button>
//                     </td> {/* Actions column with Edit and Delete icons */}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OrderManagementPage;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AdminNavbar from '../../components/AdminNavbar';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select'; // You'll need to install react-select for multi-select dropdown

const OrderManagementPage = () => {
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingStore, setEditingStore] = useState(null); // To track which store is being edited
  const [updatedStoreName, setUpdatedStoreName] = useState(''); // To track updated store name
  const [updatedAggregators, setUpdatedAggregators] = useState([]); // To track updated aggregators
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/admin/serve', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStores(response.data);
        setLoading(false);
      } catch (err) {
        setError('Error fetching stores. Please try again later.');
        setLoading(false);
      }
    };

    fetchStores();
  }, []);

  const handleEdit = (store) => {
    setEditingStore(store.username); // Set the store being edited
    setUpdatedStoreName(store.storeName);
    setUpdatedAggregators(store.aggregators || []);
  };

  

  // const handleSave = async (username) => {
  //   try {
  //     const token = localStorage.getItem('token');
  //     const updatedStore = {
  //       storeName: updatedStoreName,
  //       aggregators: updatedAggregators,
  //     };
  
  //     const response = await axios.put(
  //       `http://localhost:5000/api/admin/store/${username}`,
  //       updatedStore,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  
  //     // The response contains the updated store information
  //     console.log('API response:', response.data);
  
  //     // Update the store list with the response data to reflect the changes
  //     setStores(stores.map((store) =>
  //       store.username === username
  //         ? { ...store, storeName: response.data.store.name, aggregators: response.data.store.aggregators }
  //         : store
  //     ));
  
  //     setEditingStore(null); // Exit edit mode
  //   } catch (err) {
  //     console.error('Error saving store:', err);
  //     alert('Failed to update store. Please try again.');
  //   }
  // };
  

  const handleSave = async (username) => {
    try {
      const token = localStorage.getItem('token');
      const updatedStore = {
        name: updatedStoreName,  // Changed from storeName to name
        aggregators: updatedAggregators,
      };
  
      const response = await axios.put(
        `http://localhost:5000/api/admin/store/${username}`,
        updatedStore,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      // Update the stores state with the correct property name
      setStores(stores.map((store) =>
        store.username === username
          ? { 
              ...store, 
              storeName: response.data.store.name,  // This maps the backend 'name' to frontend 'storeName'
              aggregators: response.data.store.aggregators 
            }
          : store
      ));
  
      setEditingStore(null);
      alert('Store updated successfully');
    } catch (err) {
      console.error('Error saving store:', err);
      alert('Failed to update store. Please try again.');
    }
  };

  const handleCancel = () => {
    setEditingStore(null); // Exit edit mode without saving
  };

  const handleDelete = async (username) => {
    try {
      const token = localStorage.getItem('token');
      const confirmDelete = window.confirm(`Are you sure you want to delete the store with username ${username}?`);

      if (confirmDelete) {
        await axios.delete(`http://localhost:5000/api/admin/store/${username}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStores(stores.filter((store) => store.username !== username));
        alert('Store deleted successfully');
      }
    } catch (err) {
      console.error('Error deleting store:', err);
      alert('Failed to delete store. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <AdminNavbar />
        <div className="flex-grow flex items-center justify-center">
          <h2 className="text-2xl font-bold">Loading...</h2>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col">
        <AdminNavbar />
        <div className="flex-grow flex items-center justify-center">
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  // Example aggregators list for the multi-select
  const availableAggregators = [
    { label: 'Zomato', value: 'Zomato' },
    { label: 'Swiggy', value: 'Swiggy' },
    { label: 'Uber Eats', value: 'Uber Eats' },
    { label: 'DoorDash', value: 'DoorDash' },
    { label: 'Deliveroo', value: 'Deliveroo' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
      <AdminNavbar />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-6xl bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Order Management</h2>
          <div className="rounded-lg bg-gradient-to-r from-purple-100 via-pink-100 to-red-100">
            <table className="min-w-full">
              <thead className="bg-gradient-to-r from-purple-300 to-pink-200">
                <tr>
                  <th className="px-4 py-3 text-left text-white">Store Name</th>
                  <th className="px-4 py-3 text-left text-white">Aggregators</th>
                  <th className="px-4 py-3 text-left text-white">Last Delivered Time</th>
                  <th className="px-4 py-3 text-left text-white">Elapsed Time</th>
                  <th className="px-4 py-3 text-left text-white">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {stores.map((store, index) => {
                  const isEditing = store.username === editingStore;

                  return (
                    <tr key={index} className="hover:bg-gray-50 transition-colors duration-200">
                      <td className="px-4 py-3 border-b border-gray-200">
                        {isEditing ? (
                          <input
                            type="text"
                            value={updatedStoreName}
                            onChange={(e) => setUpdatedStoreName(e.target.value)}
                            className="border border-gray-300 p-2 rounded"
                          />
                        ) : (
                          store.storeName || 'N/A'
                        )}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-200">
                        {isEditing ? (
                          <Select
                            isMulti
                            value={updatedAggregators.map((agg) => ({ label: agg, value: agg }))}
                            onChange={(selected) => setUpdatedAggregators(selected.map((item) => item.value))}
                            options={availableAggregators}
                            className="w-full"
                          />
                        ) : (
                          store.aggregators?.length > 0 ? store.aggregators.join(', ') : 'None'
                        )}
                      </td>
                      <td className="px-4 py-3 border-b border-gray-200">{store.lastDeliveredTime || 'No Data'}</td>
                      <td className="px-4 py-3 border-b border-gray-200">{store.elapsedTime || 'N/A'}</td>
                      <td className="px-4 py-3 border-b border-gray-200 flex space-x-2 justify-center">
                        {isEditing ? (
                          <>
                            <button onClick={() => handleSave(store.username)} className="text-green-500 hover:text-green-700">
                              Save
                            </button>
                            <button onClick={handleCancel} className="text-gray-500 hover:text-gray-700">
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
                            <button onClick={() => handleEdit(store)} className="text-blue-500 hover:text-blue-700">
                              <FaEdit />
                            </button>
                            <button onClick={() => handleDelete(store.username)} className="text-red-500 hover:text-red-700">
                              <FaTrashAlt />
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderManagementPage;
