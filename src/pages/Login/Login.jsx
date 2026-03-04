import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useLogin } from "../../hooks/useAuth";
import { isAdmin } from "../../utils/auth";

const Login = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const { mutate: login, isPending, isError, error } = useLogin({
        onSuccess: (response) => {
            // Check if user is admin and log to console
            const userIsAdmin = isAdmin(response.token);
            console.log("Login successful!");
            console.log("User:", response.user);
            console.log("Is Admin:", userIsAdmin);

            // Redirect to home after successful login
            setTimeout(() => {
                navigate("/");
            }, 500);
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.email.trim() || !formData.password.trim()) {
            return;
        }

        login({
            email: formData.email,
            password: formData.password,
        });
    };

    return (
        <section className="pt-36 pb-20 bg-white min-h-screen">
            <div className="max-w-xl mx-auto px-6 md:px-12">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">Welcome back</h1>
                <p className="text-slate-500 mb-8">Login to access your account and apply for jobs.</p>

                <div className="border border-slate-200 p-8">
                    {isError && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
                            {error?.message}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-[#4F46E5]"
                                disabled={isPending}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-[#4F46E5]"
                                    disabled={isPending}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                                    title={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? (
                                        <FiEyeOff size={20} />
                                    ) : (
                                        <FiEye size={20} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="w-4 h-4 text-[#4F46E5] border-slate-300 focus:ring-[#4F46E5]"
                                />
                                <span className="text-sm text-slate-600">Remember me</span>
                            </label>
                            <Link to="#" className="text-sm text-[#4F46E5] font-semibold hover:text-[#4338CA]">
                                Forgot password?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-[#4F46E5] text-white px-8 py-3 font-bold hover:bg-[#4338CA] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPending ? "Logging in..." : "Login"}
                        </button>
                    </form>
                </div>

                <p className="text-slate-500 mt-6 text-sm">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-[#4F46E5] font-semibold">
                        Sign Up
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default Login;
