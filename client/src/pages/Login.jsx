import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { User, Lock, LogIn } from 'lucide-react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
  
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username,
        password,
      });
  
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.role);
  
      // Use replace to replace the current history entry
      if (response.data.redirectTo) {
        navigate(response.data.redirectTo, { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105">
          <div className="p-8">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-2 drop-shadow-lg">Welcome Back</h2>
              <p className="text-white text-opacity-80 drop-shadow-md">Sign in to continue</p>
            </div>

            <form onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-500 bg-opacity-20 text-white text-center py-2 rounded-lg mb-4 animate-pulse">
                  {error}
                </div>
              )}

              <div className="mb-6 relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-opacity-70">
                  <User size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-300"
                  required
                />
              </div>

              <div className="mb-6 relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-opacity-70">
                  <Lock size={20} />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-10 py-3 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg text-white placeholder-white placeholder-opacity-70 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 transition duration-300"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-opacity-70 hover:text-opacity-100 transition"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-white bg-opacity-20 backdrop-blur-lg rounded-lg text-white font-semibold hover:bg-opacity-30 transition duration-300 flex items-center justify-center space-x-2 group"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-white"></div>
                ) : (
                  <>
                    <span>Login</span>
                    <LogIn size={20} className="group-hover:translate-x-1 transition" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        <div className="text-center mt-6">
          <p className="text-white text-opacity-80">
            Forgot password? <a href="/reset" className="text-white hover:underline">Reset here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;