import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import NavBar from './components/NavBar';
import Welcome from './pages/Welcome';
import Profile from './pages/Profile';
import Authentication from './pages/Authentication';
import Achievements from './pages/Achievements';
import NotFound from './pages/NotFound'
import PrivateRoute from './components/PrivateRoute';
import Forums from './pages/Forums';

function App() {
  return(
    <BrowserRouter>     
        <NavBar />
          <Routes>
            <Route exact path="/" element={<Welcome />} />
            <Route exact path="/profile" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
            } />
            <Route exact path="/Achievements" element={<Achievements />} />
            <Route exact path="/Forums" element={<Forums/>} />
            <Route exact path="/authentication" element={<Authentication />} />
            <Route path="*" element={<Navigate to="/404" />} />
            <Route path="/404" element={<NotFound />} />
          </Routes>  
    </BrowserRouter>
  )
}

export default App;
