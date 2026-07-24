import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/forgot-password`,
        {
          email,
        },
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Forgot Password">
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control mb-3"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <p className="text-center mt-3">{message}</p>

        <p className="text-center mt-3">
          <Link to="/login">Back to Login</Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default ForgotPassword;
