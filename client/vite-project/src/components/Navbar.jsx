import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom"; // ✅ Cambiado de useNavigate a useHistory

export default function Navbar() {
  const [isAuth, setIsAuth] = useState(false);
  const [role, setRole] = useState(null);
  const history = useHistory(); // ✅ Cambiado de useNavigate a useHistory

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuth(true);
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setRole(payload.role);
      } catch (err) {
        setRole(null);
      }
    } else {
      setIsAuth(false);
      setRole(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuth(false);
    setRole(null);
    history.push("/login"); // ✅ Cambiado de navigate("/login") a history.push("/login")
  };

  return (
    <nav style={{ padding: "10px", background: "#1a4a6b" }}>
      <ul
        style={{
          display: "flex",
          listStyle: "none",
          gap: "15px",
          margin: 0,
          padding: 0,
        }}
      >
        <li>
          <Link to="/" style={{ color: "white", textDecoration: "none" }}>
            Home
          </Link>
        </li>

        {!isAuth ? (
          <li>
            <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
              Login
            </Link>
          </li>
        ) : (
          <>
            {role === "patient" && (
              <li>
                <Link
                  to="/patient"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  My Appointments
                </Link>
              </li>
            )}

            {role === "dentist" && (
              <li>
                <Link
                  to="/dentist"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Dentist Dashboard
                </Link>
              </li>
            )}

            {role === "admin" && (
              <li>
                <Link
                  to="/admin"
                  style={{ color: "white", textDecoration: "none" }}
                >
                  Admin Panel
                </Link>
              </li>
            )}

            <li>
              <button
                onClick={handleLogout}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}