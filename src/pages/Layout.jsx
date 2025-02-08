import { Navbar, Footer } from '../components/index.js'
import { Outlet } from 'react-router-dom'
import { Loader } from '../components/Loader.jsx'
import { useState, useEffect } from 'react'

function Layout() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <Loader />
  }

  return (
    <>
        <Navbar />
          <Outlet />
        <Footer />
    </>
  )
}

export default Layout
