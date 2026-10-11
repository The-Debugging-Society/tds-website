import { Navbar, Footer } from '../components/index.js';
import { Outlet, useLocation } from 'react-router-dom';
import { Loader } from '../components/Loader.jsx';
import SmoothScroll from '../components/SmoothScroll.jsx';
import { NAV_HEIGHT } from '../lib/constants';
import { useState, useEffect } from 'react';
import ScrollToTop from '../ScrollToTop';  // Import ScrollToTop here

function Layout() {
  const [isLoading, setIsLoading] = useState(true);
  const { pathname } = useLocation();
  const isHome = pathname === '/' || pathname === '/home';

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <SmoothScroll>
      <ScrollToTop />
      <Navbar />
      {/* The navbar is fixed; Home's hero sits under it, every other page starts below it */}
      {!isHome && <div aria-hidden="true" className="bg-[#03050c]" style={{ height: NAV_HEIGHT }} />}
      <Outlet />
      <Footer />
    </SmoothScroll>
  );
}

export default Layout;
