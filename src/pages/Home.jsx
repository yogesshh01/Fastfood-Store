import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import burgerImg from "../assets/images/foodiimg.png";
import heroVideo from "../assets/images/pizza_bg.mp4";
import { FaPlay, FaShoppingCart, FaCalendarAlt, FaShippingFast, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaLeaf, FaAward, FaBookOpen, FaBolt } from "react-icons/fa";
import restaurantInterior from "../assets/images/restaurant_interior.png";
import burger from "../assets/images/burgerimg.jpg";
import pizza from "../assets/images/pizza.jpg";
import wrap from "../assets/images/wrap.jpg";
import desert from "../assets/images/desert.jpg";
import flotingburger from "../assets/images/flotingburger.jpg";
import cef1 from "../assets/images/cef1.jpg";
import cef2 from "../assets/images/cef2.jpg";
import cef3 from "../assets/images/cef3.jpg";
import cef4 from "../assets/images/cef4.jpg";
import { useNavigate } from "react-router-dom";
import { FOOD_ITEMS } from "../utils/foodData";

const CATEGORIES = [
  { id: "all", name: "All Items", image: burger },
  { id: "pizza", name: "Pizza", image: pizza },
  { id: "wrap", name: "Wrap", image: wrap },
  { id: "dessert", name: "Dessert", image: desert },
  { id: "burger", name: "Burger", image: burger },
];

const MENU_CATEGORIES = ["All", "Pizza", "Burger", "Wrap", "Dessert"];

const CHEFS = [
  {
    id: 1,
    name: "Alice Mortal",
    role: "Head Chef",
    experience: "12 years experience",
    image: cef1,
  },
  {
    id: 2,
    name: "Michael Corn",
    role: "Grill Master",
    experience: "8 years experience",
    image: cef2,
  },
  {
    id: 3,
    name: "Faz Chowdel",
    role: "Pastry Chef",
    experience: "10 years experience",
    image: cef3,
  },
  {
    id: 4,
    name: "William Latnum",
    role: "Pizza Artisan",
    experience: "9 years experience",
    image: cef4,
  },
];



function Landing({ aboutRef, homeRef, menuRef }) {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState("All");
  const [timeLeft, setTimeLeft] = useState({
    hours: 24,
    minutes: 0,
    seconds: 0,
  });
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const target = location.state.scrollTo;
      window.history.replaceState({}, document.title);
      
      setTimeout(() => {
        if (target === "home" && homeRef.current) {
          homeRef.current.scrollIntoView({ behavior: "smooth" });
        } else if (target === "about" && aboutRef.current) {
          aboutRef.current.scrollIntoView({ behavior: "smooth" });
        } else if (target === "menu" && menuRef.current) {
          menuRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location, homeRef, aboutRef, menuRef]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.hours === 0 && prev.minutes === 0 && prev.seconds === 0) {
          clearInterval(timer);
          return prev;
        }
        let s = prev.seconds - 1;
        let m = prev.minutes;
        let h = prev.hours;
        if (s < 0) {
          s = 59;
          m -= 1;
        }
        if (m < 0) {
          m = 59;
          h -= 1;
        }
        return { hours: h, minutes: m, seconds: s };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const filteredItems = activeCategory === "All"
    ? FOOD_ITEMS
    : FOOD_ITEMS.filter((item) => item.category === activeCategory);
    


  return (
    <>
      {/* Hero Section */}
      <div ref={homeRef} className="relative w-full min-h-screen overflow-hidden">
        <video
          src={heroVideo}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover object-right"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent"></div>

        {/* Content */}
        <div className="absolute inset-0 flex items-center">
          <div className="px-6 sm:px-10 md:px-16 lg:px-24 xl:px-32 max-w-3xl">
            <div className="font-bold leading-tight">
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
                Delicious
              </p>
              <p className="text-red-500 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                Fast Food
              </p>
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
                for Every
              </p>
              <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white">
                Moment
              </p>
            </div>

            <p className="mt-6 text-sm sm:text-base md:text-lg text-gray-200 max-w-xl">
              Experience bold flavors crafted from premium ingredients. From
              crispy burgers to gourmet pizzas — every bite is an adventure
              worth savoring.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-5 sm:gap-10">
              <button
                onClick={() => menuRef.current?.scrollIntoView({ behavior: "smooth" })}
                className="bg-red-500 text-white font-bold px-6 py-3 rounded-2xl w-fit hover:bg-red-600 transition shadow-lg hover:shadow-red-500/20 cursor-pointer"
              >
                Explore Menu
              </button>

              <div className="flex items-center gap-3">
                <button className="bg-white h-12 w-12 sm:h-14 sm:w-14 rounded-full flex items-center justify-center shadow-lg hover:scale-105 transition cursor-pointer">
                  <FaPlay className="text-red-500 text-xl sm:text-2xl ml-0.5" />
                </button>
                <p className="font-medium text-sm sm:text-base text-white">
                  Watch Our Story
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Section */}
      <div className="h-fit w-full bg-orange-50/50 dark:bg-gray-950/20 py-16 px-6 md:px-16 lg:px-24 xl:px-32" ref={aboutRef}>
        <div className="text-center">
          <p className="text-red-500 text-xl font-semibold uppercase tracking-wider">
            What We Offer
          </p>
          <h1 className="flex justify-center items-center sm:text-5xl text-3xl sm:mt-4 mt-2 font-bold text-gray-900 dark:text-white">
            Browse by <span className="text-red-500 ml-3">Category</span>
          </h1>
          <p className="mt-4 sm:text-lg text-sm text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
            From sizzling burgers to exotic world cuisines - find your favourite in our menu.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-12 place-items-center">
          {CATEGORIES.map((cat, index) => {
            const normalizedCategory = cat.name === "All Items" ? "All" : cat.name;
            const isActive = activeCategory === normalizedCategory;
            return (
              <div
                key={index}
                onClick={() => {
                  setActiveCategory(normalizedCategory);
                  menuRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
                className={`bg-white dark:bg-gray-900 rounded-3xl p-6 w-full flex flex-col items-center cursor-pointer transition-all duration-300 border hover:scale-105 hover:shadow-lg ${isActive
                    ? "border-red-500 shadow-md ring-2 ring-red-500/20"
                    : "border-gray-100 dark:border-gray-800 shadow-sm"
                  }`}
              >
                <div className="h-32 w-32 rounded-2xl overflow-hidden shadow-inner">
                  <img src={cat.image} alt={cat.name} className="h-full w-full object-cover transition-transform duration-300 hover:scale-110" />
                </div>
                <h3 className={`font-bold mt-4 text-center transition-colors ${isActive ? "text-red-500" : "text-gray-800 dark:text-gray-200"}`}>
                  {cat.name}
                </h3>
              </div>
            );
          })}
        </div>
      </div>

      {/* Our Story Section */}
      <div ref={aboutRef} className="w-full py-20 px-6 md:px-16 lg:px-24 xl:px-32 bg-white dark:bg-gray-900/40">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side: Images Collage */}
          <div className="relative w-full flex items-center justify-center lg:justify-start">
            {/* Main large image */}
            <div className="relative w-full max-w-2xl aspect-video rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={restaurantInterior}
                alt="Restaurant interior"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
              {/* Overlapping Red Badge */}
              <div className="absolute top-6 left-6 bg-red-600 text-white rounded-2xl px-6 py-4 flex flex-col items-center justify-center shadow-xl z-20">
                <span className="text-3xl font-extrabold tracking-tight">12+</span>
                <span className="text-xs uppercase font-bold text-center leading-tight mt-1 text-red-100">
                  Years of<br />Excellence
                </span>
              </div>
            </div>

            {/* Inset smaller image */}
            <div className="absolute -bottom-10 right-0 sm:right-6 lg:-right-4 w-48 sm:w-64 aspect-square rounded-2xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl z-10 hidden sm:block">
              <img
                src={pizza}
                alt="Signature dish close up"
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
            </div>
          </div>

          {/* Right Side: Content and features list */}
          <div className="flex flex-col gap-6">
            <div>
              <p className="text-red-500 font-serif italic text-lg sm:text-xl">
                Our Story
              </p>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 text-gray-900 dark:text-white leading-tight">
                We Invite You to Visit <br className="hidden sm:inline" />
                Our <span className="text-red-500">Food Restaurant</span>
              </h1>
              <div className="w-12 h-1 bg-red-500 mt-4 rounded-full"></div>
            </div>

            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base leading-relaxed">
              Founded in 2012, Sarab began as a small corner joint with a big dream - to serve food that brings people together. Today we're proud to serve thousands of happy customers every week with the same passion that started it all.
            </p>

            <div className="flex flex-col gap-5 mt-2">
              {/* Highlight 1 */}
              <div className="flex gap-4 items-start hover:bg-gray-50 dark:hover:bg-gray-800/40 p-2.5 -mx-2.5 rounded-2xl transition duration-300">
                <div className="bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400 rounded-xl p-3 flex items-center justify-center shrink-0">
                  <FaLeaf className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900 dark:text-white text-base">100% Fresh Ingredients</h4>
                  <p className="text-gray-400 dark:text-gray-400 text-xs sm:text-sm mt-1 leading-relaxed">
                    We source locally and sustainably. Every ingredient is hand-picked daily for maximum freshness.
                  </p>
                </div>
              </div>

              {/* Highlight 2 */}
              <div className="flex gap-4 items-start hover:bg-gray-50 dark:hover:bg-gray-800/40 p-2.5 -mx-2.5 rounded-2xl transition duration-300">
                <div className="bg-amber-50 dark:bg-amber-950/30 text-amber-500 dark:text-amber-400 rounded-xl p-3 flex items-center justify-center shrink-0">
                  <FaAward className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900 dark:text-white text-base">Award-Winning Recipes</h4>
                  <p className="text-gray-400 dark:text-gray-400 text-xs sm:text-sm mt-1 leading-relaxed">
                    Our signature recipes have won national culinary awards 5 years in a row.
                  </p>
                </div>
              </div>

              {/* Highlight 3 */}
              <div className="flex gap-4 items-start hover:bg-gray-50 dark:hover:bg-gray-800/40 p-2.5 -mx-2.5 rounded-2xl transition duration-300">
                <div className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-500 dark:text-emerald-400 rounded-xl p-3 flex items-center justify-center shrink-0">
                  <FaShippingFast className="text-2xl" />
                </div>
                <div>
                  <h4 className="font-extrabold text-gray-900 dark:text-white text-base">Lightning-Fast Delivery</h4>
                  <p className="text-gray-400 dark:text-gray-400 text-xs sm:text-sm mt-1 leading-relaxed">
                    Order online and get hot, fresh food at your door in under 25 minutes, guaranteed.
                  </p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => menuRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="bg-red-600 hover:bg-red-700 active:scale-95 text-white px-6 py-3.5 rounded-2xl w-fit font-bold flex items-center gap-2.5 shadow-lg shadow-red-600/20 transition duration-300 mt-4 cursor-pointer text-sm tracking-wide"
            >
              <FaBookOpen className="text-base" />
              View Full Menu
            </button>
          </div>
        </div>
      </div>      {/* Menu Section */}
      <div className="h-fit w-full bg-orange-100/30 dark:bg-gray-950/10 py-20 px-6 md:px-16 lg:px-24 xl:px-32" ref={menuRef}>
        <div className="text-center">
          <p className="text-red-500 text-xl font-semibold uppercase tracking-wider">
            What's Cooking
          </p>
          <h1 className="flex justify-center items-center sm:text-5xl text-3xl mt-4 font-bold text-gray-900 dark:text-white">
            Our Delicious <span className="text-red-500 ml-3">Menu</span>
          </h1>
        </div>

        {/* Filter Navigation */}
        <div className="flex justify-center mt-10">
          <ul className="flex flex-wrap justify-center items-center gap-3 sm:gap-5">
            {MENU_CATEGORIES.map((cat) => (
              <li
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-2xl font-bold cursor-pointer transition-all duration-300 shadow-sm ${activeCategory === cat
                    ? "bg-red-500 text-white shadow-red-200 shadow-lg scale-105"
                    : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 hover:bg-red-500 hover:text-white dark:hover:bg-red-500 dark:hover:text-white"
                  }`}
              >
                {cat}
              </li>
            ))}
          </ul>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate(`/product/${item.id}`)}
              className="bg-white dark:bg-gray-900 rounded-3xl flex flex-col overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:-translate-y-1 cursor-pointer"
            >
              <div className="overflow-hidden h-60 w-full relative">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
                />
                <span className="absolute top-4 right-4 bg-white/95 dark:bg-gray-900/95 backdrop-blur-xs text-red-500 font-bold px-3 py-1 rounded-full text-xs shadow-sm">
                  {item.category}
                </span>
              </div>

              <div className="p-6 flex flex-col grow">
                <h3 className="font-bold text-lg text-gray-950 dark:text-white">
                  {item.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2 grow leading-relaxed">
                  {item.description}
                </p>

                <div className="flex justify-between items-center mt-6">
                  <span className="text-red-500 font-extrabold text-2xl">
                    ${item.price.toFixed(2)}
                  </span>
                  <button className="bg-red-500 hover:bg-red-600 active:scale-95 text-white font-bold text-xl rounded-full h-10 w-10 flex justify-center items-center shadow-md hover:shadow-red-200 transition-all cursor-pointer">
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={() => {
              setActiveCategory("All");
              navigate('/menu');
            }}
            className="bg-red-600 hover:bg-red-700 active:scale-95 text-white px-6 py-2.5 rounded-full font-bold text-base transition-all duration-300 shadow-lg hover:shadow-red-600/20 hover:scale-105 cursor-pointer"
          >
            View Full Menu
          </button>
        </div>
      </div>

      {/* ----------------------------------------------------------------------------------------- */}

      {/* Offer Section */}
      <div 
        className="bg-[#160704] py-16 px-6 md:px-12 lg:px-20 xl:px-28 flex flex-col lg:flex-row justify-between items-center gap-10 overflow-hidden relative"
        style={{
          backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.01) 0px, rgba(255,255,255,0.01) 1px, transparent 1px, transparent 10px)"
        }}
      >
        <div className="flex flex-col gap-5 max-w-2xl z-10 lg:translate-x-12">
          <span className="bg-amber-500 text-black px-3.5 py-1.5 w-fit rounded-lg font-extrabold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-md">
            <FaBolt className="text-xs" />
            Limited Time Offer
          </span>
          <h1 className="text-white lg:text-5xl md:text-4xl text-3xl font-bold leading-tight tracking-tight">
            Get 30% Off <br />
            Our Signature <br />
            <span className="text-amber-500 font-bold">Burger</span> Meal
          </h1>
          <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-lg">
            Don't miss our weekend special - grab our award-winning signature burger combo with loaded fries and a premium shake at an unbeatable price.
          </p>

          {/* Live Countdown Timer */}
          <div className="flex gap-4 mt-3">
            {/* Hours */}
            <div className="border border-white/10 rounded-2xl p-3.5 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center min-w-20 sm:min-w-24 hover:border-amber-500/30 transition-all duration-300">
              <span className="text-3xl font-black text-white tracking-tight">
                {String(timeLeft.hours).padStart(2, "0")}
              </span>
              <span className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">
                Hours
              </span>
            </div>
            {/* Minutes */}
            <div className="border border-white/10 rounded-2xl p-3.5 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center min-w-20 sm:min-w-24 hover:border-amber-500/30 transition-all duration-300">
              <span className="text-3xl font-black text-white tracking-tight">
                {String(timeLeft.minutes).padStart(2, "0")}
              </span>
              <span className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">
                Minutes
              </span>
            </div>
            {/* Seconds */}
            <div className="border border-white/10 rounded-2xl p-3.5 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center min-w-20 sm:min-w-24 hover:border-amber-500/30 transition-all duration-300">
              <span className="text-3xl font-black text-white tracking-tight">
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
              <span className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-wider">
                Seconds
              </span>
            </div>
          </div>

          <button 
            onClick={() => menuRef.current?.scrollIntoView({ behavior: "smooth" })}
            className="bg-red-600 hover:bg-red-700 active:scale-95 text-white px-7 py-3 rounded-full w-fit text-base font-bold flex items-center gap-2.5 mt-5 shadow-lg shadow-red-600/30 hover:shadow-red-600/40 hover:scale-105 transition duration-300 cursor-pointer"
          >
            <FaShoppingCart className="text-white text-xl" />
            Grab the Deal
          </button>
        </div>

        {/* Floating image on the right */}
        <div className="hidden lg:flex justify-center items-center z-10 lg:-translate-x-20 lg:pt-6">
          <div className="relative">
            <span className="absolute z-20 top-6 -left-6 bg-red-600 rounded-full text-base font-extrabold text-white py-3 px-3 shadow-lg rotate-12 animate-pulse">
              $17.49
            </span>
            <img
              src={flotingburger}
              alt="Floating burger special offer"
              className="h-auto max-w-sm rounded-3xl shadow-2xl animate-soft-bounce"
            />
          </div>
        </div>
      </div>

      {/* Showcase Grid */}
      <div className="flex flex-col gap-5 h-full w-full py-20 px-6 md:px-16 lg:px-24 xl:px-32">
        <div className="text-center mb-6">
          <p className="text-lg font-bold text-red-500 uppercase tracking-wider">
            Food Showcase
          </p>
          <h1 className="sm:text-5xl text-3xl font-bold flex justify-center items-center mt-2 text-gray-900 dark:text-white">
            Let's See Our <span className="text-red-500 ml-2">Fast Food</span>
          </h1>
        </div>

        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:row-span-2 h-96 md:h-full overflow-hidden rounded-3xl shadow-sm hover:shadow-md transition duration-300">
              <img
                src={burger}
                alt="Smash burger showcase"
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
            </div>

            <div className="h-64 md:h-80 overflow-hidden rounded-3xl shadow-sm hover:shadow-md transition duration-300">
              <img
                src={pizza}
                alt="Neapolitan pizza showcase"
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
            </div>

            <div className="h-64 md:h-80 overflow-hidden rounded-3xl shadow-sm hover:shadow-md transition duration-300">
              <img
                src={wrap}
                alt="Tortilla wrap showcase"
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
            </div>

            <div className="relative h-64 md:h-80 overflow-hidden rounded-3xl shadow-sm hover:shadow-md transition duration-300">
              <img
                src={desert}
                alt="Dessert chocolate cake showcase"
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
            </div>

            <div className="h-64 md:h-80 overflow-hidden rounded-3xl shadow-sm hover:shadow-md transition duration-300">
              <img
                src={wrap}
                alt="Crunchy wrap showcase"
                className="w-full h-full object-cover hover:scale-110 transition duration-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Chefs Section */}
      <div className="w-full h-fit py-16 px-6 md:px-16 lg:px-24 xl:px-32 bg-orange-50/30 dark:bg-gray-950/10">
        <div className="text-center">
          <h3 className="text-red-500 text-lg font-bold uppercase tracking-wider">
            The Culinary Team
          </h3>
          <h1 className="flex justify-center items-center lg:text-5xl text-3xl font-bold mt-2 text-gray-900 dark:text-white">
            Meet Our Expert <span className="ml-2 text-red-500">Chefs</span>
          </h1>
        </div>

        <div className="grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-8 mt-12">
          {CHEFS.map((chef) => (
            <div
              key={chef.id}
              className="bg-white dark:bg-gray-900 rounded-3xl flex flex-col items-center overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800"
            >
              <div className="h-64 w-full overflow-hidden">
                <img
                  src={chef.image}
                  alt={chef.name}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-110"
                />
              </div>

              <div className="p-6 text-center w-full">
                <h3 className="font-bold text-gray-900 dark:text-white text-xl">
                  {chef.name}
                </h3>
                <p className="text-red-500 font-semibold text-sm mt-1">
                  {chef.role}
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">
                  {chef.experience}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Opening Hours & Contact Info Section */}
      <div 
        className="relative bg-[#13382c] py-12 px-6 md:px-12 lg:px-20 text-white overflow-hidden" 
        style={{
          backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 8px)"
        }}
      >
        <div className="text-center">
          <p className="text-amber-400 font-serif italic text-base sm:text-lg">
            Opening Hours
          </p>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-1 text-white">
            We're Open <span className="text-amber-400">For You</span>
          </h1>
          <div className="w-12 h-1 bg-amber-500 mx-auto mt-3 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-10 max-w-7xl mx-auto items-stretch">
          {/* Days/Hours Card */}
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#091f18]/40 hover:border-white/20 transition-all duration-300">
            <div className="flex flex-col gap-4">
              {/* Monday - Tuesday */}
              <div className="flex justify-between items-center text-sm border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <FaCalendarAlt className="text-amber-500 text-base" />
                  <span className="font-semibold text-gray-200">Monday - Tuesday</span>
                </div>
                <div className="flex items-center gap-1.5 text-red-400 font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse"></span>
                  Closed
                </div>
              </div>

              {/* Wednesday - Thursday */}
              <div className="flex justify-between items-center text-sm border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <FaCalendarAlt className="text-amber-500 text-base" />
                  <span className="font-semibold text-gray-200">Wednesday - Thursday</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  09:00 AM - 10:00 PM
                </div>
              </div>

              {/* Friday */}
              <div className="flex justify-between items-center text-sm border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <FaCalendarAlt className="text-amber-500 text-base" />
                  <span className="font-semibold text-gray-200">Friday</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  09:00 AM - 11:00 PM
                </div>
              </div>

              {/* Saturday */}
              <div className="flex justify-between items-center text-sm border-b border-white/10 pb-3">
                <div className="flex items-center gap-2.5">
                  <FaCalendarAlt className="text-amber-500 text-base" />
                  <span className="font-semibold text-gray-200">Saturday</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  10:00 AM - 11:30 PM
                </div>
              </div>

              {/* Sunday */}
              <div className="flex justify-between items-center text-sm pb-1">
                <div className="flex items-center gap-2.5">
                  <FaCalendarAlt className="text-amber-500 text-base" />
                  <span className="font-semibold text-gray-200">Sunday</span>
                </div>
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  11:00 AM - 09:00 PM
                </div>
              </div>
            </div>
          </div>

          {/* Order Online Card */}
          <div className="bg-red-600 rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-xl shadow-red-950/30 border border-red-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-900/40 hover:-translate-y-1 transition-all duration-300 min-h-80">
            <div className="bg-white/10 p-3.5 rounded-full mb-4">
              <FaShippingFast className="text-white text-4xl" />
            </div>
            <h2 className="text-2xl font-extrabold text-white mb-1.5">
              Order Online
            </h2>
            <p className="text-red-100 text-xs mb-5 max-w-xs leading-relaxed">
              Get hot food delivered in 25 minutes
            </p>
            <button 
              onClick={() => menuRef.current?.scrollIntoView({ behavior: "smooth" })}
              className="bg-white hover:bg-gray-100 hover:scale-105 active:scale-95 text-red-600 font-extrabold px-6 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg hover:shadow-red-900/20 cursor-pointer text-xs tracking-wider uppercase"
            >
              Order Now ?
            </button>
          </div>

          {/* Contact Details Card */}
          <div className="bg-white/5 backdrop-blur-md rounded-3xl p-6 border border-white/10 flex flex-col justify-between hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#091f18]/40 hover:border-white/20 transition-all duration-300">
            <div>
              <h2 className="text-xl font-extrabold text-white border-l-4 border-amber-500 pl-2.5 mb-5">
                Find Us
              </h2>
              <div className="flex flex-col gap-4">
                {/* Address */}
                <div className="flex justify-between items-start text-sm border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <FaMapMarkerAlt className="text-amber-500 text-base" />
                    <span className="font-semibold text-gray-200">Address</span>
                  </div>
                  <span className="text-gray-400 font-medium text-right ml-4 text-xs sm:text-sm">42 Flavor Street, NY</span>
                </div>

                {/* Phone */}
                <div className="flex justify-between items-center text-sm border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2.5">
                    <FaPhoneAlt className="text-amber-500 text-base" />
                    <span className="font-semibold text-gray-200">Phone</span>
                  </div>
                  <span className="text-gray-400 font-medium text-right text-xs sm:text-sm">+1 (800) 123-4567</span>
                </div>

                {/* Email */}
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-2.5">
                    <FaEnvelope className="text-amber-500 text-base" />
                    <span className="font-semibold text-gray-200">Email</span>
                  </div>
                  <span className="text-amber-400 font-medium hover:underline cursor-pointer text-xs sm:text-sm">hello@sarabfood.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Landing;
