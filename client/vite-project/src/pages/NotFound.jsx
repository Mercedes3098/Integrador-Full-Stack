import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <main className="notfound-container">
      <h1>404</h1>
      <p>Page not found</p>
      <Link to="/" className="btn-back">Back to Home</Link>
    </main>
  );
}
