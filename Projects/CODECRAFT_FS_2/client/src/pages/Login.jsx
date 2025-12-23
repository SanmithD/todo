import { EyeIcon, EyeOff } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UseAuthStore } from "../store/UseAuthStore";

function Signup() {
  const navigate = useNavigate();
  const { login, isLoading } = UseAuthStore();
  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData); 
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center mb-6">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={ isVisible ? 'text' : 'password' }
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 relative border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="••••••••"
              minLength={6}
              required
            />
            <button type="button" onClick={()=>setIsVisible(!isVisible)} className="absolute my-2.5 -mx-8 ">
              { isVisible ? <EyeOff/> : <EyeIcon/> }
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading ? true : false}
            className="w-full bg-blue-600 cursor-pointer text-white font-semibold py-2.5 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150"
          >
            {isLoading ? "Logging..." : "Login"}
          </button>
        </form>

        <p className="text-xs text-gray-500 text-center mt-6">
          Don't have an account ?
          <Link to="/signup" className="text-blue-600 hover:underline">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
