import { useRef, useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import About from './pages/About'
import Menu from './pages/Menu'
import Cart from './pages/Cart'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Profile from './pages/Profile'
import EditProfile from './pages/EditProfile'
import ProductDetail from './pages/ProductDetail'

// Layout
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'

// UI / Guards
import PrivateRoute from './components/ui/PrivateRoute'

// Auth
import { AuthProvider } from './context/AuthContext'

import './App.css'

function AppLayout({ cart, setCart, scrollToSection, homeRef, contactRef, aboutRef, menuRef }) {
  const location = useLocation();
  const hideNavFooter = location.pathname === '/login' || location.pathname.startsWith('/product/');

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      {!hideNavFooter && (
        <Navbar
          scrollToSection={scrollToSection}
          homeRef={homeRef}
          cart={cart}
        />
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Home
              aboutRef={aboutRef}
              homeRef={homeRef}
              menuRef={menuRef}
            />
          }
        />
        <Route path="/about" element={<About />} />
        <Route path="/menu" element={<Menu setCart={setCart} />} />
        <Route path="/product/:id" element={<ProductDetail cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        
        {/* Protected — requires valid JWT */}
        <Route
          path="/editprofile"
          element={
            <PrivateRoute>
              <EditProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile cart={cart} />
            </PrivateRoute>
          }
        />
      </Routes>

      {!hideNavFooter && <Footer contactRef={contactRef} />}
    </>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const aboutRef = useRef(null);
  const homeRef = useRef(null);
  const menuRef = useRef(null);
  const contactRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppLayout
          cart={cart}
          setCart={setCart}
          scrollToSection={scrollToSection}
          homeRef={homeRef}
          contactRef={contactRef}
          aboutRef={aboutRef}
          menuRef={menuRef}
        />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App
