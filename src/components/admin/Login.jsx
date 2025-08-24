import React, { useState } from "react";
import { User, Lock, Shield, Eye, EyeOff } from "lucide-react";

const Login = ({ onLogin }) => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const adminUsername = import.meta.env.VITE_ADMIN_USERNAME;
      const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

      if (
        credentials.username === adminUsername &&
        credentials.password === adminPassword
      ) {
        const token = btoa(`${credentials.username}:${credentials.password}`); // Add this
        localStorage.setItem("adminToken", token); // Add this
        localStorage.setItem("adminAuthenticated", "true");
        localStorage.setItem("adminUsername", credentials.username);
        setCredentials({ username: "", password: "" });
        onLogin(true);
      }
      if (
        credentials.username === adminUsername &&
        credentials.password === adminPassword
      ) {
        const token = btoa(`${credentials.username}:${credentials.password}`); // Add this
        localStorage.setItem("adminToken", token); // Add this
        localStorage.setItem("adminAuthenticated", "true");
        localStorage.setItem("adminUsername", credentials.username);
        setCredentials({ username: "", password: "" });
        onLogin(true);
      }
    } catch (err) {
      setError("Terjadi kesalahan saat login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900 via-red-800 to-amber-700 flex items-center justify-center p-4 relative">
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3C/svg%3E")`,
        }}
      ></div>

      <div className="relative w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
            <Shield className="w-10 h-10 text-red-800" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">Admin Panel</h1>
          <p className="text-red-100">
            {import.meta.env.VITE_AMBALAN_NAME || "Ambalan Pramuka"}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Masuk Admin
            </h2>
            <p className="text-gray-600">Silakan masuk untuk mengelola data</p>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="Masukkan username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-colors"
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-800 to-red-700 text-white py-3 rounded-lg font-semibold hover:from-red-900 hover:to-red-800 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Masuk...
                </div>
              ) : (
                "Masuk Admin"
              )}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-500">
            <p>© 2024 {import.meta.env.VITE_ORG_NAME || "Pramuka Indonesia"}</p>
          </div>
        </div>

        {import.meta.env.DEV && (
          <div className="mt-4 bg-amber-100 border border-amber-300 text-amber-800 px-4 py-3 rounded-lg text-sm">
            <strong>Mode Development:</strong> Username: admin, Password:
            pramuka123
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
