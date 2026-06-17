import { useNavigate } from "react-router-dom";
import {
  FaUser, FaEnvelope, FaShoppingBag, FaSignOutAlt,
  FaStar, FaHeart, FaMapMarkerAlt, FaEdit, FaShieldAlt
} from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

function Profile({ cart }) {
  const navigate = useNavigate();
  const { user, token, logout } = useAuth();

  const handleEditProfile = () => {
    navigate("/editprofile");
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex flex-col items-center justify-center px-4 pt-28 pb-16 font-sans">
        <div className="text-center">
          <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaUser className="text-red-300 text-5xl" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Not Signed In</h2>
          <p className="text-gray-400 text-sm mb-8">Please sign in to view your profile.</p>
          <button
            onClick={() => navigate("/login")}
            className="bg-red-500 hover:bg-red-600 active:scale-95 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg hover:shadow-red-200 cursor-pointer"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  const initial = user.name?.charAt(0).toUpperCase();
  const cartCount = cart?.reduce((a, i) => a + i.quantity, 0) || 0;
  const cartTotal = cart?.reduce((a, i) => a + i.price * i.quantity, 0) || 0;

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  // Show first 40 chars of token for display
  const tokenPreview = token ? `${token.substring(0, 40)}...` : '';

  const stats = [
    { label: "Orders", value: "12", icon: <FaShoppingBag className="text-red-400" /> },
    { label: "Favourites", value: "5", icon: <FaHeart className="text-pink-400" /> },
    { label: "Reviews", value: "8", icon: <FaStar className="text-amber-400" /> },
  ];

  const recentOrders = [
    { name: "Classic Smash Burger", date: "Jun 14, 2025", price: "$13.99", status: "Delivered" },
    { name: "BBQ Bacon Deluxe", date: "Jun 10, 2025", price: "$15.49", status: "Delivered" },
    { name: "Margherita Classica", date: "Jun 5, 2025", price: "$12.99", status: "Delivered" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-16 font-sans">
      <div className="max-w-5xl mx-auto px-4 md:px-8">

        {/* Profile Header Card */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white font-black text-4xl shadow-lg shadow-red-200 shrink-0">
            {initial}
          </div>

          {/* Info */}
          <div className="flex-1 text-center sm:text-left">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
              <h1 className="text-2xl font-black text-gray-900 capitalize">{user.name}</h1>
              <span className="inline-block bg-green-50 text-green-600 border border-green-200 text-xs font-bold px-3 py-1 rounded-full">
                ✓ Verified Member
              </span>
            </div>
            <p className="text-gray-400 text-sm mt-1 flex items-center justify-center sm:justify-start gap-1.5">
              <FaEnvelope className="text-xs" /> {user.email}
            </p>
            <p className="text-gray-400 text-xs mt-0.5 flex items-center justify-center sm:justify-start gap-1.5">
              <FaMapMarkerAlt className="text-xs" /> {user.location || "New York, USA"}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3 shrink-0">
            <button onClick={handleEditProfile} className="flex items-center gap-2 border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold text-sm px-4 py-2.5 rounded-xl transition-all cursor-pointer active:scale-95">
              <FaEdit className="text-xs" /> Edit Profile
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-50 hover:bg-red-100 text-red-500 font-bold text-sm px-4 py-2.5 rounded-xl transition-all cursor-pointer active:scale-95"
            >
              <FaSignOutAlt className="text-xs" /> Logout
            </button>
          </div>
        </div>

        {/* Profile Info and JWT row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Personal Information */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-gray-800 text-sm mb-3">About Me</h3>
              <p className="text-gray-600 text-sm italic mb-4 leading-relaxed">
                "{user.bio || "Food lover and passionate developer."}"
              </p>
            </div>
            <div className="border-t border-gray-50 pt-3 flex flex-col gap-2">
              <p className="text-xs text-gray-400 flex items-center gap-2">
                <span className="font-bold text-gray-700">Phone:</span> {user.phone || "+1 234 567 890"}
              </p>
              <p className="text-xs text-gray-400 flex items-center gap-2">
                <span className="font-bold text-gray-700">Location:</span> {user.location || "New York, USA"}
              </p>
            </div>
          </div>

          {/* JWT Token Display */}
          <div className="bg-white rounded-2xl border border-emerald-100 shadow-sm p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <FaShieldAlt className="text-xs" />
                </div>
                <h3 className="font-bold text-gray-800 text-sm">Active JWT Session</h3>
                <span className="ml-auto bg-emerald-50 text-emerald-600 border border-emerald-200 text-xs font-bold px-2.5 py-0.5 rounded-full">● Active</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-3 border border-gray-100">
                <p className="text-[11px] font-mono text-gray-500 break-all leading-relaxed">{tokenPreview}</p>
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">Token expires in 7 days. Stored securely in localStorage.</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {stats.map((s, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center gap-2 hover:shadow-md transition-all">
              <div className="text-2xl">{s.icon}</div>
              <p className="font-black text-2xl text-gray-900">{s.value}</p>
              <p className="text-gray-400 text-xs font-medium">{s.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bold text-gray-800 text-base flex items-center gap-2">
                <FaShoppingBag className="text-red-400" /> Recent Orders
              </h2>
              <button onClick={() => navigate("/menu")} className="text-xs text-red-500 hover:underline font-semibold cursor-pointer">
                Order Again →
              </button>
            </div>
            <div className="flex flex-col gap-3">
              {recentOrders.map((order, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{order.name}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-gray-800 text-sm">{order.price}</p>
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-semibold">{order.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Cart + Quick Links */}
          <div className="flex flex-col gap-4">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-gray-800 text-sm mb-4">🛒 Cart Summary</h3>
              {cartCount === 0 ? (
                <div className="text-center py-4">
                  <p className="text-gray-400 text-xs mb-3">Your cart is empty</p>
                  <button onClick={() => navigate("/menu")} className="bg-red-500 hover:bg-red-600 text-white text-xs font-bold px-4 py-2 rounded-xl cursor-pointer active:scale-95 transition-all">Browse Menu</button>
                </div>
              ) : (
                <>
                  <p className="text-gray-500 text-xs mb-1">{cartCount} item{cartCount > 1 ? "s" : ""} in cart</p>
                  <p className="font-black text-red-500 text-xl mb-4">${cartTotal.toFixed(2)}</p>
                  <button onClick={() => navigate("/cart")} className="w-full bg-red-500 hover:bg-red-600 active:scale-95 text-white font-bold py-2.5 rounded-xl text-xs transition-all cursor-pointer">View Cart →</button>
                </>
              )}
            </div>

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-bold text-gray-800 text-sm mb-4">Quick Links</h3>
              <div className="flex flex-col gap-2">
                {[
                  { label: "Browse Menu", path: "/menu", icon: "🍔" },
                  { label: "Contact Us", path: "/contact", icon: "📞" },
                  { label: "About Us", path: "/about", icon: "ℹ️" },
                ].map((link, i) => (
                  <button key={i} onClick={() => navigate(link.path)} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 text-gray-600 hover:text-red-500 transition-all text-sm font-medium cursor-pointer text-left">
                    <span>{link.icon}</span> {link.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
