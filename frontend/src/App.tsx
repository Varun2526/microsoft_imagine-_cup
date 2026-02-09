// React import removed as only JSX is used and modern React handles it or it's provided by global
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './layout/DashboardLayout';
import Login from './pages/Login';
import Register from './pages/Register';
import Overview from './pages/Overview';
import RegisterConsent from './pages/RegisterConsent';
import VerifyConsent from './pages/VerifyConsent';
import Registry from './pages/Registry';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<DashboardLayout />}>
          <Route index element={<Navigate to="/overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="register-consent" element={<RegisterConsent />} />
          <Route path="verify" element={<VerifyConsent />} />
          <Route path="registry" element={<Registry />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
