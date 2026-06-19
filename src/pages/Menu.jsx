import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  FaSearch, FaShoppingCart, FaTimes, FaStar, FaLeaf,
  FaFire, FaPercentage, FaChevronLeft, FaChevronRight
} from "react-icons/fa";
import { FOOD_ITEMS } from "../utils/foodData";

// Highlight matching search text
const highlightText = (text, highlight) => {
  if (!highlight || !highlight.trim()) return text;
  const regex = new RegExp(`(${highlight.replace(/[-\\^$*+?.()|[\]{}]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return parts.map((part, index) =>
    regex.test(part) ? (
      <mark key={index} className="bg-amber-100 text-gray-900 rounded-sm px-0.5 font-bold">
        {part}
      </mark>
    ) : part
  );
};

const menuSections = [
  { id: "burger",  name: "Burgers",  category: "Burger",  icon: "🍔", desc: "Premium ground beef patties pressed fresh, served in toasted buttered brioche buns." },
  { id: "pizza",   name: "Pizzas",   category: "Pizza",   icon: "🍕", desc: "Authentic wood-fired sourdough pizzas with imported cheeses and fresh homemade sauces." },
  { id: "wrap",    name: "Wraps",    category: "Wrap",    icon: "🌯", desc: "Vibrant wraps packed with tender grilled meats, fresh crisp greens, and flavorful sauces." },
  { id: "dessert", name: "Desserts", category: "Dessert", icon: "🍰", desc: "Irresistibly sweet cakes and slices crafted daily by our pastry chef to satisfy your cravings." },
];

function Menu({ setCart }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const navigate = useNavigate();

  const setSearchQuery = (val) => {
    if (val) setSearchParams({ search: val });
    else setSearchParams({});
  };

  const [toastMessage, setToastMessage] = useState("");
  // activePage = index of menuSections (0=Burger, 1=Pizza, 2=Wrap, 3=Dessert)
  const [activePage, setActivePage] = useState(0);

  // Scroll to top on mount and on page change
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, []);
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [activePage]);

  // Reset to first page when search changes
  useEffect(() => { setActivePage(0); }, [searchQuery]);

  const currentSection = menuSections[activePage];

  // Filter items for the current section
  const getFilteredItems = (categoryName) =>
    FOOD_ITEMS.filter((item) => {
      const matchesCategory = item.category === categoryName;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

  // All filtered items across all sections (for search no-results)
  const totalFilteredItems = menuSections.reduce(
    (acc, sec) => acc + getFilteredItems(sec.category).length,
    0
  );

  const triggerToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing)
        return prev.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i));
      return [...prev, { ...item, quantity: 1 }];
    });
    triggerToast(item.name);
  };

  const goToPage = (idx) => {
    if (idx >= 0 && idx < menuSections.length) setActivePage(idx);
  };

  const currentItems = getFilteredItems(currentSection.category);

  return (
    <div className="w-full bg-[#FAF8F5] dark:bg-gray-950 text-gray-900 dark:text-white overflow-x-clip font-sans min-h-screen pb-20">

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-2xl p-4 flex items-center gap-3.5 max-w-sm min-w-[280px] overflow-hidden">
          <div className="w-10 h-10 bg-emerald-50 dark:bg-emerald-950/30 rounded-xl flex items-center justify-center shrink-0 border border-emerald-100 dark:border-emerald-900/50">
            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="flex-1 min-w-0 pr-2">
            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">Added to Cart</p>
            <p className="text-sm font-bold text-gray-800 dark:text-white truncate mt-1.5 leading-none">{toastMessage}</p>
          </div>
          <button onClick={() => navigate("/cart")} className="text-xs font-black text-red-500 hover:text-red-600 hover:underline cursor-pointer shrink-0 whitespace-nowrap ml-1">
            View Cart →
          </button>
          <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-emerald-500 to-green-400 animate-shrink-width" />
        </div>
      )}

      {/* Hero Banner */}
      <div className="relative w-full overflow-hidden" style={{ paddingTop: "180px", paddingBottom: "80px" }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&q=80&w=1600"
            alt="Menu Background"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#FAF8F5] dark:from-gray-950 to-transparent" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto flex flex-col items-center gap-4">
          <span className="text-red-500 font-extrabold text-xs sm:text-sm uppercase tracking-widest bg-red-50 dark:bg-red-950/20 px-5 py-2 rounded-full border border-red-200 dark:border-red-900/30">
            Our Menu
          </span>
          <h1 className="text-white text-4xl sm:text-5xl font-black mt-2 tracking-tight leading-tight">
            Delicious Comfort Food, <span className="text-red-500">Custom Crafted</span>
          </h1>
          <p className="text-gray-300 text-sm max-w-xl mx-auto leading-relaxed">
            Browse our fresh categories, search for ingredients, and build your gourmet order instantly.
          </p>
          {/* Search */}
          <div className="relative w-full max-w-md mt-2 shadow-sm">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, ingredients..."
              className="w-full bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-full pl-11 pr-11 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all placeholder:text-gray-400 border border-gray-100 dark:border-gray-800"
            />
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
            {searchQuery && (
              <button onClick={() => setSearchQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 cursor-pointer">
                <FaTimes />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── CATEGORY TAB PAGINATION BAR ─────────────────────────────────────────── */}
      <div className="sticky top-[84px] z-30 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-sm border-b border-gray-100 dark:border-gray-800 py-4 px-6">
        <div className="max-w-7xl mx-auto flex justify-center items-center gap-3 overflow-x-auto scrollbar-none">
          <span className="text-gray-400 text-xs uppercase font-extrabold tracking-wider mr-2 hidden md:inline shrink-0">
            Category:
          </span>
          {menuSections.map((sec, idx) => {
            const count = getFilteredItems(sec.category).length;
            if (searchQuery.trim() !== "" && count === 0) return null;
            const isActive = activePage === idx;
            return (
              <button
                key={idx}
                onClick={() => goToPage(idx)}
                className={`font-extrabold text-sm px-5 py-2.5 rounded-xl transition-all duration-200 flex items-center gap-2 cursor-pointer whitespace-nowrap border ${
                  isActive
                    ? "bg-red-500 text-white border-red-500 shadow-md shadow-red-500/25 scale-[1.03]"
                    : "bg-white dark:bg-gray-900 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:border-red-400 hover:bg-red-50 dark:hover:bg-red-950/20 hover:text-red-500"
                }`}
              >
                <span className="text-base">{sec.icon}</span>
                <span>{sec.name}{searchQuery.trim() ? ` (${count})` : ""}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Deal Banner (only on Burger page) */}
      {activePage === 0 && !searchQuery.trim() && (
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-32 mt-12">
          <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-5">
              <div className="bg-red-50 dark:bg-red-950/30 text-red-500 rounded-2xl p-4 shrink-0">
                <FaPercentage className="text-2xl animate-pulse" />
              </div>
              <div>
                <span className="bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase tracking-wider">
                  Deal of the Day
                </span>
                <h3 className="font-bold text-lg sm:text-xl text-gray-900 dark:text-white mt-2">
                  Order BBQ Bacon Deluxe &amp; Get Free Cold Shake!
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1">
                  Add the legendary smoky BBQ bacon burger to your order today and unlock an instant custom beverage treat.
                </p>
              </div>
            </div>
            <button
              onClick={() => addToCart(FOOD_ITEMS[1])}
              className="bg-red-500 hover:bg-red-600 active:scale-95 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md transition duration-300 cursor-pointer shrink-0"
            >
              Add Deal to Cart
            </button>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT AREA ───────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-32 py-12">

        {/* Search: No Results */}
        {searchQuery.trim() !== "" && totalFilteredItems === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center bg-white dark:bg-gray-900 rounded-[32px] border border-gray-100 dark:border-gray-800 max-w-2xl mx-auto shadow-xs">
            <div className="bg-red-50 dark:bg-red-950/30 text-red-500 rounded-full p-6 mb-6">
              <FaSearch className="text-4xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">No matching items found</h3>
            <p className="text-gray-500 dark:text-gray-400 max-w-md mb-8">
              We couldn't find anything matching "{searchQuery}". Try checking spelling or search another dish.
            </p>
            <button onClick={() => setSearchQuery("")} className="bg-red-500 hover:bg-red-600 active:scale-95 text-white font-bold px-6 py-3 rounded-2xl shadow-md transition-all cursor-pointer">
              Clear Search
            </button>
          </div>
        ) : searchQuery.trim() !== "" && currentItems.length === 0 ? (
          /* Current category empty during search - show "no items here" message */
          <div className="text-center py-16 text-gray-400 dark:text-gray-500">
            <p className="text-lg font-semibold">No {currentSection.name} match your search.</p>
            <p className="text-sm mt-1">Try another category or clear the search.</p>
          </div>
        ) : (
          <>
            {/* Section Header */}
            <div className="border-b border-gray-100 dark:border-gray-800 pb-4 mb-10 flex items-end justify-between">
              <div>
                <h2 className="text-3xl font-black text-gray-900 dark:text-white flex items-center gap-3">
                  <span>{currentSection.icon}</span>
                  <span>{currentSection.name}</span>
                  <span className="text-xs font-normal text-gray-400 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 px-2 py-0.5 rounded-full ml-1">
                    {currentItems.length} {currentItems.length === 1 ? "item" : "items"}
                  </span>
                </h2>
                <p className="text-gray-400 text-sm mt-1.5 max-w-xl">{currentSection.desc}</p>
              </div>
              {/* Page indicator */}
              <span className="text-xs font-bold text-gray-400 dark:text-gray-500 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 px-3 py-1.5 rounded-full shrink-0 ml-4 hidden sm:inline">
                {activePage + 1} / {menuSections.length}
              </span>
            </div>

            {/* Food Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentItems.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="bg-white dark:bg-gray-900 rounded-2xl flex flex-col overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-800 group cursor-pointer hover:-translate-y-1"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-50 dark:bg-gray-950">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 right-3 bg-black/50 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 z-10">
                      <FaStar className="text-amber-400 text-[10px]" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col grow bg-white dark:bg-gray-900">
                    <h3 className="font-bold text-lg text-gray-900 dark:text-white group-hover:text-red-500 transition-colors duration-200 leading-tight">
                      {highlightText(item.name, searchQuery)}
                    </h3>

                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {item.veg && (
                        <span className="bg-emerald-50 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/50 font-extrabold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase flex items-center gap-1">
                          <FaLeaf className="text-[9px]" /> Veg
                        </span>
                      )}
                      {item.spicy && (
                        <span className="bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400 border border-red-100 dark:border-red-900/50 font-extrabold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase flex items-center gap-1">
                          <FaFire className="text-[9px]" /> Spicy
                        </span>
                      )}
                      {item.chefsChoice && (
                        <span className="bg-amber-50 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-100 dark:border-amber-900/50 font-extrabold px-2 py-0.5 rounded text-[10px] tracking-wide uppercase flex items-center gap-1">
                          <FaStar className="text-[9px]" /> Chef's Spec
                        </span>
                      )}
                    </div>

                    <p className="text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-3 leading-relaxed grow">
                      {highlightText(item.description, searchQuery)}
                    </p>

                    <div className="flex justify-between items-center mt-5 border-t border-gray-100 dark:border-gray-800 pt-4">
                      <span className="text-red-500 font-extrabold text-xl">${item.price.toFixed(2)}</span>
                      <button
                        onClick={(e) => { e.stopPropagation(); addToCart(item); }}
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
          </>
        )}
      </div>

      {/* ── CATEGORY NAVIGATION (Prev / Page dots / Next) ───────────────────────── */}
      {!(searchQuery.trim() !== "" && totalFilteredItems === 0) && (
        <div className="max-w-7xl mx-auto px-6 md:px-16 lg:px-24 xl:px-32 pb-4">
          <div className="flex items-center justify-between gap-4 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl px-6 py-4 shadow-sm">

            {/* Prev */}
            <button
              onClick={() => goToPage(activePage - 1)}
              disabled={activePage === 0}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border transition-all duration-200 cursor-pointer ${
                activePage === 0
                  ? "opacity-40 cursor-not-allowed border-gray-100 dark:border-gray-800 text-gray-400 bg-gray-50 dark:bg-gray-900"
                  : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:border-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 shadow-sm"
              }`}
            >
              <FaChevronLeft className="text-xs" />
              {activePage > 0 ? (
                <span className="hidden sm:inline">
                  {menuSections[activePage - 1].icon} {menuSections[activePage - 1].name}
                </span>
              ) : (
                <span>Prev</span>
              )}
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2.5">
              {menuSections.map((sec, idx) => (
                <button
                  key={idx}
                  onClick={() => goToPage(idx)}
                  title={sec.name}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === activePage
                      ? "bg-red-500 w-8 h-3 shadow-md shadow-red-500/30"
                      : "bg-gray-200 dark:bg-gray-700 hover:bg-red-300 w-3 h-3"
                  }`}
                />
              ))}
            </div>

            {/* Next */}
            <button
              onClick={() => goToPage(activePage + 1)}
              disabled={activePage === menuSections.length - 1}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-sm border transition-all duration-200 cursor-pointer ${
                activePage === menuSections.length - 1
                  ? "opacity-40 cursor-not-allowed border-gray-100 dark:border-gray-800 text-gray-400 bg-gray-50 dark:bg-gray-900"
                  : "border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:border-red-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 shadow-sm"
              }`}
            >
              {activePage < menuSections.length - 1 ? (
                <span className="hidden sm:inline">
                  {menuSections[activePage + 1].icon} {menuSections[activePage + 1].name}
                </span>
              ) : (
                <span>Next</span>
              )}
              <FaChevronRight className="text-xs" />
            </button>

          </div>
        </div>
      )}
    </div>
  );
}

export default Menu;
