import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Alumni from './pages/Alumni'
import NotFound from './pages/NotFound'
import { Loader } from './components/Loader'
import { useState, useEffect } from 'react'

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust this duration to fit your needs
    return () => clearTimeout(timer);
  }, []);
  if (isLoading) {
    return <Loader />;
  }
  return (
    <div className='min-h-screen bg-gray-700'>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/alumni' element={<Alumni />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
