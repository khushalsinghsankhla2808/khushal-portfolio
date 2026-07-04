import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import SmoothScroll from './components/layout/SmoothScroll';
import LoadingScreen from './components/ui/LoadingScreen';
import BackgroundEffects from './components/ui/BackgroundEffects';
import CustomCursor from './components/ui/CustomCursor';

function ScrollToHashElement() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]);

  return null;
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <SmoothScroll>
      <Router>
        <CustomCursor />
        <BackgroundEffects />
        
        <AnimatePresence mode="wait">
          {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} key="loading" />}
        </AnimatePresence>

        <div 
          className={`flex flex-col min-h-screen transition-opacity duration-1000 delay-300 ${isLoading ? 'opacity-0 h-screen overflow-hidden' : 'opacity-100'}`}
        >
          <Navbar />
          <ScrollToHashElement />
          <div className="grow">
            <Routes>
              <Route path="/" element={<Home />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </SmoothScroll>
  );
}

export default App;
