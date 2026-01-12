import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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
import { ShARedIoT } from './components/sections/ProjectDetails/ShARedIoT';
import { SixDOFRoboticArm } from './components/sections/ProjectDetails/SixDOFRoboticArm';
import { IoTCourse } from './components/sections/ProjectDetails/IoTCourse';
import { FamilyTreeApp } from './components/sections/ProjectDetails/FamilyTreeApp';
import "@fontsource/oswald"; // Defaults to weight 400
import { useAnalytics } from './hooks/useAnalytics';
import { ScrollToTop } from './components/ScrollToTop';
import { ChatbotButton } from './components/ChatbotButton';
import { ChatWindow } from './components/ChatWindow';


function App() {
  // Only show loading screen on the home page, skip for other pages (like case studies opened in new tabs)
  const [isLoaded, setIsLoaded] = useState(() => window.location.pathname !== "/");
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
        } text-gray-100`}
      > {/* Main App Container */}
          <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> {/* Navigation Bar */}
          <MobileMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} /> {/* Mobile Menu */}
          
          <Routes>
            <Route path="/" element={
              <>
        <Home /> {/* Home Section */}
        <Projects /> {/* Projects Section */}
        <Contact /> {/* Contact Section */}
              </>
            } />
            <Route path="/about" element={<About />} />
            <Route path="/storymakar" element={<StoryMakAR />} />
            <Route path="/iotmaker" element={<IoTMaker />} />
            <Route path="/sharediot" element={<ShARedIoT />} />
            <Route path="/microkarts" element={<MicrokARts />} />
            <Route path="/6dof" element={<SixDOFRoboticArm />} />
            <Route path="/iotcourse" element={<IoTCourse />} />
            <Route path="/familytreeapp" element={<FamilyTreeApp />} />
          </Routes>
          
          {/* Chatbot Components */}
          <ChatbotButton onClick={() => setChatOpen(true)} />
          <ChatWindow isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      </div>
      </BrowserRouter>
    </>
    );
  }

export default App;
