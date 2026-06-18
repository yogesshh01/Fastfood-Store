import { useNavigate } from "react-router-dom";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaArrowLeft, FaTag, FaCheckCircle } from "react-icons/fa";
import { useState } from "react";

function Cart({ cart, setCart }) {
  const navigate = useNavigate();
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  const VALID_PROMO = "FAST10";
  const DISCOUNT_RATE = 0.10;
  const DELIVERY_FEE = 2.99;
  const TAX_RATE = 0.08;

  const updateQuantity = (id, delta) => {
    setCart(prev =>
      prev
        .map(item => item.id === id ? { ...item, quantity: item.quantity + delta } : item)
        .filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const clearCart = () => setCart([]);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discount = promoApplied ? subtotal * DISCOUNT_RATE : 0;
  const tax = (subtotal - discount) * TAX_RATE;
  const total = subtotal - discount + tax + (cart.length > 0 ? DELIVERY_FEE : 0);

  const handlePromo = () => {
    if (promoCode.trim().toUpperCase() === VALID_PROMO) {
      setPromoApplied(true);
      setPromoError("");
    } else {
      setPromoError("Invalid promo code. Try FAST10");
      setPromoApplied(false);
    }
  };

  const handleCheckout = () => {
    setOrderPlaced(true);
    setTimeout(() => {
      setCart([]);
      setOrderPlaced(false);
      navigate("/");
    }, 3000);
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 pt-32">
        <div className="text-center animate-fade-in text-gray-900 dark:text-white">
          <div className="w-24 h-24 bg-green-100 dark:bg-green-950/30 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce-slow border dark:border-green-900/30">
            <FaCheckCircle className="text-green-500 text-5xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Order Placed! 🎉</h2>
          <p className="text-gray-500 dark:text-gray-300 text-lg mb-1">Your food is being prepared.</p>
          <p className="text-gray-400 dark:text-gray-450 text-sm">Redirecting you to home...</p>
        </div>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex flex-col items-center justify-center px-4 pt-32">
        <div className="text-center text-gray-900 dark:text-white">
          <div className="w-32 h-32 bg-red-50 dark:bg-red-950/30 rounded-full flex items-center justify-center mx-auto mb-6 border dark:border-red-900/30">
            <FaShoppingBag className="text-red-300 text-6xl" />
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">Your cart is empty</h2>
          <p className="text-gray-400 dark:text-gray-400 mb-8 text-lg">Looks like you haven't added anything yet.</p>
          <button
            onClick={() => navigate("/menu")}
            className="bg-red-500 hover:bg-red-600 active:scale-95 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-lg hover:shadow-red-200 text-base cursor-pointer"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-32">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800 sticky top-0 z-10 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
          <button
            onClick={() => navigate("/menu")}
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-red-500 font-semibold transition-colors cursor-pointer"
          >
            <FaArrowLeft className="text-sm" />
            <span>Back to Menu</span>
          </button>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white">
            My Cart <span className="text-red-500">({cart.reduce((a, i) => a + i.quantity, 0)} items)</span>
          </h1>
          <button
            onClick={clearCart}
            className="text-sm text-gray-400 hover:text-red-500 font-medium transition-colors cursor-pointer flex items-center gap-1"
          >
            <FaTrash className="text-xs" /> Clear All
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Cart Items */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 flex gap-4 p-4 hover:shadow-md transition-shadow group"
            >
              {/* Image */}
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-gray-50 dark:bg-gray-950">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Details */}
              <div className="flex-1 flex flex-col justify-between min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="font-bold text-gray-800 dark:text-white text-base sm:text-lg leading-tight truncate">{item.name}</h3>
                    <span className="text-xs text-gray-400 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 px-2 py-0.5 rounded-full inline-block mt-1">
                      {item.category}
                    </span>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-gray-300 hover:text-red-400 transition-colors cursor-pointer flex-shrink-0 p-1"
                    title="Remove"
                  >
                    <FaTrash className="text-sm" />
                  </button>
                </div>

                <div className="flex items-center justify-between mt-3">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-xl px-3 py-1.5">
                    <button
                      onClick={() => updateQuantity(item.id, -1)}
                      className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer w-5 h-5 flex items-center justify-center"
                    >
                      <FaMinus className="text-xs" />
                    </button>
                    <span className="font-bold text-gray-800 dark:text-white w-5 text-center text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, 1)}
                      className="text-gray-500 hover:text-red-500 transition-colors cursor-pointer w-5 h-5 flex items-center justify-center"
                    >
                      <FaPlus className="text-xs" />
                    </button>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="font-bold text-gray-800 dark:text-white text-base sm:text-lg">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">${item.price.toFixed(2)} each</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 sticky top-24">
            <h2 className="text-lg font-bold text-gray-800 dark:text-white mb-5">Order Summary</h2>

            {/* Promo Code */}
            <div className="mb-5">
              <label className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-2 flex items-center gap-1">
                <FaTag className="text-red-400 text-xs" /> Promo Code
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => { setPromoCode(e.target.value); setPromoError(""); }}
                  placeholder="e.g. FAST10"
                  disabled={promoApplied}
                  className="flex-1 bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-800 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 disabled:opacity-60"
                />
                <button
                  onClick={handlePromo}
                  disabled={promoApplied}
                  className="bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white text-sm font-bold px-4 py-2 rounded-lg transition-all cursor-pointer active:scale-95"
                >
                  Apply
                </button>
              </div>
              {promoApplied && (
                <p className="text-green-600 text-xs mt-1.5 flex items-center gap-1 font-medium">
                  <FaCheckCircle /> 10% discount applied!
                </p>
              )}
              {promoError && (
                <p className="text-red-400 text-xs mt-1.5">{promoError}</p>
              )}
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex flex-col gap-3">
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-800 dark:text-white">${subtotal.toFixed(2)}</span>
              </div>
              {promoApplied && (
                <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                  <span>Discount (10%)</span>
                  <span className="font-semibold">−${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>Delivery Fee</span>
                <span className="font-semibold text-gray-800 dark:text-white">${DELIVERY_FEE.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-300">
                <span>Tax (8%)</span>
                <span className="font-semibold text-gray-800 dark:text-white">${tax.toFixed(2)}</span>
              </div>
            </div>

            <div className="border-t border-gray-100 dark:border-gray-800 mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="font-bold text-gray-800 dark:text-white text-base">Total</span>
                <span className="font-bold text-red-500 text-xl">${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="mt-6 w-full bg-red-500 hover:bg-red-600 active:scale-95 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-red-200 text-base cursor-pointer"
            >
              Place Order 🛒
            </button>

            <button
              onClick={() => navigate("/menu")}
              className="mt-3 w-full border border-gray-200 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300 font-semibold py-3 rounded-xl transition-all text-sm cursor-pointer"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
