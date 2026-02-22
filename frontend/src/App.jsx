import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Review from './pages/Review';
import Travel from './pages/Travel';
import Stay from './pages/Stay';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Emergency from './pages/Emergency';
import Heatmap from './pages/Heatmap';
import Location from './pages/Location';
// 1. The About import is right here at the top!
import About from './pages/About'; 

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <div className="bg-gradient-to-br from-pink-100 via-rose-50 to-white min-h-screen font-sans selection:bg-pink-500 selection:text-white text-slate-900 transition-colors duration-500">
        <Navbar />
        <main className="pt-20">
          <Routes>
            {/* Make sure the stay route has the /:name parameter! */}
            <Route path="/travel/:name" element={<Travel />} />
            <Route path="/review/:name" element={<Review />} />
            <Route path="/stay/:name" element={<Stay />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/emergency" element={<Emergency />} />
            <Route path="/heatmap" element={<Heatmap />} />
            <Route path="/location/:name" element={<Location />} />
            <Route path="/heatmap/:name" element={<Heatmap />} />
            {/* 2. The About route is safely inside the <Routes> block! */}
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;