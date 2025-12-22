import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../axios";

function Navbar() {
  const [auth, setAuth] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    axios
      .post("/auth/verify", {}, { withCredentials: true })
      .then((res) => {
        if (res.data.status) {
          setAuth(true);
          setUsername(res.data.user);   // <-- FIXED (user is a string)
        } else {
          setAuth(false);
        }
      })
      .catch(() => setAuth(false));
  }, []);

  const handleLogout = () => {
    axios
      .get("/auth/logout", { withCredentials: true })
      .then(() => {
        setAuth(false);
        window.location.reload();
      });
  };

  return (
    <nav
      className="navbar navbar-expand-lg border-bottom"
      style={{ backgroundColor: "#FFF" }}
    >
      <div className="container p-2">
        <Link className="navbar-brand" to="/">
          <img
            src="media/images/logo.svg"
            style={{ width: "25%" }}
            alt="Logo"
          />
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <form className="d-flex" role="search">
            <ul className="navbar-nav mb-lg-0">

              {/* AUTH STATE */}
              {auth ? (
                <>
                  <li className="nav-item nav-link">
                    Welcome, <b>{username}</b>
                  </li>

                  <li
                    className="nav-item nav-link"
                    style={{ cursor: "pointer" }}
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/signup">
                      Signup
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link active" to="/login">
                      Login
                    </Link>
                  </li>
                </>
              )}

              {/* REST LINKS */}
              <li className="nav-item">
                <Link className="nav-link active" to="/about">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/product">
                  Product
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/pricing">
                  Pricing
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to="/support">
                  Support
                </Link>
              </li>

            </ul>
          </form>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;


