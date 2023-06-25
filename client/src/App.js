import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Welcome from './pages/Welcome';
import Profile from './pages/Profile';
import Achievements from './pages/Achievements';
import Authentication from './pages/Authentication';
import Forums from './pages/Forums';
import NotFound from './pages/NotFound';
import Contact from './pages/Contact';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/profile" element={<PrivateRoute Component={Profile} /> }/>
          <Route path="/achievements" element={<PrivateRoute Component={Achievements} /> } />
          <Route path="/forums" element={<PrivateRoute Component={Forums} /> } />
          <Route path="/authentication" element={<Authentication />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/404" />} />
          <Route path="/404" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;