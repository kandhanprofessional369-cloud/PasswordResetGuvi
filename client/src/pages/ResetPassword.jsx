import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthLayout from "../components/AuthLayout";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
       `${import.meta.env.VITE_API_URL}/reset-password/${token}`,
        {
          password,
        }
      );

      setMessage(response.data.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <AuthLayout title="Reset Password">
    <form onSubmit={handleSubmit}>
      

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Enter your new password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      <button type="submit"
      className="btn btn-primary w-100 mb-3">
        Reset Password
      </button>

      <p className="text-center mt-3" className="text-center">{message}</p>
    </form>
    </AuthLayout>
  );
}

export default ResetPassword;