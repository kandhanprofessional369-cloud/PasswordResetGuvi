import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        {
          email,
          password,
        }
      );

      console.log(response.data);

      setMessage(response.data.message);

      // Store JWT token
      localStorage.setItem("token", response.data.token);

      setLoading(false);

      // Navigate to dashboard
      navigate("/dashboard");
    } catch (error) {
      setLoading(false);

      setMessage(
        error.response?.data?.message || "Something went wrong."
      );
    }
  };

  return (
    <AuthLayout title="Login">
      <form onSubmit={handleSubmit}>

        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          className="form-control mb-3"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Logging in...
            </>
          ) : (
            "Login"
          )}
        </button>

        <p className="text-center mt-3">
          <Link to="/forgot-password">
            Forgot Password?
          </Link>
        </p>

        <p className="text-center">
          Don't have an account?{" "}
          <Link to="/register">
            Register
          </Link>
        </p>

        {message && (
          <p className="text-center mt-3 text-success">
            {message}
          </p>
        )}

      </form>
    </AuthLayout>
  );
}

export default Login;