import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ImageInputPage from './pages/ImageInputPage';
import PolypPred from './pages/PolypPred';
import LungPred from './pages/LungPred';
import BrainPred from './pages/BrainPred';
import ChatPage from './pages/Chat';
import AboutPage from './pages/About';
import ContactPage from './pages/Contact';
import MentalChatPage from './pages/MentalHealthChat';
import RegularImage from './pages/RegularImage';
import ServicesPage from './pages/Services';
import './App.css'; // Ensure to import the CSS file

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <div className="content-wrapper"> {/* Add this wrapper with the padding class */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/ImageInputPage" element={<ImageInputPage />} />
            <Route path='/processPolyp' element={<PolypPred />} />
            <Route path='/processLung' element={<LungPred />} />
            <Route path='/processBrain' element={<BrainPred />} />
            <Route path='/chat' element={<ChatPage />} />
            <Route path='/about' element={<AboutPage />} />
            <Route path='/contact' element={<ContactPage />} />
            <Route path='/mchat' element={<MentalChatPage />} />
            <Route path='/processReg' element={<RegularImage />} />
            <Route path='/services' element={<ServicesPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
