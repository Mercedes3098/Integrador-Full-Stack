import "./styles/styles.css"; 
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Navbar from "./components/Navbar";  

import Home from "./pages/Home";
import Login from "./pages/Login";
import DentistDashboard from "./pages/DentistDashboard";
import PatientDashboard from "./pages/PatientDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <main className="main-page">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/dentist" component={DentistDashboard} />
          <Route path="/patient" component={PatientDashboard} />
          <Route path="/admin" component={AdminDashboard} />
          <Route component={NotFound} />
        </Switch>
      </main>
    </BrowserRouter>
  );
}

export default App;
