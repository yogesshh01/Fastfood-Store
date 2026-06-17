import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

function Footer({ contactRef }) {
  return (
    <footer className="bg-black text-white">
      {/* Main Footer Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 py-16 px-6 md:px-16 lg:px-24 xl:px-32 border-b border-gray-900">
        
        {/* Logo and About */}
        <div className="flex flex-col gap-5">
          <h1 className="text-3xl font-bold">
            Fast<span className="text-red-500 font-bold">food</span>
          </h1>
          <p className="text-gray-400 text-sm leading-relaxed">
            We bring the world's finest flavors together in a fast,
            friendly, and affordable experience. Every meal crafted
            with love.
          </p>
          <div className="flex gap-4 mt-2">
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="bg-gray-900 hover:bg-blue-600 text-white p-3 rounded-full hover:scale-110 transition duration-300 cursor-pointer"
            >
              <FaFacebookF className="text-base" />
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="bg-gray-900 hover:bg-pink-500 text-white p-3 rounded-full hover:scale-110 transition duration-300 cursor-pointer"
            >
              <FaInstagram className="text-base" />
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="bg-gray-900 hover:bg-sky-500 text-white p-3 rounded-full hover:scale-110 transition duration-300 cursor-pointer"
            >
              <FaTwitter className="text-base" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="flex flex-col gap-5">
          <h2 className="font-bold text-lg border-l-4 border-red-500 pl-3">Quick Links</h2>
          <ul className="flex flex-col gap-3 text-gray-400 text-sm">
            <li className="hover:text-red-500 transition cursor-pointer">Home</li>
            <li className="hover:text-red-500 transition cursor-pointer">About Us</li>
            <li className="hover:text-red-500 transition cursor-pointer">Our Menu</li>
            <li className="hover:text-red-500 transition cursor-pointer">Reservation</li>
            <li className="hover:text-red-500 transition cursor-pointer">Blog</li>
            <li className="hover:text-red-500 transition cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Our Menu Category */}
        <div className="flex flex-col gap-5">
          <h2 className="font-bold text-lg border-l-4 border-red-500 pl-3">Our Menu</h2>
          <ul className="flex flex-col gap-3 text-gray-400 text-sm">
            <li className="hover:text-red-500 transition cursor-pointer">Burger</li>
            <li className="hover:text-red-500 transition cursor-pointer">Pizza</li>
            <li className="hover:text-red-500 transition cursor-pointer">Wrap</li>
            <li className="hover:text-red-500 transition cursor-pointer">Fried Chicken</li>
            <li className="hover:text-red-500 transition cursor-pointer">Pasta</li>
            <li className="hover:text-red-500 transition cursor-pointer">Desserts</li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="flex flex-col gap-5" ref={contactRef}>
          <h2 className="font-bold text-lg border-l-4 border-red-500 pl-3">Get In Touch</h2>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 items-center">
              <div className="bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl p-2.5 transition duration-300">
                <FaMapMarkerAlt className="text-xl" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-200">Address</h4>
                <p className="text-xs text-gray-400 mt-0.5">42 Flavor Street, Manhattan, NY 10001</p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl p-2.5 transition duration-300">
                <FaPhoneAlt className="text-xl" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-200">Phone</h4>
                <p className="text-xs text-gray-400 mt-0.5">+1 (800) 123-4567</p>
              </div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl p-2.5 transition duration-300">
                <FaEnvelope className="text-xl" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-200">Email</h4>
                <p className="text-xs text-gray-400 mt-0.5">hello@fastfood.com</p>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Footer Info */}
      <div className="py-6 px-6 md:px-16 lg:px-24 xl:px-32 flex flex-col md:flex-row gap-4 justify-between items-center text-center md:text-left text-xs text-gray-500 bg-black">
        <p>
          © 2026 <span className="text-red-500 font-semibold">Fastfood</span>. All Rights Reserved. Crafted with ❤️ for food lovers.
        </p>
        <ul className="flex gap-6 sm:gap-8 justify-center">
          <li className="hover:text-red-500 transition cursor-pointer">Privacy Policy</li>
          <li className="hover:text-red-500 transition cursor-pointer">Terms & Conditions</li>
          <li className="hover:text-red-500 transition cursor-pointer">Cookies Settings</li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
