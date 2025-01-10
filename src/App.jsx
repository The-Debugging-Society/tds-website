import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Contact from './pages/Contact'
import Alumni from './pages/Alumni'
import NotFound from './pages/NotFound'

const App = () => {
  return (
    <div className='min-h-screen bg-gray-700'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/alumni' element={<Alumni />} />
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
