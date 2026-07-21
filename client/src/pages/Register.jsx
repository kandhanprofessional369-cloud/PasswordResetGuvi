import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/register",
        {
          name,
          email,
          password,
        }
      );

      setMessage(response.data.message);

      // move to login page after successful registration
      setTimeout(() => {
        navigate("/login");
      }, 1500);

    } catch (error) {
  setMessage(error.response?.data?.message || "Something went wrong. Please try again."
  );
}
  };

  return (
      <AuthLayout title="Register">
    <form onSubmit={handleSubmit}>
      

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Enter your name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <br />
      <br />

      <input
        type="email"
        className="form-control mb-3"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br />
      <br />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br />
      <br />

      

      <button type="submit"
       className="btn btn-primary w-100 mb-3">Register</button>
      <p>
  Already have an account?{" "}
  <Link to="/login">Login</Link>
</p>

      <p>{message}</p>
    </form>
    </AuthLayout>
  );
}

export default Register;