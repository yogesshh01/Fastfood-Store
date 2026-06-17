import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaCheckCircle,
  FaPaperPlane,
  FaInstagram,
  FaFacebook,
  FaTwitter,
} from "react-icons/fa";

function Contact() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const infoCards = [
    {
      icon: <FaPhoneAlt />,
      title: "Call Us",
      lines: ["+1 (800) 123-4567", "+1 (800) 765-4321"],
      color: "bg-blue-50 text-blue-500",
    },
    {
      icon: <FaEnvelope />,
      title: "Email Us",
      lines: ["support@fastfood.com", "orders@fastfood.com"],
      color: "bg-red-50 text-red-500",
    },
    {
      icon: <FaMapMarkerAlt />,
      title: "Visit Us",
      lines: ["123 Gourmet Street", "Downtown, NY 10001"],
      color: "bg-emerald-50 text-emerald-500",
    },
    {
      icon: <FaClock />,
      title: "Opening Hours",
      lines: ["Mon–Sat: 10am – 11pm", "Sunday: 11am – 10pm"],
      color: "bg-amber-50 text-amber-500",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-28 pb-16 font-sans">

      {/* Hero Header */}
      <div className="text-center px-4 mb-14">
        <span className="inline-block bg-red-50 text-red-500 border border-red-200 text-xs font-extrabold uppercase tracking-widest px-5 py-2 rounded-full mb-4">
          Get In Touch
        </span>
        <h1 className="text-4xl sm:text-5xl font-black text-gray-900 leading-tight">
          We'd Love to <span className="text-red-500">Hear From You</span>
        </h1>
        <p className="text-gray-500 mt-3 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Have a question, feedback, or a special order request? Reach out and our team will get back to you within 24 hours.
        </p>
      </div>

      {/* Info Cards */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
        {infoCards.map((card, i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 p-6 flex flex-col items-center text-center gap-3 group"
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg ${card.color} group-hover:scale-110 transition-transform duration-300`}>
              {card.icon}
            </div>
            <h3 className="font-bold text-gray-800 text-sm">{card.title}</h3>
            {card.lines.map((line, j) => (
              <p key={j} className="text-gray-500 text-xs leading-relaxed">{line}</p>
            ))}
          </div>
        ))}
      </div>

      {/* Main Content: Form + Map */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* Contact Form */}
        <div className="lg:col-span-3 bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
          {submitted ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12 gap-4">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-2">
                <FaCheckCircle className="text-green-500 text-4xl animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Message Sent! 🎉</h3>
              <p className="text-gray-500 text-sm max-w-xs">
                Thanks for reaching out, <span className="font-semibold text-gray-700">{form.name}</span>! We'll get back to you shortly.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                className="mt-4 bg-red-500 hover:bg-red-600 text-white font-bold px-6 py-2.5 rounded-xl transition-all active:scale-95 cursor-pointer text-sm"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-bold text-gray-800 mb-1">Send a Message</h2>
              <p className="text-gray-400 text-sm mb-7">Fill out the form and we'll respond as soon as possible.</p>

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${errors.name ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-red-500/20"}`}
                    />
                    {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${errors.email ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-red-500/20"}`}
                    />
                    {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="e.g. Order inquiry, Feedback..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Write your message here..."
                    className={`w-full bg-gray-50 border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all resize-none ${errors.message ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-red-500/20"}`}
                  />
                  {errors.message && <p className="text-red-400 text-xs mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-red-500 hover:bg-red-600 disabled:opacity-70 active:scale-95 text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-lg hover:shadow-red-200 transition-all cursor-pointer text-sm"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <FaPaperPlane className="text-xs" /> Send Message
                    </>
                  )}
                </button>
              </form>
            </>
          )}
        </div>

        {/* Right Panel: Map + Social */}
        <div className="lg:col-span-2 flex flex-col gap-6">

          {/* Map */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden flex-1">
            <iframe
              title="Fastfood Location"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.1422937950147!2d-73.98731968459391!3d40.74844797932764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1623862901234!5m2!1sen!2sus"
              width="100%"
              height="260"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            />
            <div className="p-5">
              <div className="flex items-start gap-3">
                <div className="bg-red-50 text-red-500 rounded-xl p-2.5 shrink-0 mt-0.5">
                  <FaMapMarkerAlt className="text-sm" />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">Fastfood HQ</p>
                  <p className="text-gray-400 text-xs mt-0.5">123 Gourmet Street, Downtown, NY 10001</p>
                  <a
                    href="https://maps.google.com"
                    target="_blank"
                    rel="noreferrer"
                    className="text-red-500 text-xs font-semibold mt-1.5 inline-block hover:underline"
                  >
                    Get Directions →
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-bold text-gray-800 text-sm mb-4">Follow Us</h3>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="flex items-center gap-3 p-3 rounded-xl bg-pink-50 hover:bg-pink-100 transition-all group cursor-pointer"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-pink-500 to-rose-500 text-white rounded-xl flex items-center justify-center text-sm">
                  <FaInstagram />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-xs">Instagram</p>
                  <p className="text-gray-400 text-[11px]">@fastfood.official</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 p-3 rounded-xl bg-blue-50 hover:bg-blue-100 transition-all group cursor-pointer"
              >
                <div className="w-9 h-9 bg-blue-600 text-white rounded-xl flex items-center justify-center text-sm">
                  <FaFacebook />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-xs">Facebook</p>
                  <p className="text-gray-400 text-[11px]">fb.com/fastfoodofficial</p>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-3 p-3 rounded-xl bg-sky-50 hover:bg-sky-100 transition-all group cursor-pointer"
              >
                <div className="w-9 h-9 bg-sky-400 text-white rounded-xl flex items-center justify-center text-sm">
                  <FaTwitter />
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-xs">Twitter / X</p>
                  <p className="text-gray-400 text-[11px]">@fastfood</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
