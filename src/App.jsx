import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { StoryMakAR } from './components/sections/ProjectDetails/StoryMakAR';
import { IoTMaker } from './components/sections/ProjectDetails/IoTMaker';
import "@fontsource/oswald"; // Defaults to weight 400
import { useAnalytics } from './hooks/useAnalytics';


function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Initialize Google Analytics
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  const { trackPageView } = useAnalytics(measurementId);
  
  // Track initial page view
  useEffect(() => {
    if (isLoaded && measurementId) {
      trackPageView(window.location.pathname);
    }
  }, [isLoaded, measurementId, trackPageView]);

  return (
    <>
      {!isLoaded && <LoadingScreen onComplete = {() => setIsLoaded(true)} /> }
      <BrowserRouter>
      <div 
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-black text-gray-100`}
      > {/* Main App Container */}
          <ParticlesComponent id="particles" /> {/* Particles Background */}
          <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> {/* Navigation Bar */}
          <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> {/* Mobile Menu */}
          
          <Routes>
            <Route path="/" element={
              <>
        <Home /> {/* Home Section */}
        <About /> {/* About Section */}
        <Projects /> {/* Projects Section */}
        <Contact /> {/* Contact Section */}
              </>
            } />
            <Route path="/storymakar" element={<StoryMakAR />} />
            <Route path="/iotmaker" element={<IoTMaker />} />
          </Routes>
      </div>
      </BrowserRouter>
    </>
    );
  }

export default App;
