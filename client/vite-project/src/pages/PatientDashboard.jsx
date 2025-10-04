import { Link } from "react-router-dom";
import "../styles/PatientDashboard.css";

export default function PatientDashboard() {
  // Ejemplo de datos (luego puedes traerlos desde tu API)
  const appointments = [
    {
      id: 1,
      date: "15 Oct, 10:00 AM",
      dentist: "Dr. López",
      type: "Check-up",
    },
    {
      id: 2,
      date: "22 Oct, 2:30 PM",
      dentist: "Dr. Smith",
      type: "Teeth Whitening",
    },
  ];

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>DentCare</h1>
        </div>
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/appointments" className="nav-item active">
                My Appointments
              </Link>
            </li>
            <li>
              <Link to="/book" className="nav-item">
                Book Appointment
              </Link>
            </li>
            <li>
              <Link to="/profile" className="nav-item">
                My Profile
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main className="main-content">
        <header className="main-header">
          <h1>My Appointments</h1>
        </header>

        <section className="appointments-section">
          <h2 className="section-title">Upcoming Appointments</h2>

          <div className="appointments-list">
            {appointments.length > 0 ? (
              appointments.map((appt) => (
                <div key={appt.id} className="appointment-item">
                  <div className="appointment-time">{appt.date}</div>
                  <div className="appointment-details">
                    <div className="dentist-name">{appt.dentist}</div>
                    <div className="appointment-type">{appt.type}</div>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-appointments">You have no upcoming appointments.</p>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
