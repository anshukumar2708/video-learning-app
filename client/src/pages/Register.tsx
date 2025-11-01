import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Register: React.FC = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // const [userType, setUserType] = useState("Student");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();

        // Basic validation
        if (!name || !email || !password) {
            setError("All fields are required");
            return;
        }

        const existingUser = JSON.parse(localStorage.getItem("user") || "null");

        if (existingUser && existingUser.email === email) {
            setError("User already exists with this email");
            return;
        }

        // Save user data in localStorage (for demo)
        const newUser = { name, email, password };
        localStorage.setItem("user", JSON.stringify(newUser));

        setError("");
        setSuccess("Registration successful! Redirecting to login...");
        setTimeout(() => navigate("/login"), 1500);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-brand-600 mb-6">
                    Create Your Account 🚀
                </h2>

                {error && <p className="text-red-500 text-sm text-center mb-3">{error}</p>}
                {success && (
                    <p className="text-green-600 text-sm text-center mb-3">{success}</p>
                )}

                <form onSubmit={handleRegister} className="space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email Address
                        </label>
                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Password */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                            required
                        />
                    </div>

                    {/* User Type */}
                    {/* <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            User Type
                        </label>
                        <select
                            value={userType}
                            onChange={(e) => setUserType(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                        >
                            <option value="Student">Student</option>
                            <option value="Admin">Admin</option>
                        </select>
                    </div> */}

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-brand-500 text-white py-2 rounded-lg hover:bg-brand-600 transition"
                    >
                        Register
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 mt-4">
                    Already have an account?{" "}
                    <Link
                        to="/login"
                        className="text-brand-600 hover:underline font-medium"
                    >
                        Login
                    </Link>
                </p>

                <div className="mt-6 text-center">
                    <Link to="/" className="text-gray-500 text-sm hover:text-brand-600">
                        ← Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
