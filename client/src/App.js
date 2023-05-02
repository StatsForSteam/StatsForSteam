import {BrowserRouter, Routes, Route} from 'react-router-dom';
import NavBar from './components/NavBar';
import Welcome from './pages/Welcome';
import Profile from './pages/Profile';
import Achievements from './pages/Achievements';

function App() {
  return(
    <BrowserRouter>
      <div>
        <NavBar />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/Achievements" element={<Achievements />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;