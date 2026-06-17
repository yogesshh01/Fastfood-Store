import { useState, useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaTimes, FaStar, FaLeaf, FaFire, FaPercentage } from "react-icons/fa";


// Food Items Data
const FOOD_ITEMS = [
  {
    id: 1,
    name: "Classic Smash Burger",
    category: "Burger",
    price: 13.99,
    rating: 4.8,
    reviews: 142,
    image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400",
    description: "Double smashed beef patty, melted cheddar, caramelized onions, pickles & signature house special sauce.",
    veg: false,
    spicy: false,
    chefsChoice: true,
  },
  {
    id: 2,
    name: "BBQ Bacon Deluxe",
    category: "Burger",
    price: 15.49,
    rating: 4.9,
    reviews: 98,
    image: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?auto=format&fit=crop&q=80&w=400",
    description: "Crispy applewood bacon, double cheddar, smoky hickory BBQ sauce, and crispy onion rings.",
    veg: false,
    spicy: false,
    chefsChoice: false,
  },
  {
    id: 3,
    name: "Spicy Jalapeño Burger",
    category: "Burger",
    price: 14.99,
    rating: 4.7,
    reviews: 76,
    image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?auto=format&fit=crop&q=80&w=400",
    description: "Spiced beef patty, melted pepper jack cheese, grilled jalapeños, and fiery chipotle mayo.",
    veg: false,
    spicy: true,
    chefsChoice: false,
  },
  {
    id: 4,
    name: "Margherita Classica",
    category: "Pizza",
    price: 16.99,
    rating: 4.9,
    reviews: 184,
    image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&q=80&w=400",
    description: "Fresh mozzarella, organic basil leaves, signature San Marzano tomato sauce, and cold-pressed olive oil.",
    veg: true,
    spicy: false,
    chefsChoice: true,
  },
  {
    id: 5,
    name: "Spicy Pepperoni Feast",
    category: "Pizza",
    price: 18.49,
    rating: 4.8,
    reviews: 215,
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=400",
    description: "Double pepperoni layers, spicy cup-and-char pepperoni, mozzarella, and a drizzle of hot honey.",
    veg: false,
    spicy: true,
    chefsChoice: false,
  },
  {
    id: 6,
    name: "Truffle Mushroom Garden",
    category: "Pizza",
    price: 19.99,
    rating: 4.6,
    reviews: 58,
    image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=400",
    description: "Creamy white sauce, wild forest mushrooms, fontina cheese, fresh baby arugula, and truffle oil.",
    veg: true,
    spicy: false,
    chefsChoice: false,
  },
  {
    id: 7,
    name: "Chicken Caesar Wrap",
    category: "Wrap",
    price: 12.49,
    rating: 4.7,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1626700051175-6518c4793fde?auto=format&fit=crop&q=80&w=400",
    description: "Crispy breaded chicken tenders, crunchy romaine lettuce, shaved parmesan, and garlic Caesar dressing.",
    veg: false,
    spicy: false,
    chefsChoice: false,
  },
  {
    id: 8,
    name: "Spicy Mexican Wrap",
    category: "Wrap",
    price: 11.99,
    rating: 4.8,
    reviews: 89,
    image: "https://images.unsplash.com/photo-1541518763669-27fef04b14ea?auto=format&fit=crop&q=80&w=400",
    description: "Grilled lime-coriander chicken, black beans, sweet roasted corn, avocado chunks, and chipotle salsa.",
    veg: false,
    spicy: true,
    chefsChoice: false,
  },
  {
    id: 9,
    name: "Vegan Garden Wrap",
    category: "Wrap",
    price: 10.99,
    rating: 4.5,
    reviews: 45,
    image: "https://images.unsplash.com/photo-1626700051175-6518c4793fde?auto=format&fit=crop&q=80&w=400",
    description: "Grilled sweet peppers, zucchini, house-made roasted garlic hummus, and fresh organic baby spinach.",
    veg: true,
    spicy: false,
    chefsChoice: false,
  },
  {
    id: 10,
    name: "Molten Lava Chocolate Cake",
    category: "Dessert",
    price: 8.99,
    rating: 4.9,
    reviews: 230,
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&q=80&w=400",
    description: "Warm dark chocolate cake with a gooey liquid chocolate core, served with vanilla bean ice cream.",
    veg: true,
    spicy: false,
    chefsChoice: true,
  },
  {
    id: 11,
    name: "Classic New York Cheesecake",
    category: "Dessert",
    price: 9.49,
    rating: 4.8,
    reviews: 154,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&q=80&w=400",
    description: "Rich, dense, and creamy traditional cheesecake slice served with homemade sweet strawberry compote.",
    veg: true,
    spicy: false,
    chefsChoice: false,
  },
];

// Highlight matching search text
const highlightText = (text, highlight) => {
  if (!highlight || !highlight.trim()) return text;
  const regex = new RegExp(`(${highlight.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="bg-amber-100 text-gray-900 rounded-sm px-0.5 font-bold">
        {part}
      </mark>
    ) : (
      part
    )
  );
};

function Menu({ cart, setCart }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const setSearchQuery = (val) => {
    if (val) {
      setSearchParams({ search: val });
    } else {
      setSearchParams({});
    }
  };
  const [toastMessage, setToastMessage] = useState("");
  const [activeSection, setActiveSection] = useState("burger");

  // Refs for Category sections
  const burgerRef = useRef(null);
  const pizzaRef = useRef(null);
  const wrapRef = useRef(null);
  const dessertRef = useRef(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Robust window scroll listener scroll-spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220; // offset for sticky nav + spacing

      const sections = [
        { id: "burger", ref: burgerRef },
        { id: "pizza", ref: pizzaRef },
        { id: "wrap", ref: wrapRef },
        { id: "dessert", ref: dessertRef },
      ];

      // Loop backwards to find the current active section
      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec.ref.current) {
          const top = sec.ref.current.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sec.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Trigger once on mount in case page is loaded scrolled down
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuSections = [
    { id: "burger", name: "Burgers", category: "Burger", icon: "🍔", desc: "Premium ground beef patties pressed fresh, served in toasted buttered brioche buns." },
    { id: "pizza", name: "Pizzas", category: "Pizza", icon: "🍕", desc: "Authentic wood-fired sourdough pizzas with imported cheeses and fresh homemade sauces." },
    { id: "wrap", name: "Wraps", category: "Wrap", icon: "🌯", desc: "Vibrant wraps packed with tender grilled meats, fresh crisp greens, and flavorful sauces." },
    { id: "dessert", name: "Desserts", category: "Dessert", icon: "🍰", desc: "Irresistibly sweet cakes and slices crafted daily by our pastry chef to satisfy your cravings." },
  ];

  const getSectionRef = (id) => {
    if (id === "burger") return burgerRef;
    if (id === "pizza") return pizzaRef;
    if (id === "wrap") return wrapRef;
    return dessertRef;
  };

  // Filter helper inside sections
  const getFilteredSectionItems = (categoryName) => {
    return FOOD_ITEMS.filter((item) => {
      const matchesCategory = item.category === categoryName;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  };

  // Toast trigger helper
  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  // Add to cart action
  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, quantity: 1 }];
    });
    triggerToast(`🛒 ${item.name} added to cart!`);
  };

  // Total filtered items based on search query
  const totalFilteredItems = menuSections.reduce(
    (acc, sec) => acc + getFilteredSectionItems(sec.category).length,
    0
  );

  // Smooth scroll helper
  const handleScrollToSection = (id, sectionRef) => {
    setActiveSection(id);
    if (sectionRef.current) {
      const offset = 130; // accounting for sticky category nav
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = sectionRef.current.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="w-full bg-[#FAF8F5] text-gray-900 overflow-x-clip font-sans min-h-screen pb-16">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 left-6 z-50 bg-[#160704] text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-amber-500/20 animate-bounce">
          <span className="font-extrabold text-sm">{toastMessage}</span>
        </div>
      )}

      {/* Hero Banner Section */}
      <div className="relative w-full overflow-hidden" style={{ paddingTop: "180px", paddingBottom: "80px" }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1600"
            alt="Menu Premium Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65"></div>
          {/* Bottom blend transition */}
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAF8F5] to-transparent"></div>
        </div>

        {/* Content - Simple & Professional */}
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col items-center gap-4">
          <span className="text-red-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest bg-red-50 px-5 py-2 rounded-full border border-red-200 shadow-xs">
            Our Menu
          </span>
          <h1 className="text-white text-4xl sm:text-5xl font-black mt-2 tracking-tight leading-tight">
            Delicious Comfort Food, <span className="text-red-500">Custom Crafted</span>
          </h1>
          <p className="text-gray-300 text-sm max-w-xl mx-auto leading-relaxed">
            Browse our fresh categories, search for ingredients, and build your gourmet order instantly.
          </p>

          {/* Clean Search Input */}
          <div className="relative w-full max-w-md mt-2 shadow-sm">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, ingredients..."
              className="w-full bg-white text-gray-900 rounded-full pl-11 pr-11 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all placeholder:text-gray-400 border border-gray-100"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 cursor-pointer"
              >
                <FaTimes />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* STICKY CATEGORY NAV BAR */}
      {!(searchQuery.trim() !== "" && totalFilteredItems === 0) && (
        <div className="sticky top-[84px] z-30 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100 py-4 px-6">
          <div className="max-w-7xl mx-auto flex justify-center items-center gap-3 overflow-x-auto scrollbar-none">
            <span className="text-gray-400 text-xs uppercase font-extrabold tracking-wider mr-4 hidden md:inline">
              Quick Jump:
            </span>
            {menuSections.map((sec, idx) => {
              const sectionItems = getFilteredSectionItems(sec.category);
              const matchesCount = sectionItems.length;
              if (searchQuery.trim() !== "" && matchesCount === 0) return null;

              const isActive = activeSection === sec.id;
              return (
                <button
                  key={idx}
                  onClick={() => handleScrollToSection(sec.id, getSectionRef(sec.id))}
                  className={`font-extrabold text-sm px-6 py-2.5 rounded-xl transition-all duration-300 flex items-center gap-2 cursor-pointer whitespace-nowrap border ${
                    isActive
                      ? "bg-red-500 text-white border-red-500 shadow-md shadow-red-500/20 scale-[1.02]"
                      : "bg-white text-gray-700 border-gray-200 hover:border-red-500/30 hover:bg-red-50 hover:text-red-500"
                  }`}
                >
                  <span className="text-base">{sec.icon}</span>
                  <span>
                    {sec.name}
                    {searchQuery.trim() !== "" && ` (${matchesCount})`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* SPOTLIGHT SPECIAL DEAL BANNER */}
      {!searchQuery.trim() && (
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-32 mt-12">
          <div className="bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-5">
              <div className="bg-red-50 text-red-500 rounded-2xl p-4 flex items-center justify-center shrink-0">
                <FaPercentage className="text-2xl animate-pulse" />
              </div>
              <div>
                <span className="bg-red-100 text-red-700 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider">
                  Deal of the Day
                </span>
                <h3 className="font-bold text-lg sm:text-xl text-gray-900 mt-2">
                  Order BBQ Bacon Deluxe & Get Free Cold Shake!
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm mt-1">
                  Add the legendary smoky BBQ bacon burger to your order today and unlock an instant custom beverage treat.
                </p>
              </div>
            </div>
            <button
              onClick={() => addToCart(FOOD_ITEMS[1])} // Add BBQ Bacon Deluxe
              className="bg-red-500 hover:bg-red-600 active:scale-95 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition duration-300 cursor-pointer shrink-0"
            >
              Add Deal to Cart
            </button>
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------------- */}

      {/* DYNAMIC FOOD SECTIONS */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-12 flex flex-col gap-20">
        {searchQuery.trim() !== "" && totalFilteredItems === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white rounded-[32px] border border-gray-100 max-w-2xl mx-auto w-full shadow-xs">
            <div className="bg-red-50 text-red-500 rounded-full p-6 mb-6">
              <FaSearch className="text-4xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No matching items found</h3>
            <p className="text-gray-500 max-w-md mb-8">
              We couldn't find anything matching "{searchQuery}". Try checking for spelling errors or search for another dish.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="bg-red-500 hover:bg-red-600 active:scale-95 text-white font-bold px-6 py-3 rounded-2xl shadow-md transition-all cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        ) : (
          menuSections.map((sec, sectionIdx) => {
            const sectionItems = getFilteredSectionItems(sec.category);

            // Hide empty category sections when search is active
            if (searchQuery.trim() !== "" && sectionItems.length === 0) return null;

            return (
              <div key={sectionIdx} ref={getSectionRef(sec.id)} id={sec.id} className={`scroll-mt-32 ${sec.id !== 'burger' ? 'pt-6 md:pt-8' : ''}`}>
                {/* Section Header */}
                <div className="border-b border-gray-100 pb-3 mb-8 flex items-end justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                      <span>{sec.icon}</span>
                      <span>{sec.name}</span>
                      <span className="text-xs font-normal text-gray-400 bg-gray-50 border border-gray-100 px-2 py-0.5 rounded-full ml-1">
                        {sectionItems.length} {sectionItems.length === 1 ? 'item' : 'items'}
                      </span>
                    </h2>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1 max-w-xl">
                      {sec.desc}
                    </p>
                  </div>
                </div>

                {/* Grid of Items */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {sectionItems.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl flex flex-col overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 group"
                    >
                      {/* Image Frame with Minimal Rating */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-50">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-103"
                        />
                        
                        {/* Rating Badge Right Top */}
                        <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 z-10">
                          <FaStar className="text-amber-400 text-[10px]" />
                          <span>{item.rating}</span>
                        </div>
                      </div>

                      {/* Details */}
                      <div className="p-5 flex flex-col grow bg-white">
                        <h3 className="font-bold text-lg text-gray-900 group-hover:text-red-500 transition-colors duration-200 leading-tight">
                          {highlightText(item.name, searchQuery)}
                        </h3>

                        {/* Dietary Tags inside Details */}
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {item.veg && (
                            <span className="bg-emerald-50 text-emerald-700 border border-emerald-100 font-extrabold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase flex items-center gap-1">
                              <FaLeaf className="text-[9px]" /> Veg
                            </span>
                          )}
                          {item.spicy && (
                            <span className="bg-red-50 text-red-700 border border-red-100 font-extrabold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase flex items-center gap-1">
                              <FaFire className="text-[9px]" /> Spicy
                            </span>
                          )}
                          {item.chefsChoice && (
                            <span className="bg-amber-50 text-amber-700 border border-amber-100 font-extrabold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase flex items-center gap-1">
                              <FaStar className="text-[9px]" /> Chef's Spec
                            </span>
                          )}
                        </div>

                        <p className="text-gray-500 text-xs sm:text-sm mt-3 leading-relaxed grow">
                          {highlightText(item.description, searchQuery)}
                        </p>

                        {/* Price & Add Action */}
                        <div className="flex justify-between items-center mt-5 border-t border-gray-100 pt-4">
                          <span className="text-red-500 font-extrabold text-xl">
                            ${item.price.toFixed(2)}
                          </span>
                          <button
                            onClick={() => addToCart(item)}
                            className="bg-red-500 hover:bg-red-600 active:scale-95 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-sm transition-all duration-200 cursor-pointer"
                          >
                            <FaShoppingCart className="text-[10px]" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Menu;
