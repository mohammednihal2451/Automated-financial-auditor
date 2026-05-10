// import ProtectedRoute from './components/ProtectedRoute';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import LandingPage from './pages/LandingPage';
// import Authentication from './pages/Authentication';  // new unified page
// import Dashboard from './pages/Dashboard';
// import UploadPage from './pages/UploadPage';
// import ReportsPage from './pages/ReportsPage';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<LandingPage />} />
//         <Route path="/auth" element={<Authentication />} />
//         {/* Optional: redirect old paths to /auth */}
//         <Route path="/login" element={<Navigate to="/auth" replace />} />
//         <Route path="/signup" element={<Navigate to="/auth" replace />} />
//        <Route
//   path="/dashboard"
//   element={
//     <ProtectedRoute>
//       <Dashboard />
//     </ProtectedRoute>
//   }
// />
//         <Route
//           path="/upload"
//           element={
//             <ProtectedRoute>
//               <UploadPage />
//             </ProtectedRoute>
//           }
//         />
//         <Route
//           path="/reports/:reportId"
//           element={
//             <ProtectedRoute>
//               <ReportsPage />
//             </ProtectedRoute>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import ProtectedRoute from './components/ProtectedRoute';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Authentication from './pages/Authentication';
import Dashboard from './pages/Dashboard';
import UploadPage from './pages/UploadPage';
import ReportsPage from './pages/ReportsPage';
import Layout from './components/Layout';
import Profile from "./pages/Profile";
function App() {
  return (
    <Router>
      <Routes>
        {/* Public */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<Authentication />} />
        <Route path="/login" element={<Navigate to="/auth" replace />} />
        <Route path="/signup" element={<Navigate to="/auth" replace />} />
        <Route path="/profile" element={<Profile />} />

        {/* Protected with sidebar layout */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Layout>
                <Dashboard />
              </Layout>
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/upload"
          element={
            <ProtectedRoute>
              <Layout>
                <UploadPage />
              </Layout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/reports/:reportId"
          element={
            <ProtectedRoute>
              <Layout>
                <ReportsPage />
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;