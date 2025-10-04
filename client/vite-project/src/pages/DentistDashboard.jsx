export default function DentistDashboard() {
  return (
    <>
      <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1>DentCare</h1>
        </div>
        
        <nav className="sidebar-nav">
          <a href="#" className="nav-item">Profile</a>
          <a href="#" className="nav-item active">My Schedule</a>
          <a href="#" className="nav-item">Patients List</a>
          <a href="#" className="nav-item">Patient Records</a>
          <a href="#" className="nav-item">Statistics</a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="main-header">
          <h1>My Schedule</h1>
        </header>

        <section className="schedule-section">
          <h2 className="schedule-title">Today's Appointments</h2>
          
          <div className="appointments-list">
            <div className="appointment-item">
              <div className="appointment-time">09:00 AM</div>
              <div className="appointment-details">
                <div className="patient-name">John Smith</div>
                <div className="appointment-type">Root canal procedure</div>
              </div>
            </div>

            <div className="appointment-item">
              <div className="appointment-time">10:30 AM</div>
              <div className="appointment-details">
                <div className="patient-name">Jane Doe</div>
                <div className="appointment-type">Teeth cleaning</div>
              </div>
            </div>

            <div className="appointment-item">
              <div className="appointment-time">11:00 AM</div>
              <div className="appointment-details">
                <div className="patient-name">Peter Jones</div>
                <div className="appointment-type">Wisdom tooth extraction</div>
              </div>
            </div>
          </div>
        </section>
              </main>
      </div>
    </>
  );
}