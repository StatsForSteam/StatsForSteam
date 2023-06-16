import {BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import NavBar from './components/NavBar';
import Welcome from './pages/Welcome';
import Profile from './pages/Profile';
import Achievements from './pages/Achievements';
import Authentication from './pages/Authentication';
import Forums from './pages/Forums';
import NotFound from './pages/NotFound'

function App() {
  return(
    <BrowserRouter>     
        <NavBar />
          <Routes>
            <Route exact path="/" element={<Welcome />} />
            <Route exact path="/profile" element={<Profile />} />
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
