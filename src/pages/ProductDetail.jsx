import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaShoppingCart, FaLeaf, FaAward } from "react-icons/fa";
import { FOOD_ITEMS } from "../utils/foodData";

export default function ProductDetail({ cart = [], setCart = () => {} }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [showPopup, setShowPopup] = useState(false);

  const product = FOOD_ITEMS.find((item) => item.id === parseInt(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Product Not Found</h1>
          <button
            onClick={() => navigate("/")}
            className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-lg font-semibold transition"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity }]);
    }

    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-red-500 hover:text-red-600 font-semibold transition"
          >
            <FaArrowLeft size={20} />
            Back
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-white rounded-2xl p-6 shadow-sm">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            {/* Category Badge */}
            <span className="bg-red-100 text-red-500 px-4 py-2 rounded-full text-sm font-bold w-fit mb-4">
              {product.category}
            </span>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {product.name}
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Price */}
            <div className="mb-8">
              <p className="text-gray-500 text-sm font-semibold mb-2">PRICE</p>
              <p className="text-5xl font-bold text-red-500">
                ${product.price.toFixed(2)}
              </p>
            </div>

            {/* Quantity Selector */}
            <div className="mb-8">
              <p className="text-gray-500 text-sm font-semibold mb-3">QUANTITY</p>
              <div className="flex items-center gap-4 bg-white p-4 rounded-lg w-fit border border-gray-200">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="bg-gray-100 hover:bg-red-100 text-gray-700 font-bold w-10 h-10 rounded flex items-center justify-center transition"
                >
                  −
                </button>
                <span className="text-2xl font-bold text-gray-900 min-w-12 text-center">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="bg-gray-100 hover:bg-red-100 text-gray-700 font-bold w-10 h-10 rounded flex items-center justify-center transition"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="bg-red-500 hover:bg-red-600 active:scale-95 text-white font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-red-200 transition mb-6"
            >
              <FaShoppingCart size={24} />
              Add to Cart
            </button>

            {/* Features */}
            <div className="space-y-3 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3 text-gray-700">
                <FaLeaf className="text-green-500" size={20} />
                <span>Fresh & Quality Ingredients</span>
              </div>
              <div className="flex items-center gap-3 text-gray-700">
                <FaAward className="text-yellow-500" size={20} />
                <span>Chef's Signature Recipe</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">More Delicious Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FOOD_ITEMS.filter((item) => item.id !== product.id)
              .slice(0, 4)
              .map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/product/${item.id}`)}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg cursor-pointer transition-all hover:-translate-y-1"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-gray-900">{item.name}</h3>
                    <p className="text-red-500 font-bold text-lg mt-2">
                      ${item.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      {/* Side Success Toast Notification */}
      {showPopup && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-gray-200 rounded-2xl shadow-2xl p-4 flex items-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-300 max-w-sm">
          {/* Green check icon */}
          <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          {/* Text and Actions */}
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-gray-900 truncate">Added to Cart!</p>
            <p className="text-xs text-gray-500 truncate">{quantity}x {product.name}</p>
          </div>
          {/* Action Button */}
          <button
            onClick={() => navigate("/cart")}
            className="text-xs font-extrabold text-red-500 hover:text-red-600 hover:underline cursor-pointer shrink-0 whitespace-nowrap"
          >
            View Cart →
          </button>
        </div>
      )}
      </div>
    </div>
  );
}
