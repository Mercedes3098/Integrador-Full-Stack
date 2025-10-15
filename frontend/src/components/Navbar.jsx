import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ background: '#4a90e2', padding: '10px', color: 'white' }}>
      <Link to="/">Inicio</Link>
    </nav>
  );
}

export default Navbar;
