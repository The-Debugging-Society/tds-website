import { Navbar, Footer } from '../components/index.js'
import { Outlet } from 'react-router-dom'
import { Loader } from '../components/Loader.jsx'
import { useState, useEffect } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area.jsx'

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
      <ScrollArea className="h-screen w-full">
      <Navbar />
      <Outlet />
      <Footer />
      </ScrollArea>
    </>
  )
}

export default Layout
