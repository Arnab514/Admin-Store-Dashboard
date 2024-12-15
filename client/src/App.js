// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Login from './pages/Login';
// import CreateStore from './pages/Admin/CreateStore';
// import OrderManagement from './pages/Admin/OrderManagement';
// import StoreDashboard from './pages/Store/Dashboard';
// import AddOrderPage from './pages/Store/AddOrderPage';

// const App = () => {
//   const role = localStorage.getItem('role'); // Retrieve the role from localStorage

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Login />} />
        
//         {/* Conditional routing based on role */}
//         {role === 'admin' && (
//           <>
//             <Route path="/admin" element={<CreateStore />} />
//             <Route path="/admin/orders" element={<OrderManagement />} />
//           </>
//         )}

//         {role === 'store' && (
//           <>
//             <Route path="/store" element={<StoreDashboard />} />
//             <Route path="/store/add-order" element={<AddOrderPage />} />
//           </>
//         )}
//       </Routes>
//     </Router>
//   );
// };

// export default App;



import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import CreateStore from './pages/Admin/CreateStore';
import OrderManagement from './pages/Admin/OrderManagement';
import StoreDashboard from './pages/Store/Dashboard';
import AddOrderPage from './pages/Store/AddOrderPage';

const ProtectedRoute = ({ allowedRoles }) => {
  const role = localStorage.getItem('role');

  if (!role) {
    // Redirect to login if no role is found
    return <Navigate to="/" replace />;
  }

  if (!allowedRoles.includes(role)) {
    // Redirect to an unauthorized page or back to login
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
          <Route path="/admin" element={<CreateStore />} />
          <Route path="/admin/orders" element={<OrderManagement />} />
        </Route>

        <Route element={<ProtectedRoute allowedRoles={['store']} />}>
          <Route path="/store" element={<StoreDashboard />} />
          <Route path="/store/add-order" element={<AddOrderPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;