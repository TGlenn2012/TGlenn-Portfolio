import React, { Suspense, lazy } from 'react';
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
// Lazy load project detail pages for code splitting
const MicrokARts = lazy(() => import('./components/sections/ProjectDetails/MicrokARts'));
const StoryMakAR = lazy(() => import('./components/sections/ProjectDetails/StoryMakAR'));
const IoTMaker = lazy(() => import('./components/sections/ProjectDetails/IoTMaker'));
const ShARedIoT = lazy(() => import('./components/sections/ProjectDetails/ShARedIoT'));
const SixDOFRoboticArm = lazy(() => import('./components/sections/ProjectDetails/SixDOFRoboticArm'));
const IoTCourse = lazy(() => import('./components/sections/ProjectDetails/IoTCourse'));
import "@fontsource/oswald"; // Defaults to weight 400
import { useAnalytics } from './hooks/useAnalytics';
import { ScrollToTop } from './components/ScrollToTop';
import { ChatbotButton } from './components/ChatbotButton';
import { ChatWindow } from './components/ChatWindow';


function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  
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
      <ScrollToTop />
      <div 
        className={`min-h-screen transition-opacity duration-700 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } bg-black text-gray-100`}
      > {/* Main App Container */}
          <ParticlesComponent id="particles" /> {/* Particles Background */}
          <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> {/* Navigation Bar */}
          <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> {/* Mobile Menu */}
          
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-screen">
              <div className="text-gray-300">Loading...</div>
            </div>
          }>
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
              <Route path="/sharediot" element={<ShARedIoT />} />
              <Route path="/microkarts" element={<MicrokARts />} />
              <Route path="/6dof" element={<SixDOFRoboticArm />} />
              <Route path="/iotcourse" element={<IoTCourse />} />
            </Routes>
          </Suspense>
          
          {/* Chatbot Components */}
          <ChatbotButton onClick={() => setChatOpen(true)} />
          <ChatWindow isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      </div>
      </BrowserRouter>
    </>
    );
  }

export default App;
