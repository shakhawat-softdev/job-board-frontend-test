import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
    return (
        <section className="pt-36 pb-20 bg-white min-h-screen">
            <div className="max-w-xl mx-auto px-6 md:px-12">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">Welcome back</h1>
                <p className="text-slate-500 mb-8">Login to access your account and apply for jobs.</p>

                <div className="border border-slate-200 p-8">
                    <form className="space-y-5">
                        <div>
                            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-[#4F46E5]"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-semibold text-slate-700 mb-2">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-[#4F46E5]"
                                required
                            />
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
                            className="w-full bg-[#4F46E5] text-white px-8 py-3 font-bold hover:bg-[#4338CA] transition-all"
                        >
                            Login
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
