import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FastfoodIcon from "@mui/icons-material/Fastfood";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useAuth } from '../../context/AuthContext';

function Navbar({scrollToSection, homeRef, contactRef, cart = []}) {
  const { user } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const [navSearch, setNavSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const totalCartItems = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && navSearch.trim()) {
      navigate(`/menu?search=${encodeURIComponent(navSearch.trim())}`);
      setNavSearch("");
      setShowSearch(false);
      setIsOpen(false);
    }
  };

  const handleCartClick = () => {
    navigate("/cart");
    setIsOpen(false);
  };

  const handleNavClick = (sectionName, ref) => {
    if (location.pathname !== "/") {
      navigate("/", { state: { scrollTo: sectionName } });
    } else {
      scrollToSection(ref);
    }
  };

  return (
    <div className="fixed top-5 left-0 w-full z-50 px-4 md:px-10">
      <div className="bg-gray-100 rounded-2xl p-4 flex justify-between items-center shadow-md">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => navigate('/')}>
          <FastfoodIcon />
          <h1 className="font-bold text-2xl flex">
            Fast<span className="text-red-500">food</span>
          </h1>
        </div>

        {/* Links */}
        <ul className="hidden lg:flex lg:gap-10 gap-5 font-bold">
          <li 
            className="hover:underline hover:decoration-red-500 decoration-3 underline-offset-8 cursor-pointer" 
            onClick={() => handleNavClick("home", homeRef)}
          >
            Home
          </li>
          <li 
            className="hover:underline hover:decoration-red-500 decoration-3 underline-offset-8 cursor-pointer"  
            onClick={() => navigate('/about')}
          >
            About
          </li>
          <li 
            className="hover:underline hover:decoration-red-500 decoration-3 underline-offset-8 cursor-pointer" 
            onClick={() => navigate('/menu')}
          >
            Menu
          </li>
          <li 
            className="hover:underline hover:decoration-red-500 decoration-3 underline-offset-8 cursor-pointer" 
            onClick={() => navigate('/contact')}
          >
            Contact
          </li>
        </ul>

        {/* Buttons & Search */}
        <div className="hidden md:flex items-center gap-3">
          {/* Expandable Search */}
          <div className="flex items-center gap-2">
            {showSearch && (
              <input
                autoFocus
                type="text"
                value={navSearch}
                onChange={(e) => setNavSearch(e.target.value)}
                onKeyDown={handleSearchSubmit}
                onBlur={() => { if (!navSearch) setShowSearch(false); }}
                className="bg-gray-200 rounded-lg px-3 py-2 w-44 focus:outline-none focus:ring-2 focus:ring-red-500/30 text-sm transition-all"
                placeholder="Search menu..."
              />
            )}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 rounded-lg hover:bg-gray-200 active:scale-95 transition-all cursor-pointer"
              title="Search"
            >
              <SearchIcon fontSize="small" />
            </button>
          </div>

          <button 
            onClick={() => navigate('/menu')}
            className="bg-red-500 hover:bg-red-600 active:scale-95 px-5 py-2 font-bold rounded-lg text-white transition-all cursor-pointer shadow-md hover:shadow-red-200 text-sm"
          >
            Shop Now
          </button>

          {/* Cart Button */}
          <button
            onClick={handleCartClick}
            className="relative p-2 rounded-lg hover:bg-gray-200 active:scale-95 transition-all cursor-pointer"
            title="Cart"
          >
            <ShoppingCartIcon fontSize="small" />
            {totalCartItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center leading-none">
                {totalCartItems > 9 ? '9+' : totalCartItems}
              </span>
            )}
          </button>
          {/* Profile Button */}
          <button
            onClick={() => navigate(user ? '/profile' : '/login')}
            className="relative p-2 rounded-lg hover:bg-gray-200 active:scale-95 transition-all cursor-pointer"
            title={user ? user.name : 'Sign In'}
          >
            {user ? (
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-400 to-red-600 text-white text-xs font-black flex items-center justify-center">
                {user.name?.charAt(0).toUpperCase()}
              </div>
            ) : (
              <AccountCircleIcon fontSize="small" />
            )}
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          className="lg:hidden cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      {isOpen && (
        <div className="lg:hidden mt-2 bg-gray-100 rounded-2xl p-5 shadow-lg">
          <ul className="flex flex-col gap-5 font-bold">
            <li className="cursor-pointer hover:text-red-500 transition" onClick={() => { handleNavClick("home", homeRef); setIsOpen(false); }}>Home</li>
            <li className="cursor-pointer hover:text-red-500 transition" onClick={() => { navigate('/about'); setIsOpen(false); }}>About</li>
            <li className="cursor-pointer hover:text-red-500 transition" onClick={() => { navigate('/menu'); setIsOpen(false); }}>Menu</li>
            <li className="cursor-pointer hover:text-red-500 transition" onClick={() => { navigate('/contact'); setIsOpen(false); }}>Contact</li>
            <li className="cursor-pointer hover:text-red-500 transition font-bold" onClick={() => { navigate(user ? '/profile' : '/login'); setIsOpen(false); }}>
              {user ? `👤 ${user.name}` : '🔑 Sign In'}
            </li>
          </ul>

          <div className="mt-5 flex flex-col gap-3">
            <input
              type="text"
              value={navSearch}
              onChange={(e) => setNavSearch(e.target.value)}
              onKeyDown={handleSearchSubmit}
              className="bg-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-500/30 text-sm"
              placeholder="Search menu..."
            />
            <div className="flex gap-3">
              <button 
                onClick={() => { navigate('/menu'); setIsOpen(false); }}
                className="flex-1 bg-red-500 py-2 rounded-lg text-white font-bold hover:bg-red-600 active:scale-95 transition-all cursor-pointer"
              >
                Shop Now
              </button>
              <button
                onClick={handleCartClick}
                className="relative flex items-center justify-center gap-1 bg-gray-200 px-4 py-2 rounded-lg font-bold hover:bg-gray-300 active:scale-95 transition-all cursor-pointer"
              >
                <ShoppingCartIcon fontSize="small" />
                {totalCartItems > 0 && (
                  <span className="bg-red-500 text-white text-xs font-bold rounded-full px-1.5">
                    {totalCartItems}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar;
