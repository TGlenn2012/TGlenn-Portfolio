import React from 'react';
import { useState, useCallback, useMemo } from 'react';
import ParticlesComponent from './components/Particles';
import './App.css'
import { LoadingScreen } from './components/LoadingScreen';
import { Navbar } from './components/Navbar';
import { MobileMenu } from './components/MobileMenu';
import "./index.css";
import { Home } from './components/sections/Home';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { MicrokARts } from './components/sections/ProjectDetails/MicrokARts';



function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete = {() => setIsLoaded(true)} /> }
      <div 
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-black text-gray-100`}
      > {/* Main App Container */}

        {/* Begin Router Set Up */}
        {/* <Router basename='TGlenn-Portfolio'>
          <div>
            <Link to="/">Home</Link>
            <Link to="/microkarts">MicrokARts</Link>
            <Link to="/about">About</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/contact">Contact</Link>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/microkarts" element={<MicrokARts />} />
              <Route path="/about" element={<About />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </div>
        </Router> */}


        {/* <Router basename="TGlenn-Portfolio">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/microkarts" element={<MicrokARts />} />
          </Routes>
        </Router> */}
        {/* Add more routes for other projects as needed */}

        <ParticlesComponent id="particles" /> {/* Particles Background */}
        <Navbar  menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> {/* Navigation Bar */}
        <MobileMenu  menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> {/* Mobile Menu */}
        <Home /> {/* Home Section */}
        <About /> {/* About Section */}
        <Projects /> {/* Projects Section */}
        <Contact /> {/* Contact Section */}
      </div>
    </>
    );
  }

export default App;
