import { Link } from 'react-router-dom';
import '../Styles/Home.css';

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Bienvenido a App de Notas 📝</h1>
        <p>
          Guarda tus notas y organiza tus ideas. Para empezar, inicia sesión o regístrate.
        </p>
        <div className="home-buttons">
          <Link to="/login">
            <button>Iniciar Sesión</button>
          </Link>
          <Link to="/register">
            <button>Registrarse</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
