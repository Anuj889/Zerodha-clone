import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../../axios";

import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:3002/auth/login",
        inputValue,
        { withCredentials: true }
      );

      if (data.success) {
        toast.success(data.message);
        setTimeout(() => navigate("/"), 1000);
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="form_container">
      <h2>Login Account</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email</label>
          <input name="email" value={inputValue.email} onChange={handleChange} />
        </div>

        <div>
          <label>Password</label>
          <input
            name="password"
            value={inputValue.password}
            onChange={handleChange}
            type="password"
          />
        </div>

        <button type="submit">Login</button>

        <span>
          Not have an account? <Link to="/signup">Signup</Link>
        </span>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;


