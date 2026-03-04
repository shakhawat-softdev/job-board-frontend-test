import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useSignUp } from "../../hooks/useAuth";
import { showErrorToast, showSuccessToast } from "../../utils/notifications";

const SignUp = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [validationError, setValidationError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const { mutate: signup, isPending, isError, error } = useSignUp({
        onSuccess: () => {
            showSuccessToast("Account created successfully. Please login.");
            navigate("/login");
        },
    });

    useEffect(() => {
        if (isError && error?.message) {
            showErrorToast(error.message);
        }
    }, [isError, error]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
        setValidationError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setValidationError("");

        // Validation
        if (!formData.fullName.trim()) {
            setValidationError("Full name is required");
            return;
        }
        if (!formData.email.trim()) {
            setValidationError("Email is required");
            return;
        }
        if (formData.password.length < 6) {
            setValidationError("Password must be at least 6 characters");
            return;
        }
        if (formData.password !== formData.confirmPassword) {
            setValidationError("Passwords do not match");
            return;
        }

        signup({
            name: formData.fullName,
            email: formData.email,
            password: formData.password,
        });
    };

    return (
        <section className="pt-36 pb-20 bg-white min-h-screen">
            <div className="max-w-xl mx-auto px-6 md:px-12">
                <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-3">Create account</h1>
                <p className="text-slate-500 mb-8">Sign up to apply for jobs and manage your applications.</p>

                <div className="border border-slate-200 p-8">
                    {(validationError || isError) && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 text-sm">
                            {validationError || error?.message}
                        </div>
                    )}

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-semibold text-slate-700 mb-2">
                                Full name
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                value={formData.fullName}
                                onChange={handleChange}
                                className="w-full border border-slate-300 px-4 py-3 outline-none focus:border-[#4F46E5]"
                                disabled={isPending}
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

                        <div>
                            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-slate-700 mb-2">
                                Confirm password
                            </label>
                            <div className="relative">
                                <input
                                    id="confirmPassword"
                                    name="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className="w-full border border-slate-300 px-4 py-3 pr-12 outline-none focus:border-[#4F46E5]"
                                    disabled={isPending}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-500 hover:text-slate-700 transition-colors"
                                    title={showConfirmPassword ? "Hide password" : "Show password"}
                                >
                                    {showConfirmPassword ? (
                                        <FiEyeOff size={20} />
                                    ) : (
                                        <FiEye size={20} />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isPending}
                            className="w-full bg-[#4F46E5] text-white px-8 py-3 font-bold hover:bg-[#4338CA] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isPending ? "Creating account..." : "Sign Up"}
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
