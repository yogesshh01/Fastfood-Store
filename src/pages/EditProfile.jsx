import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";

function EditProfile() {
    const { user, updateProfile } = useAuth();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: user?.name || "",
        email: user?.email || "",
        location: user?.location || "",
        phone: user?.phone || "",
        bio: user?.bio || "",
    });
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess(false);

        if (!formData.name.trim()) {
            setError("Name field cannot be empty.");
            return;
        }
        if (!formData.email.trim()) {
            setError("Email field cannot be empty.");
            return;
        }

        setLoading(true);
        try {
            const result = await updateProfile(formData);
            if (result.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate("/profile");
                }, 1200);
            } else {
                setError(result.error || "Failed to update profile.");
            }
        } catch {
            setError("An unexpected error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const initialLetter = formData.name ? formData.name.charAt(0).toUpperCase() : "U";

    return (
        <div className="min-h-screen bg-[#FAF8F5] dark:bg-gray-950 pt-36 pb-12 px-4 font-sans text-gray-900 dark:text-white">
            <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-sm border border-gray-100 dark:border-gray-800 p-6 md:p-10">

                {/* Heading */}
                <div className="mb-8">
                    <h1 className="text-3xl font-black text-gray-900 dark:text-white">
                        Edit Profile
                    </h1>
                    <p className="text-gray-400 dark:text-gray-400 text-sm mt-1">Update your personal information and profile settings.</p>
                </div>

                {/* Success & Error Banners */}
                {success && (
                    <div className="mb-6 flex items-center gap-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/30 text-emerald-700 dark:text-emerald-400 px-4 py-3.5 rounded-2xl text-sm font-semibold animate-pulse">
                        <FaCheckCircle className="text-base shrink-0" />
                        <span>Profile updated successfully! Redirecting to profile page...</span>
                    </div>
                )}

                {error && (
                    <div className="mb-6 flex items-center gap-3 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/30 text-red-700 dark:text-red-400 px-4 py-3.5 rounded-2xl text-sm font-semibold">
                        <FaExclamationCircle className="text-base shrink-0" />
                        <span>{error}</span>
                    </div>
                )}

                {/* Avatar Display */}
                <div className="flex flex-col items-center mb-8 bg-gray-50 dark:bg-gray-950 border border-gray-100 dark:border-gray-800 rounded-2xl py-6">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-4xl font-black shadow-lg shadow-red-200 dark:shadow-red-950/30 uppercase">
                        {initialLetter}
                    </div>
                    <div className="mt-3 text-center">
                        <p className="text-xs text-gray-400 dark:text-gray-450">Profile picture auto-generated from your initial.</p>
                    </div>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                >
                    {/* Name */}
                    <div className="relative">
                        <label className="block mb-2 font-bold text-gray-700 dark:text-gray-300 text-sm">
                            Full Name
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 pointer-events-none">
                                <FaUser className="text-xs" />
                            </span>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl pl-10 pr-4 py-3.5 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/5 transition text-sm font-semibold text-gray-800 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Email */}
                    <div className="relative">
                        <label className="block mb-2 font-bold text-gray-700 dark:text-gray-300 text-sm">
                            Email Address
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 pointer-events-none">
                                <FaEnvelope className="text-xs" />
                            </span>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email address"
                                className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl pl-10 pr-4 py-3.5 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/5 transition text-sm font-semibold text-gray-800 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Location */}
                    <div className="relative">
                        <label className="block mb-2 font-bold text-gray-700 dark:text-gray-300 text-sm">
                            Location
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 pointer-events-none">
                                <FaMapMarkerAlt className="text-xs" />
                            </span>
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                placeholder="e.g. New York, USA"
                                className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl pl-10 pr-4 py-3.5 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/5 transition text-sm font-semibold text-gray-800 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Phone */}
                    <div className="relative">
                        <label className="block mb-2 font-bold text-gray-700 dark:text-gray-300 text-sm">
                            Phone Number
                        </label>
                        <div className="relative">
                            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-400 pointer-events-none">
                                <FaPhoneAlt className="text-xs" />
                            </span>
                            <input
                                type="text"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="e.g. +1 234 567 890"
                                className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl pl-10 pr-4 py-3.5 outline-none focus:border-red-500 focus:ring-4 focus:ring-red-500/5 transition text-sm font-semibold text-gray-800 dark:text-white"
                            />
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="md:col-span-2 relative">
                        <label className="block mb-2 font-bold text-gray-700 dark:text-gray-300 text-sm">
                            Short Bio
                        </label>
                        <div className="relative">
                            <span className="absolute top-3.5 left-4 text-gray-400 pointer-events-none">
                                <FaUser className="text-xs" />
                            </span>
                            <textarea
                                rows="4"
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                placeholder="Write something about yourself..."
                                className="w-full bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-2xl pl-10 pr-4 py-3.5 outline-none resize-none focus:border-red-500 focus:ring-4 focus:ring-red-500/5 transition text-sm font-semibold text-gray-800 dark:text-white leading-relaxed"
                            />
                        </div>
                    </div>

                    {/* Buttons */}
                    <div className="md:col-span-2 flex justify-end gap-3 mt-4">
                        <button
                            type="button"
                            onClick={() => navigate("/profile")}
                            disabled={loading}
                            className="border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-300 px-6 py-3 rounded-2xl font-bold hover:bg-gray-50 dark:hover:bg-gray-800 transition active:scale-95 text-sm cursor-pointer disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={loading || success}
                            className="bg-red-500 hover:bg-red-600 disabled:bg-gray-300 text-white px-7 py-3 rounded-2xl font-bold transition shadow-md hover:shadow-red-200 active:scale-95 text-sm cursor-pointer"
                        >
                            {loading ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditProfile;