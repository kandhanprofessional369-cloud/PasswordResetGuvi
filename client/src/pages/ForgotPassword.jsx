import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [resetLink, setResetLink] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/forgot-password`,
        {
          email,
        }
      );

      setMessage(response.data.message);
      setResetLink(response.data.resetLink);

    } catch (error) {
  setMessage(
    error.response?.data?.message || "Something went wrong"
  );
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
      >
        Send Reset Link
      </button>


      <p className="text-center mt-3 text-success">
        {message}
      </p>


      {resetLink && (
        <div className="text-center mt-3">
          <a href={resetLink}>
            Reset Password
          </a>
        </div>
      )}


      <p className="text-center mt-3">
        <Link to="/login">
          Back to Login
        </Link>
      </p>

    </form>

  </AuthLayout>
);
}

export default ForgotPassword;