import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaLeaf, FaAward, FaShippingFast, FaUtensils, FaFacebookF, FaTwitter, FaInstagram, FaChevronRight } from "react-icons/fa";
import aboutHero from "../assets/images/restaurant_interior.png";

// Milestones Data
const MILESTONES = [
  {
    year: "2012",
    title: "The First Bite",
    desc: "Started as a single street food truck with a simple goal: serving the juiciest burgers made from fresh local ingredients.",
  },
  {
    year: "2016",
    title: "The First Flagship",
    desc: "Opened our first brick-and-mortar outlet with a cozy interior and expanded menu featuring artisanal pizzas and sides.",
  },
  {
    year: "2020",
    title: "Culinary Recognition",
    desc: "Voted 'Best Fast Casual Dining' in the region, bringing in Michelin-trained chefs to elevate our burger meal recipes.",
  },
  {
    year: "2026",
    title: "Smart Kitchens & Green Sourcing",
    desc: "Transitioned to 100% biodegradable packaging, established direct-from-farm supply chains, and modernized dining.",
  },
];

// Core Values Data
const VALUES = [
  {
    icon: FaLeaf,
    title: "100% Fresh Sourcing",
    desc: "We partner directly with local farms to source daily hand-picked vegetables and organic ingredients.",
    color: "from-emerald-500/20 to-emerald-600/5 text-emerald-500",
  },
  {
    icon: FaUtensils,
    title: "Artisanal Recipes",
    desc: "Our sauces, buns, and seasoned patties are crafted from scratch by our culinary masters daily.",
    color: "from-amber-500/20 to-amber-600/5 text-amber-500",
  },
  {
    icon: FaAward,
    title: "Award-Winning Taste",
    desc: "Consistently recognized for top-notch quality, food safety standards, and unmatched deliciousness.",
    color: "from-red-500/20 to-red-600/5 text-red-500",
  },
  {
    icon: FaShippingFast,
    title: "Express Delivery",
    desc: "Equipped with smart thermal delivery bags to ensure your meals arrive steaming hot within minutes.",
    color: "from-blue-500/20 to-blue-600/5 text-blue-500",
  },
];

// Chefs Data
const ABOUT_CHEFS = [
  {
    name: "Marcus Aurelius",
    role: "Head Executive Chef",
    img: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Elena Rostova",
    role: "Pastry & Dessert Specialist",
    img: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=400",
  },
  {
    name: "Kenji Sato",
    role: "Master Sauce Craftsman",
    img: "https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&q=80&w=400",
  },
];

function About() {
  const navigate = useNavigate();

  // Scroll to top on page mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-[#FAF8F5] text-gray-900 overflow-x-hidden font-sans">
      {/* Hero Banner Section */}
      <div className="relative w-full h-[60vh] min-h-[480px] flex items-center justify-center overflow-hidden pt-28 pb-16">
        {/* Background Image with Parallax & Dark Overlay */}
        <div className="absolute inset-0">
          <img
            src={aboutHero}
            alt="About Us Hero"
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px]"></div>
          {/* Bottom blend to page background */}
          <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-[#FAF8F5] to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mt-10 animate-fade-in">
          <span className="bg-red-500/25 border border-red-500/30 text-red-400 px-4 py-1.5 rounded-full font-bold text-xs uppercase tracking-widest">
            Our Story
          </span>
          <h1 className="text-white text-4xl sm:text-5xl md:text-6xl font-black mt-6 tracking-tight leading-tight">
            Crafting Delightful <br className="hidden sm:inline" />
            Food Experiences Since <span className="text-red-500">2012</span>
          </h1>
          <p className="text-gray-300 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed">
            We combine high-quality local sourcing, culinary expertise, and blazing-fast delivery to serve meals that leave you craving for more.
          </p>
        </div>
      </div>

      {/* ------------------------------------------------------------------------- */}

      {/* Story & Philosophy Section */}
      <div className="py-20 px-6 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Text Column */}
          <div className="flex flex-col gap-6">
            <span className="text-red-500 font-extrabold text-sm uppercase tracking-wider">
              Cooking with Passion
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 leading-tight tracking-tight">
              We Believe Great Food <br />
              Heals the Soul
            </h2>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              At Fastfood, our kitchen isn't just a kitchen; it's a dynamic culinary hub. We started as a group of friends passionate about local flavors, trying to make the absolute finest comfort meals without compromising on freshness or quality.
            </p>
            <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
              Every burger patty is freshly pressed, every crust is hand-stretched, and every sauce recipe is formulated in-house. We strive to create a warm, inviting dining and ordering experience, making gourmet comfort foods accessible to everyone.
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-6 border-t border-gray-200 pt-8 mt-4 text-center">
              <div>
                <span className="block text-3xl sm:text-4xl font-black text-red-500">
                  12+
                </span>
                <span className="text-xs sm:text-sm text-gray-500 font-bold mt-1 block">
                  Years of Journey
                </span>
              </div>
              <div>
                <span className="block text-3xl sm:text-4xl font-black text-red-500">
                  25+
                </span>
                <span className="text-xs sm:text-sm text-gray-500 font-bold mt-1 block">
                  Award Recipes
                </span>
              </div>
              <div>
                <span className="block text-3xl sm:text-4xl font-black text-red-500">
                  150k+
                </span>
                <span className="text-xs sm:text-sm text-gray-500 font-bold mt-1 block">
                  Happy Foodies
                </span>
              </div>
            </div>
          </div>

          {/* Right Image/Collage Column */}
          <div className="relative flex justify-center items-center">
            {/* Background Accent Shape */}
            <div className="absolute -inset-4 bg-red-500/5 rounded-[40px] transform rotate-3 -z-10"></div>
            
            {/* Main Collage Wrapper */}
            <div className="relative w-full max-w-md aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=800"
                alt="Chef placing final touch"
                className="w-full h-full object-cover hover:scale-105 transition duration-500"
              />
              {/* Overlay Label Card */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#160704] text-white p-5 rounded-2xl flex items-center justify-between shadow-xl">
                <div>
                  <h4 className="font-extrabold text-lg text-amber-500">
                    Trusted Sourcing
                  </h4>
                  <p className="text-xs text-gray-300 mt-1">
                    Certified 100% organic local farms
                  </p>
                </div>
                <span className="bg-red-500 h-10 w-10 rounded-full flex items-center justify-center font-bold text-white text-lg">
                  ✓
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------------- */}

      {/* Core Values Section */}
      <div className="bg-white py-20 border-y border-gray-100">
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-red-500 font-extrabold text-sm uppercase tracking-wider">
              Our Foundations
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 mt-3 leading-tight tracking-tight">
              Values That Drive Us
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-4 max-w-xl mx-auto leading-relaxed">
              We focus on consistency, hygiene, and high culinary standards to make every meal a delight.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FAF8F5] p-8 rounded-3xl border border-gray-100 hover:border-red-500/10 hover:shadow-xl hover:shadow-gray-200/50 hover:-translate-y-1.5 transition-all duration-300 group"
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${val.color} flex items-center justify-center mb-6`}>
                    <IconComp className="text-2xl" />
                  </div>
                  <h3 className="font-extrabold text-lg text-gray-950 group-hover:text-red-500 transition-colors">
                    {val.title}
                  </h3>
                  <p className="text-gray-500 text-xs sm:text-sm mt-3 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------------- */}

      {/* Timeline/Milestones Section */}
      <div className="py-20 px-6 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-red-500 font-extrabold text-sm uppercase tracking-wider">
            Our Timeline
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 mt-3 leading-tight tracking-tight">
            Our Historic Milestones
          </h2>
        </div>

        <div className="relative border-l-2 border-red-500/25 max-w-3xl mx-auto pl-8 sm:pl-12 py-4 flex flex-col gap-12">
          {MILESTONES.map((stone, idx) => (
            <div key={idx} className="relative group">
              {/* Pulsing Bullet Point */}
              <div className="absolute -left-[41px] sm:-left-[57px] top-1 bg-red-500 border-4 border-white rounded-full w-5 h-5 flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                <span className="absolute w-5 h-5 rounded-full bg-red-500 animate-ping opacity-30 -z-10"></span>
              </div>

              {/* Milestone Details */}
              <div className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <span className="inline-block bg-[#160704] text-amber-500 px-3 py-1 rounded-lg text-xs font-black tracking-wider uppercase">
                  {stone.year}
                </span>
                <h3 className="font-extrabold text-lg sm:text-xl text-gray-950 mt-3">
                  {stone.title}
                </h3>
                <p className="text-gray-500 text-xs sm:text-sm mt-2 leading-relaxed">
                  {stone.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ------------------------------------------------------------------------- */}

      {/* Meet Our Chefs Section */}
      <div className="bg-white py-20 border-t border-gray-100">
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-red-500 font-extrabold text-sm uppercase tracking-wider">
              The Masters
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-950 mt-3 leading-tight tracking-tight">
              Meet Our Culinary Leaders
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ABOUT_CHEFS.map((chef, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F5] rounded-3xl overflow-hidden border border-gray-100 hover:border-red-500/10 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={chef.img}
                    alt={chef.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#160704]/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-center items-end pb-8">
                    <div className="flex gap-4">
                      <a href="#" className="w-10 h-10 bg-white hover:bg-red-500 text-gray-950 hover:text-white rounded-full flex items-center justify-center shadow-md transition-colors">
                        <FaFacebookF />
                      </a>
                      <a href="#" className="w-10 h-10 bg-white hover:bg-red-500 text-gray-950 hover:text-white rounded-full flex items-center justify-center shadow-md transition-colors">
                        <FaTwitter />
                      </a>
                      <a href="#" className="w-10 h-10 bg-white hover:bg-red-500 text-gray-950 hover:text-white rounded-full flex items-center justify-center shadow-md transition-colors">
                        <FaInstagram />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 text-center">
                  <h3 className="font-extrabold text-lg text-gray-950 group-hover:text-red-500 transition-colors">
                    {chef.name}
                  </h3>
                  <p className="text-gray-400 text-xs font-bold mt-1 uppercase tracking-wider">
                    {chef.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------------- */}

      {/* CTA Footer Banner */}
      <div className="py-20 px-6 max-w-7xl mx-auto">
        <div className="bg-[#160704] rounded-[40px] py-16 px-8 md:px-16 text-center relative overflow-hidden shadow-2xl">
          {/* Decorative Pattern Background */}
          <div
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: "repeating-linear-gradient(45deg, #fff 0px, #fff 1px, transparent 1px, transparent 10px)"
            }}
          ></div>

          <div className="relative z-10 max-w-2xl mx-auto flex flex-col items-center gap-6">
            <span className="bg-amber-500 text-black px-4 py-1.5 rounded-full font-black text-xs uppercase tracking-widest">
              Ready to Order?
            </span>
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
              Enjoy Gourmet Comfort <br />
              Food Delivered Hot
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm max-w-md">
              Order our signature burgers, loaded pizzas, and customized treats now. Safe delivery, directly from our kitchens to your table.
            </p>

            <button
              onClick={() => navigate("/", { state: { scrollTo: "menu" } })}
              className="bg-red-600 hover:bg-red-700 active:scale-95 text-white px-8 py-3.5 rounded-full font-bold text-base mt-4 shadow-lg shadow-red-600/30 hover:scale-105 transition duration-300 flex items-center gap-2 cursor-pointer"
            >
              Order From Menu
              <FaChevronRight className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
