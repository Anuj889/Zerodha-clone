import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.token) {
        return navigate("/login");
      }

      const { data } = await axios.post(
        "http://localhost:3002/auth/verify",
        {},
        { withCredentials: true }
      );

      if (!data.status) {
        removeCookie("token");
        return navigate("/login");
      }

      toast.success(`Welcome ${data.user}`);
      setUsername(data.user);
    };

    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const handleLogout = () => {
    removeCookie("token");
    navigate("/login");
  };

  return (
    <>
      <div className="home_page">
        <h4>
          Welcome <span>{username}</span>
        </h4>

        {username && <button onClick={handleLogout}>LOGOUT</button>}
      </div>

      <ToastContainer />
    </>
  );
};

export default Home;
