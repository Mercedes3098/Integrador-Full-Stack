import "../styles/AdminDashboard.css";

export default function AdminDashboard() {
  console.log("AdminDashboard cargado");

  return (
    <div className="dashboard-container">
      <aside className="sidebar">
        <header className="sidebar-header">
          <h1>DentCare Admin</h1>
        </header>
        <nav className="sidebar-nav">
          <a href="#" className="nav-item active">Users</a>
          <a href="#" className="nav-item">Dentists</a>
          <a href="#" className="nav-item">Patients</a>
          <a href="#" className="nav-item">Appointments</a>
          <a href="#" className="nav-item">Reports</a>
        </nav>
      </aside>

      <main className="main-content">
        <header className="main-header">
          <h1>Admin Panel</h1>
        </header>

        <section className="admin-section">
          <h2 className="section-title">System Overview</h2>
          <div className="overview-grid">
            <article className="overview-card">
              <h3>Total Users</h3>
              <p>125</p>
            </article>
            <article className="overview-card">
              <h3>Total Dentists</h3>
              <p>18</p>
            </article>
            <article className="overview-card">
              <h3>Total Patients</h3>
              <p>95</p>
            </article>
            <article className="overview-card">
              <h3>Appointments Today</h3>
              <p>32</p>
            </article>
          </div>
        </section>
      </main>
    </div>
  );
}
