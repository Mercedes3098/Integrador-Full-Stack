import { useState } from "react";
import { withRouter } from "react-router-dom";
import "../styles/Login.css";

function Login({ history }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
      const data = await response.json();
      localStorage.setItem("token", data.token);
      history.push("/"); 
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="app-wrapper">
      <main className="login-container">
        <header>
          <h1>Login</h1>
        </header>
        <form className="login-form" onSubmit={handleSubmit}>
          <section>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </section>
          <section>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </section>
          <button type="submit">Login</button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <nav>
          <a href="/register" className="create-account">
            Create an account
          </a>
        </nav>
      </main>
    </div>
  );
}

export default withRouter(Login);
