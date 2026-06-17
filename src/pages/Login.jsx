import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser, FaEye, FaEyeSlash, FaGoogle, FaApple } from "react-icons/fa";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import { useAuth } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { signIn, signUp, isAuthenticated } = useAuth();

  const [tab, setTab] = useState("signin");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [serverError, setServerError] = useState("");

  const [signInForm, setSignInForm] = useState({ email: "", password: "" });
  const [signUpForm, setSignUpForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});

  // Already logged in → go to profile
  if (isAuthenticated) return <Navigate to="/profile" replace />;

  const validateSignIn = () => {
    const errs = {};
    if (!signInForm.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(signInForm.email)) errs.email = "Enter a valid email";
    if (!signInForm.password) errs.password = "Password is required";
    else if (signInForm.password.length < 6) errs.password = "Min 6 characters";
    return errs;
  };

  const validateSignUp = () => {
    const errs = {};
    if (!signUpForm.name.trim()) errs.name = "Name is required";
    if (!signUpForm.email.trim()) errs.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(signUpForm.email)) errs.email = "Enter a valid email";
    if (!signUpForm.password) errs.password = "Password is required";
    else if (signUpForm.password.length < 6) errs.password = "Min 6 characters";
    return errs;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setServerError("");
    const errs = validateSignIn();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    const result = await signIn(signInForm.email, signInForm.password);
    setLoading(false);
    if (result.success) {
      navigate("/profile");
    } else {
      setServerError(result.error);
    }
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setServerError("");
    const errs = validateSignUp();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setLoading(true);
    const result = await signUp(signUpForm.name, signUpForm.email, signUpForm.password);
    setLoading(false);
    if (result.success) {
      navigate("/profile");
    } else {
      setServerError(result.error);
    }
  };

  const handleChange = (setter, form) => (e) => {
    setter({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
    setServerError("");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-4 py-12 font-sans">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div
          className="flex items-center justify-center gap-2 cursor-pointer mb-8"
          onClick={() => navigate("/")}
        >
          <FastfoodIcon className="text-red-500" />
          <span className="font-black text-2xl text-gray-900">
            Fast<span className="text-red-500">food</span>
          </span>
        </div>

        {/* JWT Badge */}
        <div className="flex justify-center mb-6">
          <span className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-bold px-4 py-1.5 rounded-full">
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            Secured with JWT Authentication
          </span>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">

          {/* Tabs */}
          <div className="flex border-b border-gray-100">
            <button
              onClick={() => { setTab("signin"); setErrors({}); setServerError(""); }}
              className={`flex-1 py-4 text-sm font-bold transition-all cursor-pointer ${tab === "signin" ? "text-red-500 border-b-2 border-red-500 bg-red-50/30" : "text-gray-400 hover:text-gray-600"}`}
            >
              Sign In
            </button>
            <button
              onClick={() => { setTab("signup"); setErrors({}); setServerError(""); }}
              className={`flex-1 py-4 text-sm font-bold transition-all cursor-pointer ${tab === "signup" ? "text-red-500 border-b-2 border-red-500 bg-red-50/30" : "text-gray-400 hover:text-gray-600"}`}
            >
              Create Account
            </button>
          </div>

          <div className="p-8">
            {/* Social Buttons */}
            <div className="flex gap-3 mb-6">
              <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 active:scale-95 transition-all cursor-pointer">
                <FaGoogle className="text-red-400" /> Google
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50 active:scale-95 transition-all cursor-pointer">
                <FaApple className="text-gray-800" /> Apple
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px bg-gray-100" />
              <span className="text-xs text-gray-400 font-medium">or continue with email</span>
              <div className="flex-1 h-px bg-gray-100" />
            </div>

            {/* Server Error */}
            {serverError && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-xs font-semibold px-4 py-3 rounded-xl mb-4 flex items-center gap-2">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {serverError}
              </div>
            )}

            {/* Sign In Form */}
            {tab === "signin" && (
              <form onSubmit={handleSignIn} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Email Address</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="email"
                      name="email"
                      value={signInForm.email}
                      onChange={handleChange(setSignInForm, signInForm)}
                      placeholder="john@example.com"
                      className={`w-full bg-gray-50 border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${errors.email ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-red-500/20"}`}
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-gray-600">Password</label>
                    <button type="button" className="text-xs text-red-500 hover:underline cursor-pointer">Forgot password?</button>
                  </div>
                  <div className="relative">
                    <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type={showPass ? "text" : "password"}
                      name="password"
                      value={signInForm.password}
                      onChange={handleChange(setSignInForm, signInForm)}
                      placeholder="••••••••"
                      className={`w-full bg-gray-50 border rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${errors.password ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-red-500/20"}`}
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                      {showPass ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 w-full bg-red-500 hover:bg-red-600 disabled:opacity-70 active:scale-95 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-red-200 transition-all cursor-pointer text-sm flex items-center justify-center gap-2"
                >
                  {loading ? <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg> : "Sign In →"}
                </button>
              </form>
            )}

            {/* Sign Up Form */}
            {tab === "signup" && (
              <form onSubmit={handleSignUp} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Full Name</label>
                  <div className="relative">
                    <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="text"
                      name="name"
                      value={signUpForm.name}
                      onChange={handleChange(setSignUpForm, signUpForm)}
                      placeholder="John Doe"
                      className={`w-full bg-gray-50 border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${errors.name ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-red-500/20"}`}
                    />
                  </div>
                  {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Email Address</label>
                  <div className="relative">
                    <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type="email"
                      name="email"
                      value={signUpForm.email}
                      onChange={handleChange(setSignUpForm, signUpForm)}
                      placeholder="john@example.com"
                      className={`w-full bg-gray-50 border rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${errors.email ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-red-500/20"}`}
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Password</label>
                  <div className="relative">
                    <FaLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
                    <input
                      type={showPass ? "text" : "password"}
                      name="password"
                      value={signUpForm.password}
                      onChange={handleChange(setSignUpForm, signUpForm)}
                      placeholder="Min. 6 characters"
                      className={`w-full bg-gray-50 border rounded-xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:ring-2 transition-all ${errors.password ? "border-red-400 focus:ring-red-200" : "border-gray-200 focus:ring-red-500/20"}`}
                    />
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer">
                      {showPass ? <FaEyeSlash /> : <FaEye />}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password}</p>}
                </div>

                <p className="text-xs text-gray-400">
                  By signing up, you agree to our{" "}
                  <span className="text-red-500 cursor-pointer hover:underline">Terms of Service</span> and{" "}
                  <span className="text-red-500 cursor-pointer hover:underline">Privacy Policy</span>.
                </p>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 w-full bg-red-500 hover:bg-red-600 disabled:opacity-70 active:scale-95 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-red-200 transition-all cursor-pointer text-sm flex items-center justify-center gap-2"
                >
                  {loading ? <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" /></svg> : "Create Account →"}
                </button>
              </form>
            )}
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-6">
          © 2025 Fastfood. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
