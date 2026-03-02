import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
    return (
        <section className="pt-36 pb-20 bg-white min-h-screen">
            <div className="max-w-xl mx-auto px-6 md:px-12">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">Create account</h1>
                <p className="text-slate-500 mb-8">Sign up to apply for jobs and manage your applications.</p>

                <div className="border border-slate-200 p-8">
                    <form className="space-y-5">
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">
                                Full name
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-[#4F46E5]"
                                required
                            />
                        </div>

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

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700 mb-2">
                                Confirm password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-[#4F46E5]"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-[#4F46E5] text-white px-8 py-3 font-bold hover:bg-[#4338CA] transition-all"
                        >
                            Sign Up
                        </button>
                    </form>
                </div>

                <p className="text-slate-500 mt-6 text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-[#4F46E5] font-semibold">
                        Login
                    </Link>
                </p>
            </div>
        </section>
    );
};

export default SignUp;
