import { Link } from "react-router-dom";

export default function Home() {
  return (
    <main className="home-container">
      <header className="home-header">
        <h1>DentCare</h1>
        <p>Your online dentistry solution</p>
      </header>

      <section className="home-actions">
        <Link to="/login" className="btn-primary">Login</Link>
        <Link to="/signup" className="btn-secondary">Sign Up</Link>
      </section>
    </main>
  );
}
