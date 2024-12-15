import React, { useState } from 'react';
import Select from 'react-select';
import axios from 'axios';
import AdminNavbar from '../../components/AdminNavbar';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const getAggregatorOptions = () => {
    const commonFoodDeliveryPlatforms = [
        'Zomato', 'Swiggy', 'Uber Eats', 'DoorDash', 'Deliveroo'
    ].map(platform => ({ value: platform, label: platform }));
    
    return commonFoodDeliveryPlatforms;
};

const StoreCreationPage = () => {
    const [storeData, setStoreData] = useState({
        storeName: '',
        storeUsername: '',
        storePassword: '',
        aggregators: []
    });
    const [uiState, setUiState] = useState({
        error: '',
        success: '',
        passwordVisible: false
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setStoreData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleAggregatorChange = (selectedOptions) => {
        setStoreData(prev => ({
            ...prev,
            aggregators: selectedOptions
        }));
    };

    const togglePasswordVisibility = () => {
        setUiState(prev => ({
            ...prev,
            passwordVisible: !prev.passwordVisible
        }));
    };

    const handleStoreCreation = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');

            const response = await axios.post(
                'http://localhost:5000/api/admin/stores',
                {
                    name: storeData.storeName,
                    username: storeData.storeUsername,
                    password: storeData.storePassword,
                    aggregators: storeData.aggregators.map(option => option.value),
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setUiState({
                success: 'Store created successfully',
                error: '',
                passwordVisible: false
            });
            window.location.href = '/admin/orders';
        } catch (err) {
            setUiState({
                error: 'Error creating store',
                success: '',
                passwordVisible: false
            });
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gradient-to-r from-purple-600 via-pink-500 to-red-500">
            <AdminNavbar />
            <div className="flex-grow flex justify-center items-center p-4">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
                    <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Create New Store</h2>

                    {uiState.error && <p className="text-red-500 text-center mb-4">{uiState.error}</p>}
                    {uiState.success && <p className="text-green-500 text-center mb-4">{uiState.success}</p>}

                    <form onSubmit={handleStoreCreation} className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-800 mb-1">Store Name</label>
                            <input
                                type="text"
                                name="storeName"
                                value={storeData.storeName}
                                onChange={handleInputChange}
                                className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-800 mb-1">Store Username</label>
                            <input
                                type="text"
                                name="storeUsername"
                                value={storeData.storeUsername}
                                onChange={handleInputChange}
                                className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-800 mb-1">Store Password</label>
                            <div className="relative flex flex-col text-center justify-center">
                                <input
                                    type={uiState.passwordVisible ? 'text' : 'password'}
                                    name="storePassword"
                                    value={storeData.storePassword}
                                    onChange={handleInputChange}
                                    className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
                                    required
                                />
                                <span
                                    onClick={togglePasswordVisibility}
                                    className="absolute top-1/2 right-4 transform -translate-y-1/2 cursor-pointer text-gray-500"
                                >
                                    {uiState.passwordVisible ? <FaEye /> : <FaEyeSlash />}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-semibold text-gray-800 mb-1">Aggregators</label>
                            <Select
                                isMulti
                                options={getAggregatorOptions()}
                                value={storeData.aggregators}
                                onChange={handleAggregatorChange}
                                className="border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white rounded-lg hover:bg-gradient-to-r hover:from-purple-700 hover:via-pink-600 hover:to-red-600 transition duration-200 shadow-md"
                        >
                            Create Store
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StoreCreationPage;